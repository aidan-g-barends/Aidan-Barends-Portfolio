import Link from "next/link";
import { projects } from "./data/projects";
import ProjectCard from "./components/ProjectCard";


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

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold">Featured Projects</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold">Skills</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-xl border border-surface-border bg-surface p-6"
            >
              <h3 className="text-sm font-semibold text-foreground-muted">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-background px-2 py-1 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Interested in working together?
        </h2>
        <p className="mt-4 max-w-md text-foreground-muted">
          I&apos;m open to junior developer roles and opportunities to keep
          learning and building.
        </p>
        <Link
          href="/contact"
          className="mt-8 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          Get In Touch
        </Link>
      </section>
    </>
  );
}