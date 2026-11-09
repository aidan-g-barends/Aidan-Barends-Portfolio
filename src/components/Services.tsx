import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Globe,
  MessagesSquare,
  PenTool,
  Code2,
  Rocket,
  MessageCircle,
} from "lucide-react";
import Eyebrow from "./Eyebrow";
import { WHATSAPP_URL } from "../lib/site";

const services = [
  {
    icon: Globe,
    title: "Business websites",
    description:
      "A professional, fast, mobile-friendly site that explains what you do and makes it easy for customers to get in touch.",
    example: { label: "See JJS Business Solutions", href: "/projects/jjs-business-solutions" },
  },
  {
    icon: CalendarCheck,
    title: "Booking systems & web apps",
    description:
      "Let customers book online any time, with a simple staff side to manage the day's appointments.",
    example: { label: "See Beauty Spot", href: "/projects/beauty-spot" },
  },
  {
    icon: Rocket,
    title: "Launch & deployment",
    description:
      "I deploy your site so it's live, fast, and ready for customers, and hand it over in a state that's easy to update.",
    example: { label: "See all live work", href: "/projects#live" },
  },
];

const process = [
  {
    icon: MessagesSquare,
    title: "Chat",
    description: "We talk through your business and what the site needs to do.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "I plan the pages and design the look around your brand.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "I build it properly, responsive and fast, and check in with you along the way.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Your site goes live and I hand it over to you, ready for customers.",
  },
];

// Home page section aimed at freelance clients
export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden border-t border-surface-border"
    >
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <div
          data-gsap="reveal"
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <Eyebrow index="02" label="For businesses" />

            <h2 className="text-2xl font-bold sm:text-3xl">
              Need a website?{" "}
              <span className="text-gradient">I build them.</span>
            </h2>

            <p className="mt-2 max-w-xl text-foreground-muted">
              I&apos;m a freelance web developer taking on new
              clients. Here&apos;s what I can do for your business.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?topic=freelance"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
            >
              Start a project
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 dark:text-emerald-400"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp me
            </a>
          </div>
        </div>

        <div
          data-gsap="stagger"
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="spotlight-card group flex flex-col rounded-2xl border border-surface-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                style={{
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-accent/20 to-accent-2/20">
                  <Icon
                    className="h-5 w-5 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {service.description}
                </p>

                <Link
                  href={service.example.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  {service.example.label}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* PROCESS */}
        <div
          data-gsap="reveal"
          className="mt-14"
        >
          <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
            How it works
          </h3>

          <ol className="relative mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line behind the step numbers on wide screens */}
            <div
              aria-hidden="true"
              className="absolute left-5 right-5 top-5 hidden h-px bg-linear-to-r from-accent via-accent-2 to-accent opacity-40 lg:block"
            />

            {process.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className="relative"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
                    <Icon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
                    Step {index + 1}
                  </p>

                  <p className="mt-1 font-semibold">{step.title}</p>

                  <p className="mt-1 text-sm text-foreground-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
