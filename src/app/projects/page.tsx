import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

type Group = {
  id: string;
  title: string;
  description: string;
  matches: (project: Project) => boolean;
  inviteCard?: boolean;
};

// Each project goes in the first group it matches, so nothing is listed
// twice. The badges on each card still show the rest (Live, Uni, Client).
const groupDefinitions: Group[] = [
  {
    id: "client",
    title: "Client Work",
    description:
      "Websites built for paying clients as a freelance web developer.",
    matches: (project) => Boolean(project.clientWork),
    inviteCard: true,
  },
  {
    id: "university",
    title: "University Projects",
    description:
      "Team projects built with classmates as part of my Software Engineering diploma at CPUT.",
    matches: (project) => Boolean(project.university),
  },
  {
    id: "in-progress",
    title: "In Progress",
    description: "Things I'm still building.",
    matches: (project) => project.status === "in-progress",
  },
  {
    id: "live",
    title: "Live Work",
    description:
      "My own builds, designed and developed by me and deployed for anyone to try.",
    matches: (project) => project.status === "live",
  },
  {
    id: "independent",
    title: "Independent Work",
    description:
      "My own builds that aren't deployed, with the code up on GitHub.",
    matches: () => true,
  },
];

// Display order on the page
const displayOrder = [
  "client",
  "live",
  "independent",
  "university",
  "in-progress",
];

const assigned = new Map<string, Project[]>(
  groupDefinitions.map((group) => [group.id, []])
);

for (const project of projects) {
  const group = groupDefinitions.find((item) => item.matches(project));
  assigned.get(group!.id)!.push(project);
}

// Within a group, live work first, then in progress, then GitHub only
const statusOrder: Record<ProjectStatus, number> = {
  live: 0,
  "in-progress": 1,
  "github-only": 2,
};

const visibleGroups = displayOrder
  .map((id) => {
    const definition = groupDefinitions.find((group) => group.id === id)!;

    return {
      ...definition,
      projects: [...assigned.get(id)!].sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      ),
    };
  })
  .filter((group) => group.projects.length > 0);

// Fills the client grid and points potential clients to the contact form
function InviteCard() {
  return (
    <Link
      href="/contact?topic=freelance"
      className="group flex min-h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-border p-8 text-center transition-colors duration-300 hover:border-accent/60 hover:bg-accent/5"
    >
      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
        Taking on new clients
      </span>

      <p className="mt-3 text-lg font-semibold">
        Your website could be next.
      </p>

      <p className="mt-2 max-w-xs text-sm text-foreground-muted">
        Need a site built properly, from design to launch? Let&apos;s
        talk about your project.
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Start a project
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Everything I've"
        highlight="built."
        description="Client websites, my own builds, and university team projects."
        width="max-w-5xl"
      >
        {/* Jump links double as a quick summary of the counts */}
        <nav
          aria-label="Project groups"
          className="mt-8 flex flex-wrap gap-3"
        >
          {visibleGroups.map((group) => (
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
        {visibleGroups.map((group, index) => (
          <div
            key={group.id}
            id={group.id}
            className="scroll-mt-24 border-t border-surface-border pt-14 first:border-t-0 first:pt-4 [&:not(:first-child)]:mt-14"
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

              <p className="mt-1 text-foreground-muted">
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

              {group.inviteCard && <InviteCard />}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
