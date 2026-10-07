import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import GithubIcon from "./GithubIcon";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const githubUrl = "https://github.com/aidan-g-barends";
const linkedinUrl = "https://www.linkedin.com/in/aidan-barends/";
const emailUrl = "mailto:aidanbarends95@gmail.com";

const pages = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: githubUrl, label: "GitHub", icon: <GithubIcon />, external: true },
  { href: linkedinUrl, label: "LinkedIn", icon: <LinkedinIcon />, external: true },
  { href: emailUrl, label: "Email", icon: <Mail size={18} aria-hidden="true" />, external: false },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-surface/40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-60"
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-[1.5fr_1fr_auto]">
        <div>
          <p className="font-[family-name:var(--font-heading)] text-lg font-semibold">
            Aidan Barends
          </p>

          <p className="mt-2 max-w-xs text-sm text-foreground-muted">
            Software Engineering student, freelance web developer,
            IT Field Technician, and aspiring AI Engineer based in
            the Western Cape.
          </p>

          <div className="mt-4 flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-foreground-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent">
            Pages
          </p>

          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-foreground-muted transition-colors hover:text-foreground"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:text-right">
          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="border-t border-surface-border">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs text-foreground-muted">
          &copy; {new Date().getFullYear()} Aidan Barends. Built with
          Next.js, Tailwind CSS and GSAP.
        </p>
      </div>
    </footer>
  );
}
