import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Clapperboard,
  Code2,
  Cpu,
  Eye,
  Download,
  GraduationCap,
  LifeBuoy,
  Lightbulb,
  RotateCcw,
  School,
  Ticket,
  UserCheck,
  Utensils,
  Wifi,
  Wine,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Eyebrow from "../../components/Eyebrow";
import PageHeader from "../../components/PageHeader";
import PeriodTabs from "../../components/PeriodTabs";
import { projects } from "../../data/projects";
import { lessons } from "../../data/lessons";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// Client sites come from projects.ts (clientWork: true), so a new
// client only needs to be added there.
const freelanceClients = projects.filter(
  (project) => project.clientWork
);

type Area = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

type PeriodData = {
  label: string;
  period: string;
  current: boolean;
  description: string;
  areas: Area[];
  skills: string[];
};

const freelance = {
  role: "Freelance Web Developer",
  period: "Jul 2025 – Present",
  summary:
    "I build websites for small businesses that need a proper online presence, handling the whole job myself. Click a period to see how it's grown.",
  milestones: [
    {
      label: "Growing it as a business",
      period: "Sep 2026 – Present",
      current: true,
      description:
        "This is when I got serious about it. I'm treating freelancing as a business now and actively looking for new clients who need a website designed, built, and launched properly.",
      areas: [
        {
          icon: Briefcase,
          title: "Running it as a business",
          items: [
            "Treating freelancing as a business, not a side project",
            "Actively looking for new clients",
            "Taking on new website projects for small businesses",
          ],
        },
        {
          icon: Code2,
          title: "What I deliver",
          items: [
            "Turning a business's services and information into a clear, professional website",
            "Responsive UI that works across mobile, tablet, and desktop",
            "Reusable, maintainable components so the site is easy to update",
            "Deployment and launch of the live production site",
          ],
        },
      ],
      skills: [
        "Web Design",
        "Responsive UI",
        "Reusable Components",
        "Deployment",
        "Client Communication",
      ],
    },
    {
      label: "Started freelancing",
      period: "Jul 2025",
      current: false,
      description:
        "I started taking on web design work alongside my studies and my IT job.",
      areas: [
        {
          icon: Code2,
          title: "Getting started",
          items: [
            "Took on web design work alongside studying and working in IT",
            "Built websites for small businesses that needed a proper online presence",
            "Handled each job myself, from understanding what the business needed to deploying the live site",
          ],
        },
      ],
      skills: ["Web Design", "Responsive Layouts", "Client Work"],
    },
  ] satisfies PeriodData[],
};

export const metadata: Metadata = {
  title: "Experience & Education | Aidan Barends",
  description:
    "Aidan Barends' experience as a freelance web developer and an IT Field Technician at CraythorneIT, along with education at CPUT and relevant certifications.",
};

const highlights = [
  {
    icon: Code2,
    title: "Ships Real Products",
    description:
      "Live sites and full-stack apps built for actual clients and teams, not just tutorial follow-alongs.",
  },
  {
    icon: Wrench,
    title: "Client-Facing & Reliable",
    description:
      "I show up on-site, fix the problem, and keep client networks running with no one holding my hand.",
  },
  {
    icon: Zap,
    title: "Learns Fast, Alone",
    description:
      "Picked up Tailwind, GSAP, Supabase, and now AI agents largely by teaching myself outside of class.",
  },
];

const craythorne = {
  role: "IT Field Technician",
  company: "CraythorneIT",
  summary:
    "I started out shadowing experienced technicians, and CraythorneIT brought me back for a second stint with more responsibility. Click a period to see what I did in each.",
  stints: [
    {
      label: "Current: tickets & remote support",
      period: "Jul 2026 – Present",
      current: true,
      description:
        "CraythorneIT brought me back, and this time I stepped up: working client tickets through to close-out, doing remote support, and running field jobs on my own.",
      areas: [
        {
          icon: Wifi,
          title: "Networking",
          items: [
            "Run Wi-Fi assessments, installs, and configurations solo for residential and business clients, with no supervision needed once on-site.",
            "Configure and maintain routers across multiple client networks, keeping them online and fixing what breaks.",
            "Diagnose and resolve live network outages under time pressure, using Fing to pinpoint the failing device fast.",
          ],
        },
        {
          icon: Cpu,
          title: "Hardware",
          items: [
            "Handle full PC builds and hardware repairs end-to-end, from diagnosis to fix.",
            "Carry out system upgrades for clients.",
          ],
        },
        {
          icon: Ticket,
          title: "Tickets & remote support",
          items: [
            "Work through the ticketing system: pick up client-logged tickets, triage the issue, and resolve or escalate it through to close-out.",
            "Provide remote support: troubleshoot Outlook issues and set up Outlook email and user accounts.",
            "Handle first-line troubleshooting remotely, escalating anything that needs admin-portal access.",
          ],
        },
      ],
      skills: [
        "Networking",
        "Router Config",
        "Fing",
        "Hardware",
        "Ticketing Systems",
        "Remote Support",
        "Troubleshooting",
        "Client Communication",
      ],
    },
    {
      label: "First stint: learning the ropes",
      period: "Aug 2025 – Jan 2026",
      current: false,
      description:
        "My first IT role. I mostly shadowed experienced technicians to learn how the work is done on real client jobs, and by the end I was handling a few jobs on my own.",
      areas: [
        {
          icon: Eye,
          title: "Shadowing",
          items: [
            "Shadowed experienced technicians on real residential and business client jobs.",
            "Learnt Wi-Fi installs and router configuration on the job.",
            "Learnt hardware repairs and how to fix network issues on-site.",
          ],
        },
        {
          icon: UserCheck,
          title: "First solo jobs",
          items: [
            "By the end of the stint, handled a few jobs on my own.",
          ],
        },
      ],
      skills: [
        "Networking",
        "Router Config",
        "Hardware",
        "Troubleshooting",
      ],
    },
  ] satisfies PeriodData[],
};

