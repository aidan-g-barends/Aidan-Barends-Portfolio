import type { Metadata } from "next";
import { projects } from "../../data/projects";
import type { ProjectStatus } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard";
import PageHeader from "../../components/PageHeader";
import Eyebrow from "../../components/Eyebrow";

export const metadata: Metadata = {
  title: "Projects | Aidan Barends",
  description:
    "A collection of full stack web applications and client projects built by Aidan Barends, including Task Flow Pro, Die Strandloper, and MediTicket 2.",
};

const sections: {
  status: ProjectStatus;
  title: string;
  description: string;
}[] = [
  {
    status: "live",
    title: "Live + GitHub",
    description:
      "Shipped and deployed, with the source code up on GitHub too.",
  },
  {
    status: "github-only",
    title: "GitHub Only",
    description:
      "Finished builds that aren't deployed anywhere, but the code is public.",
  },
  {
    status: "in-progress",
    title: "In Progress",
    description: "Still under active development.",
  },
];

export default function ProjectsPage() {
  const visibleSections = sections
    .map((section) => ({
      ...section,
      projects: projects.filter(
        (project) => project.status === section.status
      ),
    }))
    .filter((section) => section.projects.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Everything I've"
        highlight="built."
        description="From live client sites to things I'm still putting together."
        width="max-w-5xl"
      >
        {/* Jump links double as a quick summary of the counts */}
        <nav
          aria-label="Project sections"
          className="mt-8 flex flex-wrap gap-3"
        >
          {visibleSections.map((section) => (
            <a
              key={section.status}
              href={`#${section.status}`}
              className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-1.5 text-sm backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {section.title}
              <span className="rounded-full bg-accent/15 px-2 font-[family-name:var(--font-mono)] text-xs text-accent">
                {section.projects.length}
              </span>
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        {visibleSections.map((section, index) => (
          <div
            key={section.status}
            id={section.status}
            className="scroll-mt-24 pt-12 first:pt-4"
          >
            <div data-gsap="reveal">
              <Eyebrow
                index={String(index + 1).padStart(2, "0")}
                label={`${section.projects.length} ${
                  section.projects.length === 1 ? "project" : "projects"
                }`}
              />

              <h2 className="text-2xl font-bold">
                {section.title}
              </h2>

              <p className="mt-1 text-sm text-foreground-muted">
                {section.description}
              </p>
            </div>

            <div
              data-gsap="stagger"
              className="mt-6 grid gap-6 sm:grid-cols-2"
            >
              {section.projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
