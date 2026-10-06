"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { THEME_EVENT, toggleTheme } from "../lib/theme";

// The initial "dark" class is set before paint by the inline script in
// layout.tsx, so the toggle only has to read it from the DOM.
function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// Unknown on the server, so render the placeholder button.
function getServerSnapshot() {
  return null;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Keep the server and initial client render identical.
  if (isDark === null) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        <Moon size={18} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
