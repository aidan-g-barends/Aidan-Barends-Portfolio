import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
} from "lucide-react";
import { projects } from "../../../data/projects";
import type { Project } from "../../../data/projects";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ImageFrame({
  image,
  name,
  live,
  liveIsProduction,
  isIllustration,
}: {
  image: string;
  name: string;
  live?: string;
  liveIsProduction?: boolean;
  isIllustration?: boolean;
}) {
  const liveLabel = liveIsProduction ? "Live Site" : "Live Demo";

  const frameContent = (
    <>
      {live && (
        <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />

          <span className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
            {getDomain(live)}
          </span>
        </div>
      )}

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={
            isIllustration
              ? `Illustration representing ${name}`
              : `${name} screenshot`
          }
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover/image:scale-[1.03]"
          preload
        />

        {live && (
          <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm">
              Visit {liveLabel} ↗
            </span>
          </div>
        )}
      </div>
    </>
  );

  const frameClassName =
    "group/image relative mt-8 block w-full overflow-hidden rounded-xl border border-surface-border bg-surface";

  if (!live) {
    return (
      <div
        data-gsap="reveal"
        className={frameClassName}
        style={{
          boxShadow: "var(--card-shadow)",
        }}
      >
        {frameContent}
      </div>
    );
  }

  return (
    <a
      data-gsap="reveal"
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      className={frameClassName}
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {frameContent}
    </a>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) return {};

  return {
    title: `${project.name} | Aidan Barends`,
    description: project.description,
  };
}

const statusLabels: Record<Project["status"], string> = {
  live: "Live project",
  "github-only": "Code on GitHub",
  "in-progress": "In progress",
};

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </h2>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projectIndex = projects.findIndex(
    (item) => item.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject =
    projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-0"
        />

        <div
          data-gsap="parallax"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-24 h-[380px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 pb-4 pt-16">
          <div data-gsap="hero">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All projects
            </Link>
          </div>

          <div data-gsap="hero">
            <p className="mt-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
              {[
                project.university && "University project",
                project.clientWork && "Client work",
                statusLabels[project.status],
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {project.name}
            </h1>

            <p className="mt-4 text-lg text-foreground-muted">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-surface-border bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        {project.image && (
          <ImageFrame
            image={project.image}
            name={project.name}
            live={project.live}
            liveIsProduction={project.liveIsProduction}
            isIllustration={project.imageIsIllustration}
          />
        )}

        <div
          data-gsap="scale"
          className="mt-8 flex flex-wrap gap-3 text-sm font-medium"
        >
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
            >
              {project.liveIsProduction ? "Visit Live Site" : "Open Live Demo"}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={
                project.live
                  ? "inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-5 py-2.5 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent"
                  : "inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
              }
            >
              {project.private
                ? "View on GitHub (Private)"
                : "View on GitHub"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}

          {project.githubFrontend && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-5 py-2.5 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              Frontend GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}

          {project.githubBackend && (
            <a
              href={project.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-5 py-2.5 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              Backend GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>

        {project.demoCredentials && (
          <div
            data-gsap="reveal"
            className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm"
          >
            <p className="font-semibold text-foreground">
              Try it yourself
            </p>

            {project.demoCredentials.note && (
              <p className="mt-1 text-foreground-muted">
                {project.demoCredentials.note}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-[family-name:var(--font-mono)] text-xs text-foreground">
              <span>Email: {project.demoCredentials.email}</span>
              <span>Password: {project.demoCredentials.password}</span>
            </div>
          </div>
        )}

        <div className="mt-14 space-y-12">
          {(project.problem || project.role) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.problem && (
                <div
                  data-gsap="reveal"
                  className="rounded-2xl border border-surface-border bg-surface p-6"
                  style={{
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <SectionHeading>The Problem</SectionHeading>

                  <p className="mt-3 leading-relaxed text-foreground">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.role && (
                <div
                  data-gsap="reveal"
                  className="rounded-2xl border border-surface-border bg-surface p-6"
                  style={{
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <SectionHeading>My Role</SectionHeading>

                  <p className="mt-3 leading-relaxed text-foreground">
                    {project.role}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.features && (
            <div data-gsap="reveal">
              <SectionHeading>Key Features</SectionHeading>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-lg border border-surface-border bg-surface/60 p-3 text-sm text-foreground transition-colors duration-300 hover:border-accent/40"
                  >
                    <CircleCheck
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div
              data-gsap="reveal"
              className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-25 blur-3xl dark:opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                <SectionHeading>Challenges</SectionHeading>

                <p className="mt-3 leading-relaxed text-foreground">
                  {project.challenges}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* PREVIOUS / NEXT */}
        <nav
          aria-label="More projects"
          data-gsap="reveal"
          className="mt-16 grid gap-4 border-t border-surface-border pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${previousProject.slug}`}
            className="group rounded-xl border border-surface-border bg-surface p-4 transition-colors duration-300 hover:border-accent/50"
          >
            <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Previous
            </span>

            <p className="mt-1 font-semibold transition-colors group-hover:text-accent">
              {previousProject.name}
            </p>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group rounded-xl border border-surface-border bg-surface p-4 text-right transition-colors duration-300 hover:border-accent/50"
          >
            <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
              Next
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>

            <p className="mt-1 font-semibold transition-colors group-hover:text-accent">
              {nextProject.name}
            </p>
          </Link>
        </nav>
      </section>
    </>
  );
}
