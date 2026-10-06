import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import OpenPaletteButton from "../components/OpenPaletteButton";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Page not found | Aidan Barends",
};

// A few live projects to suggest instead of a dead end
const suggestions = projects
  .filter((project) => project.status === "live")
  .slice(0, 3);

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p
          aria-hidden="true"
          className="text-gradient font-[family-name:var(--font-heading)] text-[7rem] font-bold leading-none tracking-tighter sm:text-[10rem]"
        >
          404
        </p>

        <div className="mt-6 rounded-lg border border-surface-border bg-surface/70 px-4 py-2 font-[family-name:var(--font-mono)] text-sm backdrop-blur">
          <span className="text-foreground-muted">~/aidan $ </span>
          <span className="text-accent">cd this-page</span>
          <br />
          <span className="text-red-500 dark:text-red-400">
            bash: cd: no such page
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>

        <p className="mt-3 max-w-md text-foreground-muted">
          The link might be broken, or the page has moved. Head back
          home, or search for what you were looking for.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to home
          </Link>

          <OpenPaletteButton label="Search the site" />
        </div>

        {suggestions.length > 0 && (
          <div className="mt-14 w-full">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
              Or check out some live work
            </p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {suggestions.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full items-center gap-3 rounded-xl border border-surface-border bg-surface p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <FolderKanban
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                    />

                    <span className="text-sm font-medium transition-colors group-hover:text-accent">
                      {project.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
