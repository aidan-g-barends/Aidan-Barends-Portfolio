import Link from "next/link";
import { ArrowRight, ExternalLink, GraduationCap, Lock } from "lucide-react";
import type { Project } from "../data/projects";
import ProjectShot from "./ProjectShot";
import GithubIcon from "./GithubIcon";
import { getDomain, linkTarget } from "../lib/links";

// Large showcase row for the home page: screenshot on one side, the story and
// links on the other. Rows alternate sides on desktop and stack on phones.
export default function FeaturedProject({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reversed = index % 2 === 1;
  const liveLabel = project.liveIsProduction ? "Live Site" : "Live Demo";
  const source = project.github ?? project.githubFrontend;
  const keyFeatures = project.features?.slice(0, 3) ?? [];

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      {/* Screenshot in a browser frame */}
      <div
        className={`relative lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-25 blur-3xl dark:opacity-15"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
          }}
        />

        <a
          href={project.live ?? `/projects/${project.slug}`}
          {...linkTarget(project.live ?? "/")}
          aria-label={
            project.live
              ? `Open the ${project.name} ${liveLabel.toLowerCase()}`
              : `Read about ${project.name}`
          }
          className="group/image relative block overflow-hidden rounded-xl border border-surface-border bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/40"
        >
          <div className="flex items-center gap-1.5 border-b border-surface-border px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />

            <span className="ml-2 flex-1 truncate rounded-md bg-background px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-foreground-muted">
              {project.live ? getDomain(project.live) : `${project.slug}.local`}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
            <ProjectShot
              project={project}
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </div>
        </a>
      </div>

      {/* Story and links */}
      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          <span aria-hidden="true" className="h-px w-8 bg-surface-border" />

          {project.clientWork && (
            <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-accent-2">
              Client
            </span>
          )}

          {project.university && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">
              <GraduationCap size={12} aria-hidden="true" />
              Uni project
            </span>
          )}

          {project.status === "live" && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
              Live
            </span>
          )}

          {project.status === "in-progress" && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              In Progress
            </span>
          )}
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-200 hover:text-accent"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-4 text-foreground-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-surface-border bg-surface px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              {...linkTarget(project.live)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-105"
            >
              {liveLabel}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}

          {source && !project.private && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/5"
            >
              <GithubIcon size={15} />
              Source
            </a>
          )}

          {project.private && (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-surface-border px-5 py-2.5 text-sm font-medium text-foreground-muted">
              <Lock size={14} aria-hidden="true" />
              Private repo
            </span>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-1 px-1 text-sm font-medium text-accent"
          >
            Case study
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {keyFeatures.length > 0 && (
          <div className="mt-7 border-t border-surface-border pt-5">
            <p className="text-sm font-semibold">Key features</p>

            <ul className="mt-3 space-y-2">
              {keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm text-foreground-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
