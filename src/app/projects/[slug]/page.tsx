import { notFound } from "next/navigation";
import { projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div data-gsap="hero">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">
            {project.name}
          </h1>

          {project.inProgress && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              In Progress
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-md bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {project.problem && (
          <div data-gsap="reveal">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              The Problem
            </h2>

            <p className="mt-2 text-foreground">
              {project.problem}
            </p>
          </div>
        )}

        {project.role && (
          <div data-gsap="reveal">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              My Role
            </h2>

            <p className="mt-2 text-foreground">
              {project.role}
            </p>
          </div>
        )}

        {project.features && (
          <div data-gsap="reveal">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Key Features
            </h2>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.challenges && (
          <div data-gsap="reveal">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Challenges
            </h2>

            <p className="mt-2 text-foreground">
              {project.challenges}
            </p>
          </div>
        )}
      </div>

      <div
        data-gsap="scale"
        className="mt-10 flex flex-wrap gap-4 text-sm font-medium"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-5 py-2.5 text-background transition-transform duration-300 hover:-translate-y-1 hover:opacity-90"
          >
            View on GitHub →
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-surface-border px-5 py-2.5 text-foreground transition-colors duration-300 hover:border-accent"
          >
            Live Demo →
          </a>
        )}
      </div>
    </section>
  );
}