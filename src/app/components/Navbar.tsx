"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";


const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/contact", label: "Contact" }
];

export default function Navbar() {
    const pathname = usePathname();

    return (
         <header className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur">
      <header className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur">
  <nav className="grid grid-cols-3 items-center px-6 py-4 sm:px-10">
    <Link
      href="/"
      className="justify-self-start font-[family-name:var(--font-heading)] text-lg font-semibold"
    >
      Aidan Barends
    </Link>

    <div className="hidden items-center gap-6 justify-self-center sm:flex">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition ${
              isActive
                ? "text-foreground font-medium"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>

    <div className="justify-self-end">
      <ThemeToggle />
    </div>
  </nav>
</header>
    </header>
  );
}