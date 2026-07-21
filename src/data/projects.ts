export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  inProgress?: boolean;
  role?: string;
  problem?: string;
  features?: string[];
  challenges?: string;
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
    role:
      "Collaborated as part of a university group, contributing to backend logic and data handling.",
    problem:
      "University groups and small teams often lack a simple, structured way to assign and track tasks through to completion.",
    features: [
      "Structured Laravel architecture with dedicated models, services, and policies",
      "Notification system to keep team members updated on task changes",
      "Multi-developer Git workflow across the team",
    ],
    challenges:
      "Coordinating consistent code structure and avoiding merge conflicts while multiple people worked on the same Laravel app at once.",
  },
  {
    slug: "die-strandloper",
    name: "Die Strandloper",
    description:
      "A multi-page website built for a real local restaurant, with a live contact form that emails inquiries directly to the owner — no custom backend required.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/aidan-g-barends/DieStrandloper",
    featured: true,
    role: "Designed and built the entire site independently for a real local restaurant.",
    problem:
      "The restaurant needed an online presence where customers could view the menu, see the space, and get in touch directly.",
    features: [
      "Home, About, Menu, Gallery, and Contact pages",
      "Live contact form integrated with Web3Forms, delivering messages straight to email",
      "Fully responsive layout built with Tailwind CSS",
    ],
    challenges:
      "Built while still learning Tailwind and JavaScript, so a lot of the layout and form-handling logic involved real trial and error.",
  },
  {
    slug: "mediticket-2",
    name: "MediTicket 2",
    description:
      "A Spring Boot clinic management backend built with Domain-Driven Design and the Builder pattern. Models patients, doctors, and staff through a shared User hierarchy, handling appointments, tickets, payments, and notifications. Built collaboratively by a 7-member team.",
    tech: ["Spring Boot", "Java", "JPA/Hibernate", "MySQL"],
    github: "https://github.com/AidanBarends/MediTicket2",
    featured: false,
    inProgress: true,
    role: "Contributing as part of a 7-member team, working within a Domain-Driven Design architecture.",
    problem:
      "Clinics need a structured way to manage patients, doctors, staff, appointments, and payments in one connected system.",
    features: [
      "Shared User hierarchy modeling patients, doctors, and staff",
      "Appointment, ticket, and payment handling",
      "Notification system for updates",
      "Built with Domain-Driven Design and the Builder pattern for structured, maintainable code",
    ],
    challenges:
  "Coordinating architecture decisions and consistent patterns across a 7-person team.",
  },
];