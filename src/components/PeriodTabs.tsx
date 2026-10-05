"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export type Period = {
  label: string;
  period: string;
  current: boolean;
  description: string;
};

// Clickable date boxes on an experience card. Selecting one shows what
// that period was about underneath.
export default function PeriodTabs({ periods }: { periods: Period[] }) {
  const baseId = useId();

  const [selected, setSelected] = useState(() => {
    const currentIndex = periods.findIndex((period) => period.current);
    return currentIndex === -1 ? 0 : currentIndex;
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();

    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (selected + step + periods.length) % periods.length;

    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  const active = periods[selected];

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Time periods"
        onKeyDown={handleKeyDown}
        className="grid gap-3 sm:grid-cols-2"
      >
        {periods.map((period, index) => {
          const isSelected = index === selected;

          return (
            <button
              key={period.period}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                isSelected
                  ? "border-accent/50 bg-accent/10 shadow-[0_8px_24px_-14px_var(--accent)]"
                  : "border-surface-border bg-background hover:-translate-y-0.5 hover:border-accent/40"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {period.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:hidden" />
                )}

                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                    period.current
                      ? "bg-emerald-500"
                      : "bg-foreground-muted/50"
                  }`}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-wide text-foreground-muted">
                  {period.label}
                </span>

                <span className="block font-[family-name:var(--font-mono)] text-sm font-medium">
                  {period.period}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`text-xs transition-colors ${
                  isSelected ? "text-accent" : "text-foreground-muted"
                }`}
              >
                {isSelected ? "Showing" : "View"}
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={selected}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${selected}`}
        className="period-panel mt-3 rounded-lg border-l-2 border-accent bg-background px-4 py-3 text-sm leading-relaxed text-foreground-muted"
      >
        {active.description}
      </div>
    </div>
  );
}
