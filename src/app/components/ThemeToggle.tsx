"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle(){
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const shouldUseDark = stored ? stored === "dark": prefersDark;

        setIsDark(shouldUseDark);
        document.documentElement.classList.toggle("dark", shouldUseDark);
    }, []);

    function toggleTheme(){
        const next = !isDark;

        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-foreground transition hover:border-accent"
            >
                {isDark ? "☀️": "🌙"}
            </button>
    );

}