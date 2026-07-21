import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const skillGroups = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "PHP", "SQL"] },
  { label: "Frameworks", items: ["React", "Next.js", "Node.js", "Laravel", "Tailwind CSS"] },
  { label: "Databases", items: ["MySQL", "PostgreSQL"] },
  { label: "Networking & Hardware", items: ["Router Config", "Wi-Fi Setup", "PC Builds", "Troubleshooting"] },
];

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-40">
          <p className="font-[family-name:var(--font-mono)] text-sm text-accent">
            IT Field Technician → Software Engineering Student → Aspiring AI Engineer
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
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
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <p className="mt-2 text-foreground-muted">
          A couple of things I&apos;ve built recently.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface/50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="mt-2 text-foreground-muted">
            Technologies and tools I work with.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="group rounded-xl border border-surface-border bg-background p-6 transition hover:border-accent/40"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                    {group.label}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs transition group-hover:bg-accent/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-2xl border border-surface-border bg-surface px-6 py-16 text-center sm:px-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Interested in working together?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-foreground-muted">
            I&apos;m open to junior developer roles and opportunities to keep
            learning and building.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}