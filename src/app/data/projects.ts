export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "task-flow-pro",
    name: "Task Flow Pro",
    description:
      "A full stack task management app built with Laravel as part of a university group project, with a structured architecture including models, services, policies, and notifications.",
    tech: ["Laravel", "PHP", "MySQL"],
    github: "https://github.com/aidan-g-barends/Task-Flow-Pro",
    featured: true,
  },
  {
    slug: "die-strandloper",
    name: "Die Strandloper",
    description:
      "A multi-page website built for a real local restaurant, with a live contact form that emails inquiries directly to the owner — no custom backend required.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/aidan-g-barends/DieStrandloper",
    featured: true,
  },
];