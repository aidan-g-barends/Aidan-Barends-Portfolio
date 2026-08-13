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
    live: "https://task-flow-pro.vercel.app/",
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
    slug: "practiceflow-crm",
    name: "PracticeFlow CRM",
    description:
      "A HIPAA-compliant Medical Practice CRM platform for managing patients, appointments, staff, and clinical records, built with Next.js and Supabase as part of a 6-person team.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/aidan-g-barends/practiceflow-crm",
    live: "https://practiceflow-crm-iota.vercel.app/",
    featured: true,
    inProgress: true,
    role:
      "Frontend Developer, responsible for building the appointment scheduling and calendar interface as part of a 6-person team.",
    problem:
      "Medical practices need a single, HIPAA-compliant system to manage patients, appointments, staff, and clinical notes instead of relying on disconnected tools.",
    features: [
      "Patient directory with registration and editing",
      "Appointment scheduling and calendar interface",
      "Clinical workspace with SOAP notes and medication tracking",
      "Staff and provider management directory",
      "Supabase-backed authentication and database",
    ],
    challenges:
      "Coordinating frontend and backend work across a 6-person team with clearly divided roles, while keeping the UI and database schema in sync as features were built in parallel.",
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