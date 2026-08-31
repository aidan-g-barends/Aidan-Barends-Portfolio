"use client";

import Link from "next/link";
import { useRef } from "react";
import type { MouseEvent } from "react";
import gsap from "gsap";
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

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
      className="group flex h-full flex-col rounded-xl border border-surface-border bg-surface p-6 will-change-transform transition-colors hover:border-accent/50"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-200 hover:text-accent"
          >
            {project.name}
          </Link>
        </h3>

        {project.inProgress && (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            In Progress
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm text-foreground-muted">
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

      <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
        {/* Standard GitHub repository */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-transform duration-200 hover:translate-x-1 hover:underline"
          >
            GitHub →
          </a>
        )}

        {/* Frontend repository */}
        {project.githubFrontend && (
          <a
            href={project.githubFrontend}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-transform duration-200 hover:translate-x-1 hover:underline"
          >
            Frontend GitHub →
          </a>
        )}

        {/* Backend repository */}
        {project.githubBackend && (
          <a
            href={project.githubBackend}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-transform duration-200 hover:translate-x-1 hover:underline"
          >
            Backend GitHub →
          </a>
        )}

        {/* Live deployment */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-transform duration-200 hover:translate-x-1 hover:underline"
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}