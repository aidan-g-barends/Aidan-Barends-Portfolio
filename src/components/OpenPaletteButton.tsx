"use client";

import { Search } from "lucide-react";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";

// Opens the site-wide command palette from anywhere on a page
export default function OpenPaletteButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent"
    >
      <Search size={16} aria-hidden="true" />
      {label}
      <kbd className="hidden rounded border border-surface-border px-1.5 font-[family-name:var(--font-mono)] text-[11px] text-foreground-muted sm:inline">
        Ctrl K
      </kbd>
    </button>
  );
}
