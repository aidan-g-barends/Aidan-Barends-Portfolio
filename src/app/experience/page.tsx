import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Education | Aidan Barends",
  description:
    "Aidan Barends' professional experience as an IT Field Technician at CraythorneIT, along with education at CPUT and relevant certifications.",
};

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

          <p className="mt-3 text-foreground-muted">
            Where I&apos;ve worked, studied, and what I&apos;ve been
            building my skills with.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div data-gsap="reveal">
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
                    Aug 2025 – Jan 2026, Jul 2026 – Present
                  </span>
                </div>

                <p className="text-sm text-foreground-muted">
                  CraythorneIT
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground-muted">
                  <li>
                    Perform Wi-Fi assessments, installations, and
                    configurations for residential and business
                    clients.
                  </li>

                  <li>
                    Troubleshoot network connectivity issues and
                    diagnose devices on-site using Fing.
                  </li>

                  <li>
                    Configure routers and maintain client networks,
                    responding to and resolving outages.
                  </li>

                  <li>
                    Carry out PC builds, hardware repairs, and
                    system upgrades.
                  </li>
                </ul>
              </div>
            </div>

            <div
              data-gsap="timeline"
              className="group relative"
            >
              <span className="absolute -left-[41px] top-5 h-4 w-4 rounded-full border-2 border-background bg-surface-border transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />

              <div className="-ml-4 rounded-lg p-4 transition-colors duration-300 group-hover:bg-surface">
                <h3 className="text-sm font-semibold text-foreground-muted transition-colors group-hover:text-accent">
                  Other Experience
                </h3>

                <p className="mt-2 text-sm text-foreground-muted">
                  Waiter (Cape Town Fish Market), Barman (Die
                  Strandloper), Classroom & Music Assistant
                  (Longacres Private School), Background Actor
                  (39 Steps Agency), Lifeguard (NSRI) — 2022–2025.
                  Roles spanning hospitality, education, and
                  emergency response, building customer service,
                  teamwork, and reliability under pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div data-gsap="reveal">
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
        <div data-gsap="reveal">
          <h2 className="text-2xl font-bold">
            Certifications
          </h2>
        </div>

        <ul
          data-gsap="stagger"
          className="mt-4 space-y-1"
        >
          <li className="group -mx-4 flex items-start gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              The Complete Web Development Bootcamp — Angela Yu
              (Udemy), Completed
            </span>
          </li>

          <li className="group -mx-4 flex items-start gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              4IR Digital Skills Training Programme
            </span>
          </li>

          <li className="group -mx-4 flex items-start gap-3 rounded-lg p-4 transition-colors duration-300 hover:bg-surface">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />

            <span className="text-foreground-muted transition-colors group-hover:text-foreground">
              AI course — Ed Donner (in progress)
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}