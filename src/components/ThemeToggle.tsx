"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark = stored
      ? stored === "dark"
      : prefersDark;

    document.documentElement.classList.toggle(
      "dark",
      shouldUseDark
    );

    setIsDark(shouldUseDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);

    document.documentElement.classList.toggle(
      "dark",
      nextIsDark
    );

    localStorage.setItem(
      "theme",
      nextIsDark ? "dark" : "light"
    );
  }

  // Keep the server and initial client render identical.
  if (!mounted) {
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