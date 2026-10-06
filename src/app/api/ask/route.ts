import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";
import type { Content, ThinkingConfig } from "@google/genai";
import { NextResponse } from "next/server";
import { ASK_SYSTEM_PROMPT } from "../../../lib/ask-context";

// All of these are on Gemini's free tier, tried in order when a model is
// overloaded (free-tier models often return 503 "high demand") or stalls.
// The lite models answer in about a second and are plenty for short answers
// from a fixed context; the full flash model is the last resort. Models get
// no thinking setting so each uses its own default.
// (The 2.5 models were checked too: they're closed to new API keys.)
const ATTEMPTS: { model: string; thinkingConfig?: ThinkingConfig }[] = [
  { model: "gemini-3.5-flash-lite" },
  { model: "gemini-3.1-flash-lite" },
  { model: "gemini-flash-lite-latest" },
  {
    model: "gemini-3.8-flash",
    // LOW is the lowest thinking level this model accepts
    thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
  },
];

// Short pause before trying the next model after a failure
const RETRY_DELAY_MS = 1_000;

// Give up on a model if it goes this long without sending anything
const IDLE_TIMEOUT_MS = 15_000;

function isRetryable(error: unknown, signal: AbortSignal) {
  if (signal.aborted) return true;
  return (
    error instanceof ApiError &&
    (error.status === 429 || error.status >= 500)
  );
}

// Public endpoint, so keep every request small and bounded
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 500;
// Thinking tokens count toward this cap, so leave headroom for the answer
const MAX_OUTPUT_TOKENS = 2048;

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
      let lastError: unknown = null;

      // Try the main model first; if it's overloaded or stalls before saying
      // anything, try the backup. Once text has been sent we can't switch.
      for (const [index, attempt] of ATTEMPTS.entries()) {
        if (index > 0) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }

        const abort = new AbortController();
        let idleTimer = setTimeout(() => abort.abort(), IDLE_TIMEOUT_MS);
        const resetIdleTimer = () => {
          clearTimeout(idleTimer);
          idleTimer = setTimeout(() => abort.abort(), IDLE_TIMEOUT_MS);
        };

        try {
          const response = await ai.models.generateContentStream({
            model: attempt.model,
            contents,
            config: {
              systemInstruction: ASK_SYSTEM_PROMPT,
              maxOutputTokens: MAX_OUTPUT_TOKENS,
              abortSignal: abort.signal,
              ...(attempt.thinkingConfig
                ? { thinkingConfig: attempt.thinkingConfig }
                : {}),
            },
          });

          for await (const chunk of response) {
            resetIdleTimer();
            const text = chunk.text;

            if (text) {
              sentText = true;
              controller.enqueue(encoder.encode(text));
            }
          }

          lastError = null;
          break;
        } catch (error) {
          lastError = error;

          if (error instanceof ApiError) {
            console.error(
              `Ask route ${attempt.model} error ${error.status}:`,
              error.message
            );
          } else {
            console.error(`Ask route ${attempt.model} error:`, error);
          }

          // Only fall back to the next model if nothing has reached the visitor
          if (sentText || !isRetryable(error, abort.signal)) break;
        } finally {
          clearTimeout(idleTimer);
        }
      }

      if (sentText && lastError) {
        controller.enqueue(
          encoder.encode(
            "\n\n(Sorry, my answer got cut off. Try asking again, or reach Aidan on WhatsApp at 071 680 8399.)"
          )
        );
      } else if (!sentText) {
        const busy =
          lastError instanceof ApiError &&
          (lastError.status === 429 || lastError.status === 503);

        controller.enqueue(
          encoder.encode(
            lastError
              ? busy
                ? "I'm getting a lot of questions right now and hit my limit. Try again in a bit, or reach Aidan directly on WhatsApp at 071 680 8399."
                : "Sorry, I couldn't answer that right now. You can reach Aidan directly on WhatsApp at 071 680 8399."
              : "I can't help with that one. I can answer questions about Aidan's work, skills, and experience."
          )
        );
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
