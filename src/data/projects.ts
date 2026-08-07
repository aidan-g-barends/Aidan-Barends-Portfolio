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
  {
    slug: "medical-practice-crm",
    name: "Medical Practice CRM",
    description:
      "A collaborative full-stack CRM built with a team of five students, managing patients, appointments, doctors, and medical records for a medical practice.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/AidanBarends/Medical-Practise-Crm",
    featured: false,
    inProgress: true,
    role:
      "Collaborated with a team of five students, contributing to core CRM features and working through git-based version control and code review as part of the team's workflow.",
    problem:
      "Medical practices often rely on scattered spreadsheets and paper records to manage patients, appointments, and staff, making it hard to keep information accurate and accessible.",
    features: [
      "Patient records management",
      "Appointment scheduling",
      "Doctor and staff administration",
      "Supabase-backed data layer",
    ],
  },
  {
    slug: "task-manager-app",
    name: "Task Manager App",
    description:
      "A task management application for organizing and tracking to-dos and projects, built with a Spring Boot backend and Angular frontend.",
    tech: ["Angular", "Spring Boot", "Java", "TypeScript"],
    github: "https://github.com/aidan-g-barends/Task-Manager-App",
    featured: false,
    inProgress: true,
    role:
      "Building both the Angular frontend and the Spring Boot REST API backend independently.",
    problem:
      "Keeping track of tasks and deadlines across multiple projects gets messy without a dedicated, structured tool.",
    features: [
      "Create, update, and delete tasks",
      "REST API backend with Spring Boot",
      "Angular single-page frontend",
    ],
  },

  {
  slug: "golden-way",
  name: "GoldenWay",
  description:
    "A ticketing platform for Golden Arrow Bus, moving ticket purchasing from in-person to online. Built collaboratively with a React/Vite frontend and Spring Boot backend.",
  tech: ["React", "Vite", "Spring Boot", "Java", "MySQL"],
  github: "https://github.com/AidanBarends/GoldenWay",
  featured: false,
  inProgress: true,
  role:
    "Working full stack as part of a team, with a focus on the Spring Boot backend and database layer.",
  problem:
    "Golden Arrow Bus commuters currently have to buy tickets in person, with no way to purchase or manage tickets online.",
  features: [
    "Online ticket purchasing to replace in-person sales",
    "React/Vite frontend",
    "Spring Boot backend and database layer",
  ],
},
];