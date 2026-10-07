import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { projects } from "../data/projects";
import FeaturedProject from "../components/FeaturedProject";
import HeroRobot from "../components/HeroRobot";
import Eyebrow from "../components/Eyebrow";
import TypedRoles from "../components/TypedRoles";
import Services from "../components/Services";
import AskAidan from "../components/AskAidan";
import { SITE_URL } from "../lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aidan Barends",
  url: SITE_URL,
  image: `${SITE_URL}/projects/profile.jpeg`,
  jobTitle: "Freelance Web Developer",
  description:
    "Software Engineering student at CPUT, freelance web developer, and IT Field Technician working toward becoming an AI Engineer.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Langebaan",
    addressRegion: "Western Cape",
    addressCountry: "ZA",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Cape Peninsula University of Technology",
  },
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Networking",
  ],
  sameAs: [
    "https://github.com/aidan-g-barends",
    "https://www.linkedin.com/in/aidan-barends/",
  ],
};

const skillGroups = [
  {
    label: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Java",
      "Python",
      "PHP",
      "SQL",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Laravel",
      "Tailwind CSS",
    ],
  },
  {
    label: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    label: "Networking & Hardware",
    items: [
      "Router Config",
      "Wi-Fi Setup",
      "PC Builds",
      "Troubleshooting",
    ],
  },
];

export default function Home() {
  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  const liveProjectCount = projects.filter(
    (project) => project.status === "live"
  ).length;

  const technologyCount = new Set(
    projects.flatMap((project) => project.tech)
  ).size;

  const technologies = Array.from(
    new Set([
      ...projects.flatMap((project) => project.tech),
      ...skillGroups
        .filter((group) => group.label !== "Networking & Hardware")
        .flatMap((group) => group.items),
    ])
  );

  const stats = [
    { value: `${projects.length}+`, label: "Projects Built" },
    { value: `${liveProjectCount}`, label: "Live in Production" },
    { value: `${technologyCount}+`, label: "Technologies Used" },
  ];

  return (
    <>
      {/* Structured data so search engines know who this site is about */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-0"
        />

        {/* Aurora: drifting blobs (CSS) inside a wrapper that follows the cursor (GSAP) */}
        <div
          data-gsap="parallax"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center px-5 pb-16 pt-12 sm:px-6 sm:py-40 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div data-gsap="hero">
            <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-3 py-1 text-xs font-medium text-foreground-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to junior roles &amp; freelance projects
            </span>
          </div>

          <div
            data-gsap="hero"
            className="mt-6"
          >
            <TypedRoles
              roles={[
                "Freelance Web Developer",
                "Software Engineering Student",
                "IT Field Technician",
                "Aspiring AI Engineer",
              ]}
            />
          </div>

          <div data-gsap="hero">
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Hey, I&apos;m{" "}
              <span className="text-gradient">Aidan Barends</span>.
            </h1>
          </div>

          <div data-gsap="hero">
            <p className="mt-6 max-w-xl text-lg text-foreground-muted">
              A Software Engineering student at CPUT and freelance web
              developer who ships full stack apps for real clients,
              fixes real networks by day, and is working toward
              becoming an AI Engineer.
            </p>
          </div>

          <div data-gsap="hero">
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
              >
                View My Work
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </Link>
            </div>
          </div>

          <div
            data-gsap="stagger"
            className="mt-16 grid w-full grid-cols-3 gap-4 sm:max-w-lg"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-surface-border bg-surface/80 px-3 py-4 text-center backdrop-blur transition-colors duration-300 hover:border-accent/50"
                style={{
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-accent sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-foreground-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </div>

          <HeroRobot />
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section
        aria-label="Technologies I've worked with"
        className="border-y border-surface-border bg-surface/40 py-5"
      >
        <div className="marquee overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-10 whitespace-nowrap font-[family-name:var(--font-mono)] text-sm text-foreground-muted"
                  >
                    {tech}
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-accent"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* BEST PROJECTS */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div data-gsap="reveal">
          <Eyebrow index="01" label="Featured work" />

          <h2 className="text-2xl font-bold sm:text-3xl">
            Best Projects
          </h2>

          <p className="mt-2 text-foreground-muted">
            A quick teaser of what I&apos;ve built so far, live
            products, real clients, and code you can go read.
          </p>
        </div>

        <div className="mt-12 space-y-20 sm:mt-16 sm:space-y-28">
          {featuredProjects.map((project, index) => (
            <div key={project.slug} data-gsap="reveal">
              <FeaturedProject
                project={project}
                index={index}
                total={featuredProjects.length}
              />
            </div>
          ))}
        </div>

        <div
          data-gsap="reveal"
          className="mt-8 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform duration-200 hover:translate-x-1 hover:underline"
          >
            See every project →
          </Link>
        </div>
      </section>

      <Services />

      <AskAidan />

      {/* SKILLS */}
      <section className="border-y border-surface-border bg-surface/50">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
          <div data-gsap="reveal">
            <Eyebrow index="03" label="Toolkit" />

            <h2 className="text-2xl font-bold sm:text-3xl">Skills</h2>

            <p className="mt-2 text-foreground-muted">
              Technologies and tools I work with.
            </p>
          </div>

          <div
            data-gsap="stagger"
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="group rounded-xl border border-surface-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />

                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                    {group.label}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs transition-colors duration-300 group-hover:bg-accent/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div
          data-gsap="scale"
          className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface px-6 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden="true"
            className="hero-grid pointer-events-none absolute inset-0"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl dark:opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <Eyebrow index="04" label="What's next" />
          </div>

          <h2 className="relative text-2xl font-bold sm:text-3xl">
            Interested in working together?
          </h2>

          <p className="relative mx-auto mt-4 max-w-md text-foreground-muted">
            I&apos;m open to junior developer roles, and I&apos;m
            taking on new freelance clients who need a website built
            properly.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background shadow-[0_0_32px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-6px_var(--accent)]"
            >
              Get In Touch
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact?topic=freelance"
              className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              Start a Freelance Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}