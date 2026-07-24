"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-xl px-6 py-20">
        <h1 className="text-3xl font-bold">Get In Touch</h1>
        <p className="mt-3 text-foreground-muted">
          Have an opportunity, a question, or just want to connect? Send me a
          message below, or reach out directly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input
            type="hidden"
            name="access_key"
            value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
          />

          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-surface-border bg-surface px-4 py-2.5 text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-surface-border bg-surface px-4 py-2.5 text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-lg border border-surface-border bg-surface px-4 py-2.5 text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-accent">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </form>

        <div className="mt-14 border-t border-surface-border pt-8 text-sm text-foreground-muted">
          <p className="font-medium text-foreground">Prefer to reach out directly?</p>

          <ul className="mt-4 space-y-2">
            <li>
              Email: <a href="mailto:aidanbarends95@gmail.com" className="text-accent hover:underline">aidanbarends95@gmail.com</a>
            </li>
            <li>
              Phone: <a href="tel:+27716808399" className="text-accent hover:underline">071 680 8399</a>
            </li>
            <li>
              LinkedIn: <a href="https://www.linkedin.com/in/aidan-barends/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">linkedin.com/in/aidan-barends</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/aidan-g-barends" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">github.com/aidan-g-barends</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}