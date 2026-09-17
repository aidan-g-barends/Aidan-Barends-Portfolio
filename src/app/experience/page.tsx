import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Wrench,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Experience & Education | Aidan Barends",
  description:
    "Aidan Barends' professional experience as an IT Field Technician at CraythorneIT, along with education at CPUT and relevant certifications.",
};

const highlights = [
  {
    icon: Code2,
    title: "Ships Real Products",
    description:
      "Live sites and full-stack apps built for actual clients and teams, not just tutorial follow-alongs.",
  },
  {
    icon: Wrench,
    title: "Client-Facing & Reliable",
    description:
      "I show up on-site, fix the problem, and keep client networks running with no one holding my hand.",
  },
  {
    icon: Zap,
    title: "Learns Fast, Alone",
    description:
      "Picked up Tailwind, GSAP, Supabase, and now AI agents largely by teaching myself outside of class.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          data-gsap="parallax"
          className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />

        <div
          data-gsap="hero"
          className="relative mx-auto max-w-3xl px-6 py-20 text-center"
        >
          <h1 className="text-3xl font-bold">
            Experience & Education
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
            I spend my days fixing real networks and hardware for
            paying clients, and my nights shipping full-stack apps
            and studying Software Engineering. Here&apos;s the proof.
          </p>

          <Link
            href="/resume.pdf"
            target="_blank"
            className="mt-6 inline-block rounded-lg border border-surface-border px-6 py-3 text-sm font-medium text-foreground transition-transform duration-300 hover:-translate-y-1 hover:border-accent"
          >
            Download Resume
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-3xl px-6 pb-4">
        <div
          data-gsap="stagger"
          className="grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                style={{
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <Icon className="h-5 w-5 text-accent" />

                <h3 className="mt-3 text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-foreground-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div
          data-gsap="reveal"
          className="flex items-center gap-2"
        >
          <Briefcase className="h-5 w-5 text-accent" />

          <h2 className="text-2xl font-bold">
            Experience
          </h2>
        </div>

        <div className="relative mt-10 border-l-2 border-surface-border pl-8">
          <div
            data-gsap="timeline-line"
            className="pointer-events-none absolute -left-0.5 top-0 h-full w-0.5 origin-top bg-accent"
          />

          <div
            data-gsap="stagger"
            className="space-y-4"
          >
            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-accent transition-transform duration-300 group-hover:scale-125" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    IT Field Technician
                  </h3>

                  <span className="text-sm text-foreground-muted">
                    Jul 2026 – Present
                  </span>
                </div>

                <p className="text-sm text-foreground-muted">
                  CraythorneIT
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground-muted">
                  <li>
                    Run Wi-Fi assessments, installs, and
                    configurations solo, for residential and
                    business clients, no supervision needed once
                    on-site.
                  </li>

                  <li>
                    Diagnose and resolve live network outages under
                    time pressure, using Fing to pinpoint the failing
                    device fast.
                  </li>

                  <li>
                    Configure and maintain routers across multiple
                    client networks, keeping them online and fixing
                    what breaks.
                  </li>

                  <li>
                    Handle full PC builds and hardware repairs
                    end-to-end, from diagnosis to fix.
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Networking",
                    "Troubleshooting",
                    "Client Communication",
                    "Hardware",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-background px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-surface-border transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    IT Field Technician
                  </h3>

                  <span className="text-sm text-foreground-muted">
                    Aug 2025 – Jan 2026
                  </span>
                </div>

                <p className="text-sm text-foreground-muted">
                  CraythorneIT
                </p>
              </div>
            </div>

            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-surface-border transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground-muted transition-colors group-hover:text-accent">
                    Other Experience
                  </h3>

                  <span className="text-sm text-foreground-muted">
                    2022 – 2025
                  </span>
                </div>

                <p className="mt-2 text-sm text-foreground-muted">
                  Waiter (Cape Town Fish Market), Barman (Die
                  Strandloper), Classroom & Music Assistant
                  (Longacres Private School), Background Actor
                  (39 Steps Agency), and Lifeguard (NSRI). Roles
                  spanning hospitality, education, and emergency
                  response, building customer service, teamwork, and
                  reliability under pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div
          data-gsap="reveal"
          className="flex items-center gap-2"
        >
          <GraduationCap className="h-5 w-5 text-accent" />

          <h2 className="text-2xl font-bold">
            Education
          </h2>
        </div>

        <div className="relative mt-10 border-l-2 border-surface-border pl-8">
          <div
            data-gsap="timeline-line"
            className="pointer-events-none absolute -left-0.5 top-0 h-full w-0.5 origin-top bg-accent"
          />

          <div
            data-gsap="stagger"
            className="space-y-4"
          >
            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-accent transition-transform duration-300 group-hover:scale-125" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    Diploma in ICT: Application Development
                  </h3>

                  <span className="text-sm text-foreground-muted">
                    2024 – Present
                  </span>
                </div>

                <p className="text-sm text-foreground-muted">
                  Cape Peninsula University of Technology (CPUT)
                </p>
              </div>
            </div>

            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-surface-border transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                    National Senior Certificate (NSC)
                  </h3>

                  <span className="text-sm text-foreground-muted">
                    2018 – 2022
                  </span>
                </div>

                <p className="text-sm text-foreground-muted">
                  Hopefield High School
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div
          data-gsap="reveal"
          className="flex items-center gap-2"
        >
          <Award className="h-5 w-5 text-accent" />

          <h2 className="text-2xl font-bold">
            Certifications
          </h2>
        </div>

        <ul
          data-gsap="stagger"
          className="mt-4 space-y-1"
        >
          <li className="group -mx-4 flex flex-wrap items-center gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              The Complete Web Development Bootcamp (Angela Yu,
              Udemy)
            </span>

            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              Completed
            </span>
          </li>

          <li className="group -mx-4 flex flex-wrap items-center gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              4IR Digital Skills Training Programme
            </span>

            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              Completed
            </span>
          </li>

          <li className="group -mx-4 flex flex-wrap items-center gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              AI course (Ed Donner)
            </span>

            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              In Progress
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}