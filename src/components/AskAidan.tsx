"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUp, Bot, LoaderCircle, Sparkles } from "lucide-react";
import Eyebrow from "./Eyebrow";

type Message = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 500;

const suggestions = [
  "What has Aidan built for clients?",
  "What's his tech stack?",
  "Is he available for work?",
  "Tell me about his IT experience",
];

// "Ask about Aidan": a small chat that streams answers from /api/ask
export default function AskAidan() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as answers stream in
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || loading) return;

    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8) }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
    } catch (caught) {
      // Drop the empty assistant bubble and show the reason instead
      setMessages(history);
      setError(
        caught instanceof Error ? caught.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <section
      id="ask"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div data-gsap="reveal">
          <Eyebrow label="AI assistant" />

          <h2 className="text-2xl font-bold sm:text-3xl">
            Ask about <span className="text-gradient">Aidan.</span>
          </h2>

          <p className="mt-3 text-foreground-muted">
            Got a question about my work, skills, or availability? Ask
            my AI assistant. It answers from my resume and project
            write-ups, and it&apos;s built with Claude, Next.js and
            streaming responses.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={loading}
                onClick={() => ask(suggestion)}
                className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-left text-sm text-foreground-muted transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div
          data-gsap="reveal"
          className="spotlight-card flex h-[440px] flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface"
          style={{
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="flex items-center gap-2 border-b border-surface-border px-4 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-2 text-background">
              <Bot size={16} aria-hidden="true" />
            </span>

            <p className="text-sm font-semibold">Aidan&apos;s assistant</p>

            <span className="ml-auto inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[11px] text-foreground-muted">
              <Sparkles size={12} aria-hidden="true" />
              AI · may make mistakes
            </span>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <p className="py-10 text-center text-sm text-foreground-muted">
                Ask anything about Aidan&apos;s projects, experience, or
                skills.
              </p>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-accent text-background"
                      : "rounded-bl-sm border border-surface-border bg-background text-foreground"
                  }`}
                >
                  {message.content ||
                    (loading && index === messages.length - 1 ? (
                      <span className="inline-flex items-center gap-2 text-foreground-muted">
                        <LoaderCircle
                          size={14}
                          aria-hidden="true"
                          className="animate-spin"
                        />
                        Thinking...
                      </span>
                    ) : null)}
                </p>
              </div>
            ))}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400"
              >
                {error} You can also reach Aidan on WhatsApp at 071 680
                8399.
              </p>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-surface-border p-3"
          >
            <label
              htmlFor="ask-input"
              className="sr-only"
            >
              Your question
            </label>

            <input
              id="ask-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_CHARS}
              placeholder="e.g. What did he build for JJS?"
              autoComplete="off"
              className="h-10 flex-1 rounded-lg border border-surface-border bg-background px-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-background transition-opacity disabled:opacity-40"
            >
              {loading ? (
                <LoaderCircle
                  size={16}
                  aria-hidden="true"
                  className="animate-spin"
                />
              ) : (
                <ArrowUp size={16} aria-hidden="true" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
