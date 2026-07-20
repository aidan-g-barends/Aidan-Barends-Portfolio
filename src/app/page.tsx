import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <p className="font-[family-name:var(--font-mono)] text-sm text-accent">
        IT Field Technician → Software Engineering Student → Aspiring AI Engineer
      </p>

      <h1 className="mt-6 text-4xl font-bold sm:text-6xl">
        Hey, I&apos;m Aidan Barends.
      </h1>

      <p className="mt-6 max-w-xl text-lg text-foreground-muted">
        A Software Engineering student at CPUT who builds full stack web
        applications, and is working toward becoming an AI Engineer.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/projects"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          View My Work
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          className="rounded-lg border border-surface-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
}