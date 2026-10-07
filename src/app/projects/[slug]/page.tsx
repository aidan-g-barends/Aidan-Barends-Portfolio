import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProjectShot from "../../../components/ProjectShot";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Lock,
} from "lucide-react";
import { projects } from "../../../data/projects";
import type { Project } from "../../../data/projects";
import { getDomain, linkTarget } from "../../../lib/links";

function ImageFrame({ project }: { project: Project }) {
  const { live, liveIsProduction } = project;
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
        <ProjectShot
          project={project}
          sizes="(min-width: 768px) 768px, 100vw"
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

  const frame = live ? (
    <a
      href={live}
      {...linkTarget(live)}
      className={frameClassName}
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {frameContent}
    </a>
  ) : (
    <div
      className={frameClassName}
      style={{
        boxShadow: "var(--card-shadow)",
      }}
    >
      {frameContent}
    </div>
  );

  if (!project.mobileImage) {
    return <div data-gsap="reveal">{frame}</div>;
  }

  // Phone mockup overlapping the desktop frame shows the responsive layout
  return (
    <div
      data-gsap="reveal"
      className="relative mb-12 sm:mb-16"
    >
      {frame}

      <figure className="absolute -bottom-12 -right-2 w-[110px] sm:-bottom-16 sm:-right-8 sm:w-[160px] md:w-[180px]">
        <div className="relative overflow-hidden rounded-[1.6rem] border-[5px] border-[#0B0F14] bg-[#0B0F14] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] dark:border-[#232C38]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#0B0F14]/80"
          />

          <Image
            src={project.mobileImage}
            alt={`${project.name} on a phone`}
            width={390}
            height={844}
            sizes="180px"
            className="h-auto w-full rounded-[1.2rem]"
          />
        </div>

        <figcaption className="mt-2 text-center font-[family-name:var(--font-mono)] text-[11px] text-foreground-muted">
          Mobile view
        </figcaption>
      </figure>
    </div>
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

  // Up to four tiles: project-specific figures first, then counts
  const stats = [
    ...(project.stats ?? []),
    { value: String(project.tech.length), label: "Technologies" },
    ...(project.features
      ? [{ value: String(project.features.length), label: "Key features" }]
      : []),
    {
      value: project.status === "live" ? "Live" : project.status === "in-progress" ? "WIP" : "Code",
      label: project.status === "live" ? "Deployed" : project.status === "in-progress" ? "In progress" : "On GitHub",
    },
  ].slice(0, 4);

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

          <dl
            data-gsap="stagger"
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-surface-border bg-surface/70 px-4 py-3 backdrop-blur"
              >
                <dt className="sr-only">{stat.label}</dt>

                <dd>
                  <span className="block font-[family-name:var(--font-heading)] text-2xl font-bold text-accent">
                    {stat.value}
                  </span>

                  <span
                    aria-hidden="true"
                    className="block text-xs text-foreground-muted"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        {project.image && (
          <ImageFrame project={project} />
        )}

        <div
          data-gsap="scale"
          className="mt-8 flex flex-wrap gap-3 text-sm font-medium"
        >
          {project.live && (
            <a
              href={project.live}
              {...linkTarget(project.live)}
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

          {/* Private repos can't be opened by visitors, so just say so */}
          {project.github && project.private && (
            <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-surface-border px-5 py-2.5 text-foreground-muted">
              <Lock size={15} aria-hidden="true" />
              Private repository
            </span>
          )}

          {project.github && !project.private && (
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
              View on GitHub
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
          {project.buildNotes && (
            <div
              data-gsap="reveal"
              className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8"
              style={{
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div
                aria-hidden="true"
                className="hero-grid pointer-events-none absolute inset-0 opacity-60"
              />

              <div className="relative">
                <SectionHeading>How I built it</SectionHeading>

                <ol className="mt-6 grid gap-6 md:grid-cols-3">
                  {[
                    { label: "The problem", text: project.buildNotes.problem },
                    { label: "Key decision", text: project.buildNotes.decision },
                    { label: "The result", text: project.buildNotes.result },
                  ].map((step, index) => (
                    <li
                      key={step.label}
                      className="relative"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background font-[family-name:var(--font-mono)] text-xs font-semibold text-accent">
                          {index + 1}
                        </span>

                        <h3 className="font-semibold">{step.label}</h3>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {step.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

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
