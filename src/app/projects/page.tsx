import type { Metadata } from "next";
import { projects } from "../../data/projects";
import type { Project, ProjectStatus } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard";
import PageHeader from "../../components/PageHeader";
import Eyebrow from "../../components/Eyebrow";

export const metadata: Metadata = {
  title: "Projects | Aidan Barends",
  description:
    "Client websites, independent builds, and university team projects by Aidan Barends, including JJS Business Solutions, UniExchange, and MediTicket 2.",
};

// Live work first, then what's still being built, then code-only builds
const statusOrder: Record<ProjectStatus, number> = {
  live: 0,
  "in-progress": 1,
  "github-only": 2,
};

function byStatus(a: Project, b: Project) {
  return statusOrder[a.status] - statusOrder[b.status];
}

const groups = [
  {
    id: "independent",
    title: "Independent & Client Work",
    description:
      "Websites for real clients and apps I designed and built on my own, from first idea to deployment.",
    projects: projects
      .filter((project) => !project.university)
      .sort(byStatus),
  },
  {
    id: "university",
    title: "University Projects",
    description:
      "Team projects built with classmates as part of my Software Engineering diploma at CPUT.",
    projects: projects
      .filter((project) => project.university)
      .sort(byStatus),
  },
].filter((group) => group.projects.length > 0);

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Everything I've"
        highlight="built."
        description="From live client sites to university team projects and things I'm still putting together."
        width="max-w-5xl"
      >
        {/* Jump links double as a quick summary of the counts */}
        <nav
          aria-label="Project groups"
          className="mt-8 flex flex-wrap gap-3"
        >
          {groups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-1.5 text-sm backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {group.title}
              <span className="rounded-full bg-accent/15 px-2 font-[family-name:var(--font-mono)] text-xs text-accent">
                {group.projects.length}
              </span>
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        {groups.map((group, index) => (
          <div
            key={group.id}
            id={group.id}
            className="scroll-mt-24 pt-12 first:pt-4"
          >
            <div data-gsap="reveal">
              <Eyebrow
                index={String(index + 1).padStart(2, "0")}
                label={`${group.projects.length} ${
                  group.projects.length === 1 ? "project" : "projects"
                }`}
              />

              <h2 className="text-2xl font-bold sm:text-3xl">
                {group.title}
              </h2>

              <p className="mt-1 text-sm text-foreground-muted">
                {group.description}
              </p>
            </div>

            <div
              data-gsap="stagger"
              className="mt-6 grid gap-6 sm:grid-cols-2"
            >
              {group.projects.map((project) => (
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
