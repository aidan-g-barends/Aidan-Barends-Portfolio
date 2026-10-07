"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import { isActivePath, navLinks } from "../lib/nav";

// Top bar. On phones the page links live in the bottom tab bar
// (MobileTabBar), so this only shows the brand, search, and theme toggle.
export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.fromTo(
      navRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur-xl"
    >
      <nav className="flex items-center justify-between gap-4 px-4 py-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-10 sm:py-4">
        <Link
          href="/"
          className="group inline-flex min-w-0 items-center gap-2 justify-self-start whitespace-nowrap font-[family-name:var(--font-heading)] text-base font-semibold sm:text-lg"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-2 font-[family-name:var(--font-mono)] text-xs font-bold text-background transition-transform duration-300 group-hover:rotate-6"
          >
            AB
          </span>
          <span className="truncate transition-colors group-hover:text-accent">
            Aidan Barends
          </span>
        </Link>

        <div className="hidden items-center justify-self-center gap-6 sm:flex">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 ${
                  isActive
                    ? "font-medium text-foreground after:scale-x-100"
                    : "text-foreground-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 justify-self-end sm:gap-3">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))
            }
            aria-label="Search the site (Ctrl+K)"
            className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-lg border border-surface-border px-2.5 text-foreground-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <Search size={16} aria-hidden="true" />

            <kbd className="hidden font-[family-name:var(--font-mono)] text-[11px] lg:inline">
              Ctrl K
            </kbd>
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
