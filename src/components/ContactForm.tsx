"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import gsap from "gsap";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

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

  function handleCardMouseEnter(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    gsap.to(event.currentTarget, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleCardMouseLeave(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    gsap.to(event.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: "aidanbarends95@gmail.com",
      href: "mailto:aidanbarends95@gmail.com",
      cta: "Email me",
      external: false,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "071 680 8399",
      href: "tel:+27716808399",
      cta: "Call me",
      external: false,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com/aidan-g-barends",
      href: "https://github.com/aidan-g-barends",
      cta: "View profile",
      external: true,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "linkedin.com/in/aidan-barends",
      href: "https://www.linkedin.com/in/aidan-barends/",
      cta: "View profile",
      external: true,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div
        data-gsap="parallax"
        className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-20">
        {/* Heading */}
        <div data-gsap="hero">
          <h1 className="text-3xl font-bold">
            Get In Touch
          </h1>

          <p className="mt-3 text-foreground-muted">
            Have an opportunity, a question, or just want to
            connect? Send me a message below, or reach out directly.
          </p>
        </div>

        <div className="mt-10 grid gap-12">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            data-gsap="reveal"
            className="space-y-5"
          >
            <input
              type="hidden"
              name="access_key"
              value={
                process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""
              }
            />

            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
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
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
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
              <label
                htmlFor="message"
                className="text-sm font-medium"
              >
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
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-1 hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending"
                ? "Sending..."
                : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-accent">
                Thanks for reaching out — I&apos;ll get back to you
                soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again, or email me
                directly.
              </p>
            )}
          </form>

          {/* DIRECT CONTACT */}
          <div>
            <div data-gsap="reveal">
              <h2 className="text-lg font-bold">
                Prefer to reach out directly?
              </h2>
            </div>

            <div
              data-gsap="stagger"
              className="mt-5 space-y-4"
            >
              {contactCards.map((card) => {
                const Icon = card.icon;

                const linkProps = card.external
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <div
                    key={card.label}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                    className="flex items-start gap-4 rounded-lg border border-surface-border bg-surface p-4 will-change-transform transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {card.label}
                      </p>

                      <p className="mt-1 break-all text-sm text-foreground-muted">
                        {card.value}
                      </p>

                      <a
                        href={card.href}
                        {...linkProps}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                      >
                        {card.cta}
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}