import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aidan Barends",
  description:
    "Learn more about Aidan Barends — a Software Engineering student at CPUT with a background in IT support, networking, and hardware, working toward becoming an AI Engineer.",
};

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 top-[280px] h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl 2xl:max-w-4xl px-6 py-20">
        <div className="flex items-center gap-5">
          <Image
            src="/profile.jpeg"
            alt="Aidan Barends"
            width={72}
            height={72}
            className="rounded-full border border-surface-border object-cover"
            style={{ boxShadow: "var(--card-shadow)" }}
            priority
          />
          <h1 className="text-3xl font-bold">About Me</h1>
        </div>

        <div className="mt-8 space-y-5 text-foreground-muted">
          <p>
            I got into tech the way a lot of people my age did, through
            gaming. Messing around with computers as a kid turned into taking
            Computer Applications Technology (CAT) in school, where I did well
            and realized this was the path I wanted to follow.
          </p>

          <p>
            Today I&apos;m a Software Engineering student at CPUT (Application
            Development), and I work as an IT Field Technician at
            CraythorneIT, where I do everything from Wi-Fi assessments and
            router configuration to hardware repairs and PC builds for real
            clients. It&apos;s hands-on, problem-solving work, and it&apos;s
            taught me a lot about troubleshooting under real-world conditions
            — not just in a classroom.
          </p>

          <p>
            Outside of coursework, I&apos;m constantly upskilling myself.
            I&apos;ve completed Angela Yu&apos;s Complete Web Development
            Bootcamp, and I&apos;m currently working through Ed Donner&apos;s
            AI course. What draws me to AI specifically is the idea of
            building systems that can automate the kind of hands-on technical
            work I already do, that&apos;s the direction I want my career to
            keep moving in.
          </p>

          <p>
            My goal after graduating is to land a junior developer role, keep
            building toward becoming an AI Engineer, and eventually start my
            own company, ideally one that makes a real difference, not just
            money. I care about that a lot, which is part of why healthcare
            and fintech are the industries that excite me most.
          </p>
        </div>

        <div
          style={{ boxShadow: "var(--card-shadow)" }}
          className="mt-16 rounded-xl border border-surface-border bg-surface p-6"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            What I&apos;m About
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Patient",
              "Hardworking",
              "Eager to Learn",
              "Good Listener",
              "Team Player",
              "Adaptable",
              "Detail-Oriented",
            ].map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-surface-border bg-background px-4 py-1.5 text-sm transition hover:border-accent/50 hover:text-accent"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{ boxShadow: "var(--card-shadow)" }}
          className="mt-8 rounded-xl border border-surface-border bg-surface p-6"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            Outside of Tech
          </h2>
          <p className="mt-4 text-foreground-muted">
            Rugby, soccer, and hockey keep me active and I still play piano
            when I get the chance. And yes, I&apos;m still a gamer, the same
            thing that got me into tech in the first place.
          </p>
        </div>
      </div>
    </section>
  );
}