// One period's full content inside a role card's tabs
function PeriodContent({ data }: { data: PeriodData }) {
  const columns =
    data.areas.length >= 3
      ? "md:grid-cols-3"
      : data.areas.length === 2
        ? "md:grid-cols-2"
        : "";

  return (
    <>
      <p className="text-foreground-muted">{data.description}</p>

      <div className={`mt-6 grid gap-4 ${columns}`}>
        {data.areas.map((area) => {
          const Icon = area.icon;

          return (
            <div
              key={area.title}
              className="rounded-xl border border-surface-border bg-background p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Icon
                    className="h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h4 className="font-semibold">{area.title}</h4>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {data.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-background px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}

const otherRoles = [
  {
    icon: Utensils,
    role: "Waiter",
    place: "Cape Town Fish Market",
  },
  {
    icon: Wine,
    role: "Barman",
    place: "Die Strandloper",
  },
  {
    icon: School,
    role: "Classroom & Music Assistant",
    place: "Longacres Private School",
  },
  {
    icon: Clapperboard,
    role: "Background Actor",
    place: "39 Steps Agency",
  },
  {
    icon: LifeBuoy,
    role: "Lifeguard",
    place: "NSRI",
  },
];

const education = [
  {
    title: "Diploma in ICT: Application Development",
    place: "Cape Peninsula University of Technology (CPUT)",
    period: "2024 – Present",
    note: "Expected completion 2027",
    current: true,
  },
  {
    title: "National Senior Certificate (NSC)",
    place: "Hopefield High School",
    period: "2018 – 2022",
    current: false,
  },
];

const certifications = [
  {
    title: "The Complete Web Development Bootcamp",
    issuer: "Angela Yu, Udemy",
    done: true,
  },
  {
    title: "4IR Digital Skills Training Programme",
    done: true,
  },
  {
    title: "AI course",
    issuer: "Ed Donner",
    done: false,
  },
];

function StatusBadge({ done }: { done: boolean }) {
  return done ? (
    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
      Completed
    </span>
  ) : (
    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
      In Progress
    </span>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience & Education"
        title="Where I've"
        highlight="put in the work."
        description="I spend my days fixing real networks and hardware for paying clients, and my nights shipping full-stack apps and studying Software Engineering. Here's the proof."
      >
        <Link
          href="/resume.pdf"
          target="_blank"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent"
        >
          <Download size={16} aria-hidden="true" />
          Download Resume
        </Link>
      </PageHeader>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-3xl px-6">
        <div
          data-gsap="stagger"
          className="grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                style={{
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <Icon
                    className="h-5 w-5 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-foreground-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div data-gsap="reveal">
          <Eyebrow index="01" label="Work" />

          <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <Briefcase
              className="h-6 w-6 text-accent"
              aria-hidden="true"
            />
            Experience
          </h2>
        </div>

        {/* FREELANCE */}
        <article
          data-gsap="scale"
          className="relative mt-10 overflow-hidden rounded-2xl border border-accent/30 bg-surface"
          style={{
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl dark:opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--accent-2) 0%, transparent 70%)",
            }}
          />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {freelance.role}
                </h3>

                <p className="mt-1 font-medium text-accent">
                  Self-employed · {freelance.period}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Taking on new clients
              </span>
            </div>

            <p className="mt-4 text-foreground-muted">
              {freelance.summary}
            </p>

            <PeriodTabs
              periods={freelance.milestones.map((milestone) => ({
                label: milestone.label,
                period: milestone.period,
                current: milestone.current,
                content: <PeriodContent data={milestone} />,
              }))}
            />

            {/* Client work is shared across both periods, so it sits outside the tabs */}
            <div className="mt-8 border-t border-surface-border pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
                  Client work
                </h4>

                <Link
                  href="/contact?topic=freelance"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Need a website? Let&apos;s talk
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {freelanceClients.map((client) => (
                  <li key={client.slug}>
                    <Link
                      href={`/projects/${client.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-background p-4 transition-colors duration-300 hover:border-accent/50"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold transition-colors group-hover:text-accent">
                          {client.name}
                        </p>

                        {client.live && (
                          <p className="truncate font-[family-name:var(--font-mono)] text-xs text-foreground-muted">
                            {getDomain(client.live)}
                          </p>
                        )}
                      </div>

                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="shrink-0 text-foreground-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* CRAYTHORNE IT */}
        <article
          data-gsap="scale"
          className="relative mt-8 overflow-hidden rounded-2xl border border-surface-border bg-surface"
          style={{
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl dark:opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {craythorne.role}
                </h3>

                <p className="mt-1 font-medium text-accent">
                  {craythorne.company}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <RotateCcw size={12} aria-hidden="true" />
                Brought back for a second stint
              </span>
            </div>

            <p className="mt-4 text-foreground-muted">
              {craythorne.summary}
            </p>

            <PeriodTabs
              periods={craythorne.stints.map((stint) => ({
                label: stint.label,
                period: stint.period,
                current: stint.current,
                content: <PeriodContent data={stint} />,
              }))}
            />
          </div>
        </article>

        {/* OTHER EXPERIENCE */}
        <div
          data-gsap="reveal"
          className="mt-14"
        >
          <h3 className="text-lg font-semibold">
            Before tech
          </h3>

          <p className="mt-1 text-sm text-foreground-muted">
            2022 – 2025. Different worlds, but all of them taught me
            the same things: show up, deal with people properly, and
            stay reliable when things get busy or stressful.
          </p>
        </div>

        <ul
          data-gsap="stagger"
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {otherRoles.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.role}
                className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background">
                  <Icon
                    className="h-4 w-4 text-foreground-muted"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {item.role}
                  </p>

                  <p className="truncate text-xs text-foreground-muted">
                    {item.place}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* LESSONS */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div
          data-gsap="reveal"
          className="mx-auto max-w-3xl"
        >
          <Eyebrow label="Lessons from the field" />

          <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <Lightbulb
              className="h-6 w-6 text-accent"
              aria-hidden="true"
            />
            What the industry has taught me
          </h2>

          <p className="mt-2 text-foreground-muted">
            Real clients teach you things a classroom can&apos;t.
            Between field work, remote support, and freelancing,
            these are the lessons that stuck.
          </p>
        </div>

        <ul
          data-gsap="stagger"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon;

            return (
              <li
                key={lesson.title}
                className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                style={{
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-4 font-[family-name:var(--font-mono)] text-3xl font-bold text-foreground/5 transition-colors duration-300 group-hover:text-accent/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                  <Icon
                    className="h-5 w-5 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 font-semibold">
                  {lesson.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {lesson.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* EDUCATION */}
      <section className="border-y border-surface-border bg-surface/50">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          <div data-gsap="reveal">
            <Eyebrow index="02" label="Study" />

            <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <GraduationCap
                className="h-6 w-6 text-accent"
                aria-hidden="true"
              />
              Education
            </h2>
          </div>

          <div className="relative mt-10 border-l-2 border-surface-border pl-8">
            <div
              data-gsap="timeline-line"
              className="pointer-events-none absolute -left-0.5 top-0 h-full w-0.5 origin-top bg-accent"
            />

            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={item.title}
                  data-gsap="timeline"
                  className="group relative"
                >
                  <span
                    className={`absolute -left-[41px] top-6 h-4 w-4 rounded-full border-2 border-background transition-transform duration-300 group-hover:scale-125 ${
                      item.current
                        ? "bg-accent"
                        : "bg-surface-border group-hover:bg-accent"
                    }`}
                  />

                  <div className="rounded-xl border border-surface-border bg-background p-5 transition-colors duration-300 group-hover:border-accent/40">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold">
                        {item.title}
                      </h3>

                      <span className="font-[family-name:var(--font-mono)] text-sm text-foreground-muted">
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-foreground-muted">
                      {item.place}
                    </p>

                    {item.note && (
                      <p className="mt-3 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div data-gsap="reveal">
          <Eyebrow index="03" label="Upskilling" />

          <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <Award
              className="h-6 w-6 text-accent"
              aria-hidden="true"
            />
            Certifications
          </h2>
        </div>

        <ul
          data-gsap="stagger"
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {certifications.map((cert) => (
            <li
              key={cert.title}
              className="flex flex-col rounded-xl border border-surface-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              style={{
                boxShadow: "var(--card-shadow)",
              }}
            >
              <Award
                className="h-5 w-5 text-accent"
                aria-hidden="true"
              />

              <p className="mt-3 flex-1 text-sm font-semibold">
                {cert.title}
              </p>

              {cert.issuer && (
                <p className="mt-1 text-xs text-foreground-muted">
                  {cert.issuer}
                </p>
              )}

              <div className="mt-4">
                <StatusBadge done={cert.done} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
