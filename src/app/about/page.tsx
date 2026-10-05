import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Code2,
  GraduationCap,
  HeartPulse,
  MapPin,
  Sparkles,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { lessons } from "../../data/lessons";

export const metadata: Metadata = {
  title: "About | Aidan Barends",
  description:
    "Learn more about Aidan Barends, a Software Engineering student at CPUT with a background in IT support, networking, and hardware, working toward becoming an AI Engineer.",
};

const traits = [
  "Eager to Learn",
  "Patient",
  "Hardworking",
  "Good Listener",
  "Team Player",
  "Adaptable",
  "Detail-Oriented",
];

const currentlyExploring = [
  "AI Agents",
  "LLMs",
  "Prompt Engineering",
  "Automation",
  "RAG Systems",
];

const quickFacts = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Langebaan, Western Cape",
  },
  {
    icon: GraduationCap,
    label: "Studying",
    value: "CPUT, finishing 2027",
  },
  {
    icon: Briefcase,
    label: "Working",
    value: "IT Field Technician, CraythorneIT",
  },
  {
    icon: Code2,
    label: "Freelancing",
    value: "Websites for small businesses",
  },
  {
    icon: Sparkles,
    label: "Heading toward",
    value: "AI Engineering",
  },
  {
    icon: HeartPulse,
    label: "Industries I care about",
    value: "Healthcare & fintech",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="From gaming to"
        highlight="shipping software."
        width="max-w-5xl"
      >
        <div className="mt-8 flex items-center gap-4">
          <div className="rounded-full bg-linear-to-br from-accent to-accent-2 p-0.5">
            <Image
              src="/projects/profile.jpeg"
              alt="Aidan Barends"
              width={80}
              height={80}
              className="rounded-full border-2 border-background object-cover"
              preload
            />
          </div>

          <div>
            <p className="font-semibold">Aidan Barends</p>

            <p className="text-sm text-foreground-muted">
              Software Engineering student · Freelance web
              developer · IT Field Technician
            </p>
          </div>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* STORY */}
          <div
            data-gsap="stagger"
            className="space-y-5 text-lg leading-relaxed text-foreground-muted"
          >
            <p>
              I got into tech the way a lot of people my age did,
              through gaming. Messing around with computers as a kid
              turned into taking Computer Applications Technology
              (CAT) in school, where I did well and realized this
              was the path I wanted to follow.
            </p>

            <p>
              Today I&apos;m a Software Engineering student at CPUT
              (Application Development), and I work as an IT Field
              Technician at CraythorneIT, where I do everything from
              Wi-Fi assessments and router configuration to hardware
              repairs and PC builds for real clients, plus remote
              support like sorting out Outlook issues and setting up
              email accounts. It&apos;s hands-on, problem-solving
              work, and it&apos;s taught me a lot about
              troubleshooting under real-world conditions, not just
              in a classroom.
            </p>

            <p>
              On top of that, I freelance as a web developer,
              building websites for small businesses like{" "}
              <Link
                href="/projects/jjs-business-solutions"
                className="font-medium text-accent hover:underline"
              >
                JJS Business Solutions
              </Link>
              . I handle the whole thing myself, from figuring out
              what the business needs to deploying the live site,
              and I&apos;m always open to taking on new clients.
            </p>

            <p>
              Working with real clients has taught me things a
              classroom can&apos;t: how to actually communicate with
              people, how much patience matters when someone is
              stressed about their tech, and how to handle very
              different kinds of clients, from homes to businesses,
              and from people who are confident with tech to people
              who aren&apos;t.
            </p>

            <p>
              Outside of coursework, I&apos;m constantly upskilling
              myself. I&apos;ve completed Angela Yu&apos;s Complete
              Web Development Bootcamp, and I&apos;m currently
              working through Ed Donner&apos;s AI course. Honestly,
              AI is what gets me most excited about tech right now,
              especially{" "}
              <span className="font-medium text-accent">
                AI agents
              </span>{" "}
              and what it takes to build systems that can reason
              through and automate real work. Most of what I read,
              watch, and follow these days is about it, and I want
              to build a career around it. I&apos;m eager to learn
              from people who&apos;ve already spent years in this
              industry, so if that&apos;s you, I&apos;d genuinely
              love to pick your brain.
            </p>

            <p>
              My goal after graduating is to land a junior developer
              role, keep building toward becoming an AI Engineer,
              and eventually start my own company, ideally one that
              makes a real difference, not just money. I care about
              that a lot, which is part of why healthcare and
              fintech are the industries that excite me most.
            </p>
          </div>

          {/* QUICK FACTS */}
          <aside
            data-gsap="reveal"
            className="h-fit rounded-2xl border border-surface-border bg-surface p-6 lg:sticky lg:top-24"
            style={{
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
              Quick facts
            </h2>

            <dl className="mt-5 space-y-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.label}
                    className="flex gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Icon
                        className="h-4 w-4 text-accent"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <dt className="text-xs text-foreground-muted">
                        {fact.label}
                      </dt>

                      <dd className="text-sm font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>

        {/* LESSONS */}
        <div className="mt-16">
          <div
            data-gsap="reveal"
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
                Lessons from the field
              </p>

              <h2 className="text-2xl font-bold">
                What real clients have taught me
              </h2>
            </div>

            <Link
              href="/experience"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              See all of them
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ul
            data-gsap="stagger"
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            {lessons.slice(0, 3).map((lesson) => {
              const Icon = lesson.icon;

              return (
                <li
                  key={lesson.title}
                  className="rounded-2xl border border-surface-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  style={{
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
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
        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div
            data-gsap="scale"
            style={{
              boxShadow: "var(--card-shadow)",
            }}
            className="rounded-2xl border border-surface-border bg-surface p-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              What I&apos;m About
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-surface-border bg-background px-3 py-1 text-sm transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div
            data-gsap="scale"
            style={{
              boxShadow: "var(--card-shadow)",
            }}
            className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl dark:opacity-25"
              style={{
                background:
                  "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              }}
            />

            <h2 className="relative text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Currently Exploring
            </h2>

            <div className="relative mt-4 flex flex-wrap gap-2">
              {currentlyExploring.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent transition-colors duration-300 hover:border-accent/60"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div
            data-gsap="scale"
            style={{
              boxShadow: "var(--card-shadow)",
            }}
            className="rounded-2xl border border-surface-border bg-surface p-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Outside of Tech
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Rugby, soccer, and hockey keep me active and I still
              play piano when I get the chance. And yes, I&apos;m
              still a gamer, the same thing that got me into tech in
              the first place.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
