import type { Metadata } from "next";
import { projects } from "../../data/projects";
import type { ProjectStatus } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard";

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
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div data-gsap="hero">
        <h1 className="text-3xl font-bold">Projects</h1>

        <p className="mt-3 max-w-2xl text-foreground-muted">
          Everything I&apos;ve built, from live client sites to
          things I&apos;m still putting together.
        </p>
      </div>

      {sections.map((section) => {
        const sectionProjects = projects.filter(
          (project) => project.status === section.status
        );

        if (sectionProjects.length === 0) return null;

        return (
          <div
            key={section.status}
            className="mt-16 first:mt-10"
          >
            <div data-gsap="reveal">
              <h2 className="text-xl font-bold">
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
              {sectionProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}