import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { ASK_SYSTEM_PROMPT } from "../../../lib/ask-context";

// Public endpoint, so keep every request small and bounded
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 500;
const MAX_OUTPUT_TOKENS = 2048;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// slows abuse down rather than guaranteeing a hard cap; the real backstop is
// the spend limit set on the Anthropic account.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (time) => now - time < WINDOW_MS
  );

  recent.push(now);
  requestLog.set(ip, recent);

  // Keep the map from growing without bound
  if (requestLog.size > 5000) requestLog.clear();

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!body || typeof body !== "object") return null;

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const recent = messages.slice(-MAX_MESSAGES) as IncomingMessage[];

  const valid = recent.every(
    (message) =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0 &&
      message.content.length <= MAX_MESSAGE_CHARS
  );

  // The conversation must start and end with the visitor
  if (!valid || recent[0].role !== "user" || recent.at(-1)!.role !== "user") {
    return null;
  }

  return recent.map((message) => ({
    role: message.role,
    content: message.content.trim(),
  }));
}

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export async function POST(request: Request) {
  if (!client) {
    return NextResponse.json(
      { error: "The assistant isn't set up yet." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many questions in a short time. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json(
      { error: `Questions must be under ${MAX_MESSAGE_CHARS} characters.` },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;

      try {
        const response = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: MAX_OUTPUT_TOKENS,
          // Short factual answers from a fixed context: low effort is enough
          output_config: { effort: "low" },
          // If a safety classifier declines, retry on Anthropic's recommended model
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          // The system prompt never changes, so it is cached between visitors
          system: [
            {
              type: "text",
              text: ASK_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            sentText = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await response.finalMessage();

        if (final.stop_reason === "refusal" && !sentText) {
          controller.enqueue(
            encoder.encode(
              "I can't help with that one. I can answer questions about Aidan's work, skills, and experience."
            )
          );
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.error("Ask route rate limited by the API");
        } else if (error instanceof Anthropic.APIError) {
          console.error(`Ask route API error ${error.status}:`, error.message);
        } else {
          console.error("Ask route error:", error);
        }

        if (!sentText) {
          controller.enqueue(
            encoder.encode(
              "Sorry, I couldn't answer that right now. You can reach Aidan directly on WhatsApp at 071 680 8399."
            )
          );
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
