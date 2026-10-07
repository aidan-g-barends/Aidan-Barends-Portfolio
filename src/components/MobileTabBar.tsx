"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navLinks } from "../lib/nav";

// App-style bottom navigation for phones, within thumb reach.
// Hidden from the `sm` breakpoint up, where the top navbar shows links.
export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-border bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = isActivePath(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-foreground-muted active:text-foreground"
                }`}
              >
                {/* Glowing indicator above the active tab */}
                <span
                  aria-hidden="true"
                  className={`absolute top-0 h-0.5 w-8 rounded-full bg-linear-to-r from-accent to-accent-2 transition-opacity duration-300 ${
                    isActive ? "opacity-100 shadow-[0_0_12px_var(--accent)]" : "opacity-0"
                  }`}
                />

                <span
                  className={`flex h-8 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive ? "bg-accent/15" : "group-active:scale-90"
                  }`}
                >
                  <Icon
                    size={20}
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </span>

                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
