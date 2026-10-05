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
  Download,
  GraduationCap,
  LifeBuoy,
  Lightbulb,
  RotateCcw,
  School,
  Ticket,
  Utensils,
  Wifi,
  Wine,
  Wrench,
  Zap,
} from "lucide-react";
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

const freelance = {
  role: "Freelance Web Developer",
  period: "Jul 2025 – Present",
  summary:
    "I build websites for small businesses that need a proper online presence. I handle the whole job myself, from turning what the business does into clear pages through to deploying the live site. I started taking on web design work in July 2025, and since September 2026 I've been growing it seriously as a business.",
  milestones: [
    {
      label: "Started freelancing",
      period: "Jul 2025",
      current: false,
      description:
        "I started taking on web design work alongside my studies and my IT job, building websites for small businesses that needed a proper online presence.",
    },
    {
      label: "Growing it as a business",
      period: "Sep 2026 – Present",
      current: true,
      description:
        "This is when I got serious about it. I'm treating freelancing as a business now and actively looking for new clients who need a website designed, built, and launched properly.",
    },
  ],
  services: [
    "Turning a business's services and information into a clear, professional website",
    "Responsive UI that works across mobile, tablet, and desktop",
    "Reusable, maintainable components so the site is easy to update",
    "Deployment and launch of the live production site",
  ],
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
    "Out in the field solo, keeping residential and business clients connected. CraythorneIT brought me back for a second stint, covering networks, hardware, and support tickets through to close-out, both on-site and remotely.",
  stints: [
    {
      label: "Current",
      period: "Jul 2026 – Present",
      current: true,
      description:
        "CraythorneIT brought me back for a second stint. I'm out in the field solo again doing Wi-Fi, router, and hardware work for residential and business clients, working through the ticketing system daily, and handling remote support like Outlook issues and email and account setup.",
    },
    {
      label: "First stint",
      period: "Aug 2025 – Jan 2026",
      current: false,
      description:
        "My first IT role. Field work for residential and business clients: Wi-Fi assessments and installs, router configuration, PC builds and hardware repairs, and resolving network outages on-site. It's where I learnt to troubleshoot under real-world pressure instead of in a classroom.",
    },
  ],
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
      title: "Support, on-site & remote",
      items: [
        "Work through a ticketing system daily: pick up client-logged tickets, triage the issue, and resolve or escalate it through to close-out.",
        "Provide remote support for clients: troubleshoot Outlook issues and set up Outlook email and user accounts.",
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
    "Microsoft Outlook",
    "Troubleshooting",
    "Client Communication",
  ],
};

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
      <section className="mx-auto max-w-3xl px-6 py-20">
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

            <PeriodTabs periods={freelance.milestones} />

            <p className="mt-6 text-foreground-muted">
              {freelance.summary}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
                  What I handle
                </h4>

                <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
                  {freelance.services.map((service) => (
                    <li
                      key={service}
                      className="flex gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
                  Client work
                </h4>

                <ul className="mt-4 space-y-3">
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

                <Link
                  href="/contact?topic=freelance"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Need a website? Let&apos;s talk
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
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

            {/* Stints */}
            <PeriodTabs periods={craythorne.stints} />

            <p className="mt-6 text-foreground-muted">
              {craythorne.summary}
            </p>

            {/* Areas of responsibility */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {craythorne.areas.map((area) => {
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

                      <h4 className="font-semibold">
                        {area.title}
                      </h4>
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
              {craythorne.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-background px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-foreground-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
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
        <div className="mx-auto max-w-3xl px-6 py-20">
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
      <section className="mx-auto max-w-3xl px-6 py-20">
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
