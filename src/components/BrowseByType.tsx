import Link from "next/link";
import { ArrowUpRight, Briefcase, GraduationCap, Hammer, Rocket } from "lucide-react";

// "Shop by need" style tiles: each one jumps to a section of the Projects page
// (the ids match the groups defined in src/app/projects/page.tsx).
const tiles = [
  { icon: Briefcase, title: "Kite & Code sites", text: "Websites and stores for real businesses", href: "/projects#client", tint: "bg-blush/50" },
  { icon: Rocket, title: "Live work", text: "My own builds you can try right now", href: "/projects#live", tint: "bg-accent/15" },
  { icon: Hammer, title: "In progress", text: "What I'm building at the moment", href: "/projects#in-progress", tint: "bg-accent-2/20" },
  { icon: GraduationCap, title: "University projects", text: "Team builds from my CPUT diploma", href: "/projects#university", tint: "bg-blush/50" },
];

export default function BrowseByType() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
      <h2 className="text-2xl font-bold sm:text-3xl">Browse by type</h2>

      <p className="mt-2 text-foreground-muted">
        Pick what you&apos;re curious about and jump straight in.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => {
          const Icon = tile.icon;

          return (
            <li key={tile.title}>
              <Link
                href={tile.href}
                className="group flex h-full flex-col rounded-2xl border border-surface-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${tile.tint} text-accent`}>
                  <Icon size={20} aria-hidden="true" />
                </span>

                <span className="mt-4 flex items-center justify-between gap-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {tile.title}
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-foreground-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>

                <span className="mt-1 text-sm text-foreground-muted">{tile.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
