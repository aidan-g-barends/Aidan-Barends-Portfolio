import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

// Shared hero for inner pages: grid backdrop, accent glows, eyebrow,
// title with an optional gradient word, and a description.
export default function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  children,
  width = "max-w-3xl",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: ReactNode;
  children?: ReactNode;
  width?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0"
      />

      <div
        data-gsap="parallax"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-24 h-[380px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div
        data-gsap="parallax"
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[300px] w-[300px] rounded-full opacity-25 blur-3xl dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--accent-2) 0%, transparent 70%)",
        }}
      />

      <div className={`relative mx-auto px-6 pb-10 pt-12 sm:pb-12 sm:pt-24 ${width}`}>
        <div data-gsap="hero">
          <Eyebrow label={eyebrow} />

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-gradient">{highlight}</span>
              </>
            )}
          </h1>
        </div>

        {description && (
          <div data-gsap="hero">
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
              {description}
            </p>
          </div>
        )}

        {children && <div data-gsap="hero">{children}</div>}
      </div>
    </section>
  );
}
