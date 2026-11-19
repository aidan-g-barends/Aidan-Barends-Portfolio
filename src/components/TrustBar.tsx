import { MapPin, Rocket, Smartphone, Users } from "lucide-react";

// Four short trust points under the hero, like the badges under a shop banner.
const points = [
  { icon: Rocket, title: "Live in production", text: "Real sites you can open today" },
  { icon: Users, title: "Real client work", text: "Built for actual businesses" },
  { icon: Smartphone, title: "Mobile first", text: "Fast on every screen size" },
  { icon: MapPin, title: "Based in Langebaan", text: "Serving all of South Africa" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Why work with me"
      className="border-y border-surface-border bg-surface"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-6 py-7 lg:grid-cols-4">
        {points.map((point) => {
          const Icon = point.icon;

          return (
            <li key={point.title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={18} aria-hidden="true" />
              </span>

              <span>
                <span className="block text-sm font-semibold">{point.title}</span>
                <span className="block text-xs text-foreground-muted">{point.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
