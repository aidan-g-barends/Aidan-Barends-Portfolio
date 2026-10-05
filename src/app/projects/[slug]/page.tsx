import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "../../../data/projects";

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

          {project.status === "in-progress" && (
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

      {project.image && (
        <ImageFrame
          image={project.image}
          name={project.name}
          live={project.live}
          liveIsProduction={project.liveIsProduction}
          isIllustration={project.imageIsIllustration}
        />
      )}

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
            {project.private
              ? "View on GitHub (Private) →"
              : "View on GitHub →"}
          </a>
        )}

        {project.githubFrontend && (
          <a
            href={project.githubFrontend}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-surface-border px-5 py-2.5 text-foreground transition-colors duration-300 hover:border-accent"
          >
            Frontend GitHub →
          </a>
        )}

        {project.githubBackend && (
          <a
            href={project.githubBackend}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-surface-border px-5 py-2.5 text-foreground transition-colors duration-300 hover:border-accent"
          >
            Backend GitHub →
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-surface-border px-5 py-2.5 text-foreground transition-colors duration-300 hover:border-accent"
          >
            {project.liveIsProduction ? "Live Site" : "Live Demo"} →
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
    </section>
  );
}