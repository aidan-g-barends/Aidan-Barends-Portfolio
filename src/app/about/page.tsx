import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">About Me</h1>

      <div className="mt-8 flex justify-center sm:justify-start">
        <Image
          src="/profile.jpeg"
          alt="Aidan Barends"
          width={160}
          height={160}
          className="rounded-2xl border border-surface-border object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-5 text-foreground-muted">
        <p>
          I got into tech the way a lot of people my age did, through
          gaming. Messing around with computers as a kid turned into taking
          Computer Applications Technology (CAT) in school, where I did well and
          realized this was the path I wanted to follow.
        </p>

        <p>
          Today I&apos;m a Software Engineering student at CPUT (Application
          Development), and I work as an IT Field Technician at CraythorneIT,
          where I do everything from Wi-Fi assessments and router
          configuration to hardware repairs and PC builds for real clients.
          It&apos;s hands-on, problem-solving work, and it&apos;s taught me a
          lot about troubleshooting under real-world conditions — not just in
          a classroom.
        </p>

        <p>
          Outside of coursework, I&apos;m constantly upskilling myself.
          I&apos;ve completed Angela Yu&apos;s Complete Web Development
          Bootcamp, and I&apos;m currently working through Ed Donner&apos;s
          AI course. What draws me to AI specifically is the idea of
          building systems that can automate the kind of hands-on technical
          work I already do, that&apos;s the direction I want my career to
          keep moving in.
        </p>

        <p>
          My goal after graduating is to land a junior developer role, keep
          building toward becoming an AI Engineer, and eventually start my
          own company, ideally one that makes a real difference, not just
          money. I care about that a lot, which is part of why healthcare
          and fintech are the industries that excite me most.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          What I&apos;m About
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Patient",
            "Hardworking",
            "Eager to Learn",
            "Good Listener",
            "Team Player",
            "Adaptable",
            "Detail-Oriented",
          ].map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-surface-border bg-surface px-4 py-1.5 text-sm"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          Outside of Tech
        </h2>
        <p className="mt-4 text-foreground-muted">
          Rugby, soccer, and hockey keep me active and I still play piano
          when I get the chance. And yes, I&apos;m still a gamer, the same
          thing that got me into tech in the first place.
        </p>
      </div>
    </section>
  );
}