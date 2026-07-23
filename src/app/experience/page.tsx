export default function ExperiencePage() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[240px] h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Experience & Education</h1>
        <p className="mt-3 text-foreground-muted">
          Where I&apos;ve worked, studied, and what I&apos;ve been building
          my skills with.
        </p>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            Experience
          </h2>

          <div
            style={{ boxShadow: "var(--card-shadow)" }}
            className="mt-4 rounded-xl border border-surface-border bg-surface p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">IT Field Technician</h3>
              <span className="text-sm text-foreground-muted">
                Aug 2025 – Jan 2026, Jul 2026 – Present
              </span>
            </div>
            <p className="text-sm text-foreground-muted">CraythorneIT</p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-muted">
              <li>
                Perform Wi-Fi assessments, installations, and configurations
                for residential and business clients.
              </li>
              <li>
                Troubleshoot network connectivity issues and diagnose devices
                on-site using Fing.
              </li>
              <li>
                Configure routers and maintain client networks, responding to
                and resolving outages.
              </li>
              <li>Carry out PC builds, hardware repairs, and system upgrades.</li>
            </ul>
          </div>

          <div
            style={{ boxShadow: "var(--card-shadow)" }}
            className="mt-6 rounded-xl border border-surface-border bg-surface p-6"
          >
            <h3 className="text-sm font-semibold text-foreground-muted">
              Other Experience
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Waiter (Cape Town Fish Market), Barman (Die Strandloper),
              Classroom & Music Assistant (Longacres Private School),
              Background Actor (39 Steps Agency), Lifeguard (NSRI) —
              2022–2025. Roles spanning hospitality, education, and emergency
              response, building customer service, teamwork, and reliability
              under pressure.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            Education
          </h2>

          <div
            style={{ boxShadow: "var(--card-shadow)" }}
            className="mt-4 rounded-xl border border-surface-border bg-surface p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                Diploma in ICT: Application Development
              </h3>
              <span className="text-sm text-foreground-muted">2024 – Present</span>
            </div>
            <p className="text-sm text-foreground-muted">
              Cape Peninsula University of Technology (CPUT)
            </p>
          </div>

          <div
            style={{ boxShadow: "var(--card-shadow)" }}
            className="mt-6 rounded-xl border border-surface-border bg-surface p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                National Senior Certificate (NSC)
              </h3>
              <span className="text-sm text-foreground-muted">2018 – 2022</span>
            </div>
            <p className="text-sm text-foreground-muted">Hopefield High School</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            Certifications
          </h2>

          <div
            style={{ boxShadow: "var(--card-shadow)" }}
            className="mt-4 rounded-xl border border-surface-border bg-surface p-6"
          >
            <ul className="list-disc space-y-2 pl-5 text-foreground-muted">
              <li>
                The Complete Web Development Bootcamp — Angela Yu (Udemy),
                Completed
              </li>
              <li>4IR Digital Skills Training Programme</li>
              <li>
                AI course — Ed Donner (in progress)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}