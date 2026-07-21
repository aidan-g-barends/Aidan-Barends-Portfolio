"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = stored ? stored === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function setTheme(dark: boolean) {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-surface-border bg-surface p-1">
      <button
        onClick={() => setTheme(false)}
        aria-label="Switch to light mode"
        aria-pressed={!isDark}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
          !isDark ? "bg-background shadow-sm" : "hover:bg-background/50"
        }`}
      >
        <Sun size={15} className="text-foreground" />
      </button>
      <button
        onClick={() => setTheme(true)}
        aria-label="Switch to dark mode"
        aria-pressed={isDark}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
          isDark ? "bg-background shadow-sm" : "hover:bg-background/50"
        }`}
      >
        <Moon size={15} className="text-foreground" />
      </button>
    </div>
  );
}