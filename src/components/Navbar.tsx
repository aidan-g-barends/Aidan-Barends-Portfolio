"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

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

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("a"),
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.06,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur"
    >
      <nav className="grid grid-cols-3 items-center px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="justify-self-start font-[family-name:var(--font-heading)] text-lg font-semibold transition-opacity hover:opacity-70"
        >
          Aidan Barends
        </Link>

        <div className="hidden items-center justify-self-center gap-6 sm:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <ThemeToggle />

          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border transition-colors hover:border-accent sm:hidden"
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className={`overflow-hidden border-t border-surface-border px-6 sm:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-4 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}