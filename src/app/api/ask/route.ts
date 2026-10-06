import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";
import type { Content } from "@google/genai";
import { NextResponse } from "next/server";
import { ASK_SYSTEM_PROMPT } from "../../../lib/ask-context";

// Gemini's free tier covers this model (rate-limited per day/minute)
const MODEL = "gemini-3.8-flash";

// Public endpoint, so keep every request small and bounded
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 500;
const MAX_OUTPUT_TOKENS = 1024;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// slows abuse down rather than guaranteeing a hard cap; the free tier's own
// quota is the backstop.
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

// Validate the visitor's chat history and convert it to Gemini's format
function parseMessages(body: unknown): Content[] | null {
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
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content.trim() }],
  }));
}

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function POST(request: Request) {
  if (!ai) {
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

  const contents = parseMessages(body);
  if (!contents) {
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
        const response = await ai.models.generateContentStream({
          model: MODEL,
          contents,
          config: {
            systemInstruction: ASK_SYSTEM_PROMPT,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            // Short factual answers from a fixed context don't need deep reasoning
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });

        for await (const chunk of response) {
          const text = chunk.text;

          if (text) {
            sentText = true;
            controller.enqueue(encoder.encode(text));
          }
        }

        if (!sentText) {
          controller.enqueue(
            encoder.encode(
              "I can't help with that one. I can answer questions about Aidan's work, skills, and experience."
            )
          );
        }
      } catch (error) {
        const busy = error instanceof ApiError && error.status === 429;

        if (error instanceof ApiError) {
          console.error(`Ask route Gemini error ${error.status}:`, error.message);
        } else {
          console.error("Ask route error:", error);
        }

        if (!sentText) {
          controller.enqueue(
            encoder.encode(
              busy
                ? "I've had a lot of questions today and hit my limit. Try again later, or reach Aidan directly on WhatsApp at 071 680 8399."
                : "Sorry, I couldn't answer that right now. You can reach Aidan directly on WhatsApp at 071 680 8399."
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
