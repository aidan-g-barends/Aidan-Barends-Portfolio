import { projects } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-3 max-w-2xl text-foreground-muted">
        A collection of things I&apos;ve built
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}