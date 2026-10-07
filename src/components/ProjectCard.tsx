"use client";

import Link from "next/link";
import ProjectShot from "./ProjectShot";
import { useRef } from "react";
import type { MouseEvent } from "react";
import gsap from "gsap";
import { ExternalLink, GraduationCap, Lock } from "lucide-react";
import GithubIcon from "./GithubIcon";
import type { Project } from "../data/projects";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const liveLabel = project.liveIsProduction ? "Live Site" : "Live Demo";

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Spotlight border position (static glow, so fine for reduced motion)
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rotateY = (x / rect.width - 0.5) * 5;
    const rotateX = (y / rect.height - 0.5) * -5;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function handleMouseLeave() {
    const card = cardRef.current;

    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="spotlight-card group flex h-full flex-col overflow-hidden rounded-xl border border-surface-border bg-surface will-change-transform transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[0_20px_50px_-20px_var(--accent)]"
    >
      {project.image && (
        <a
          href={project.live ?? `/projects/${project.slug}`}
          target={project.live ? "_blank" : undefined}
          rel={project.live ? "noopener noreferrer" : undefined}
          className="group/image relative block w-full overflow-hidden border-b border-surface-border bg-background"
        >
          {project.live && (
            <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />

              <span className="ml-2 flex-1 truncate rounded-md bg-background px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-foreground-muted">
                {getDomain(project.live)}
              </span>
            </div>
          )}

          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <ProjectShot
              project={project}
              sizes="(min-width: 640px) 50vw, 100vw"
            />

            {project.live && (
              <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm">
                  Visit {liveLabel} ↗
                </span>
              </div>
            )}
          </div>
        </a>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors duration-200 hover:text-accent"
            >
              {project.name}
            </Link>
          </h3>

          {project.status === "in-progress" && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              In Progress
            </span>
          )}

          <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
            {project.university && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">
                <GraduationCap size={12} aria-hidden="true" />
                Uni project
              </span>
            )}

            {project.clientWork && (
              <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-accent-2">
                Client
              </span>
            )}

            {project.status === "live" && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                Live
              </span>
            )}
          </div>
        </div>

        <p className="mt-2 line-clamp-4 flex-1 text-sm text-foreground-muted sm:line-clamp-none">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-md bg-background px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-medium">
          {/* Live deployment */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-background transition-transform duration-300 hover:scale-105"
            >
              {liveLabel}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}

          {/* Repositories: one repo, or separate frontend and backend */}
          {[
            { href: project.github, label: "Source" },
            { href: project.githubFrontend, label: "Frontend" },
            { href: project.githubBackend, label: "Backend" },
          ]
            .filter((repo) => repo.href)
            .map((repo) =>
              project.private ? (
                <span
                  key={repo.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-surface-border px-4 py-2 text-foreground-muted"
                >
                  <Lock size={13} aria-hidden="true" />
                  Private repo
                </span>
              ) : (
                <a
                  key={repo.label}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-surface-border px-4 py-2 transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/5"
                >
                  <GithubIcon size={14} />
                  {repo.label}
                </a>
              )
            )}
        </div>
      </div>
    </div>
  );
}