import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-xl border border-surface-border bg-surface p-6">
      <h3 className="text-lg font-semibold">{project.name}</h3>

      <p className="mt-2 flex-1 text-sm text-foreground-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span key={item} className="rounded-md bg-background px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-4 text-sm font-medium">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub →</a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Live Demo →</a>
        )}
      </div>
    </div>
  );
}