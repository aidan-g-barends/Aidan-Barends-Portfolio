"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Copy,
  CornerDownLeft,
  FileText,
  FolderKanban,
  House,
  Mail,
  Search,
  SunMoon,
  User,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { toggleTheme } from "../lib/theme";

export const OPEN_PALETTE_EVENT = "open-command-palette";

type Action =
  | { type: "go"; href: string }
  | { type: "external"; href: string }
  | { type: "copy-email" }
  | { type: "theme" };

type Item = {
  id: string;
  group: "Pages" | "Projects" | "Actions";
  label: string;
  hint?: string;
  icon: LucideIcon;
  keywords?: string;
  action: Action;
};

type PaletteProject = {
  slug: string;
  name: string;
  tech: string[];
};

const EMAIL = "aidanbarends95@gmail.com";

export default function CommandPalette({
  projects,
}: {
  projects: PaletteProject[];
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");

  function open() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    setQuery("");
    setActive(0);
    dialog.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, open);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, []);

  const items = useMemo<Item[]>(
    () => [
      { id: "home", group: "Pages", label: "Home", icon: House, action: { type: "go", href: "/" } },
      { id: "about", group: "Pages", label: "About", icon: User, action: { type: "go", href: "/about" } },
      { id: "projects", group: "Pages", label: "Projects", icon: FolderKanban, action: { type: "go", href: "/projects" } },
      { id: "experience", group: "Pages", label: "Experience", icon: Briefcase, keywords: "work cv jobs craythorne freelance", action: { type: "go", href: "/experience" } },
      { id: "services", group: "Pages", label: "Services", hint: "Websites for businesses", icon: Wrench, keywords: "hire freelance website", action: { type: "go", href: "/#services" } },
      { id: "contact", group: "Pages", label: "Contact", icon: Mail, keywords: "email message hire", action: { type: "go", href: "/contact" } },

      ...projects.map<Item>((project) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        label: project.name,
        hint: project.tech.slice(0, 3).join(" · "),
        icon: FolderKanban,
        keywords: project.tech.join(" "),
        action: { type: "go", href: `/projects/${project.slug}` },
      })),

      { id: "copy-email", group: "Actions", label: "Copy email address", hint: EMAIL, icon: Copy, action: { type: "copy-email" } },
      { id: "freelance", group: "Actions", label: "Start a freelance project", icon: Mail, keywords: "hire website client", action: { type: "go", href: "/contact?topic=freelance" } },
      { id: "resume", group: "Actions", label: "Open resume (PDF)", icon: FileText, keywords: "cv download", action: { type: "external", href: "/resume.pdf" } },
      { id: "theme", group: "Actions", label: "Toggle light / dark theme", icon: SunMoon, keywords: "dark mode light mode", action: { type: "theme" } },
      { id: "github", group: "Actions", label: "GitHub profile", icon: ArrowUpRight, action: { type: "external", href: "https://github.com/aidan-g-barends" } },
      { id: "linkedin", group: "Actions", label: "LinkedIn profile", icon: ArrowUpRight, action: { type: "external", href: "https://www.linkedin.com/in/aidan-barends/" } },
    ],
    [projects]
  );

  function run(item: Item) {
    const { action } = item;

    switch (action.type) {
      case "go":
        close();
        router.push(action.href);
        break;
      case "external":
        close();
        window.open(action.href, "_blank", "noopener,noreferrer");
        break;
      case "theme":
        toggleTheme();
        close();
        break;
      case "copy-email":
        navigator.clipboard?.writeText(EMAIL).then(
          () => setToast("Email copied"),
          () => setToast(EMAIL)
        );
        break;
    }
  }

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return items;

    return items.filter((item) => {
      const text = `${item.label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [items, query]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (filtered.length === 0) return;

      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = (active + step + filtered.length) % filtered.length;
      setActive(next);

      listRef.current
        ?.querySelector(`[data-index="${next}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[active]) run(filtered[active]);
    }
  }

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it
        if (event.target === dialogRef.current) close();
      }}
      className="command-palette m-0 mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border border-surface-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-surface-border px-4">
        <Search
          size={18}
          aria-hidden="true"
          className="shrink-0 text-foreground-muted"
        />

        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Search pages, projects, actions..."
          aria-label="Search"
          aria-controls="command-palette-list"
          aria-activedescendant={
            filtered[active] ? `cmd-${filtered[active].id}` : undefined
          }
          role="combobox"
          aria-expanded="true"
          className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-foreground-muted"
        />

        <kbd className="hidden shrink-0 rounded border border-surface-border px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-foreground-muted sm:block">
          Esc
        </kbd>
      </div>

      <ul
        ref={listRef}
        id="command-palette-list"
        role="listbox"
        className="max-h-[50vh] overflow-y-auto p-2"
      >
        {filtered.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-foreground-muted">
            No results for &ldquo;{query}&rdquo;
          </li>
        )}

        {filtered.map((item, index) => {
          const Icon = item.icon;
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          const isActive = index === active;

          return (
            <li
              key={item.id}
              role="presentation"
            >
              {showGroup && (
                <p className="px-3 pb-1 pt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-foreground-muted">
                  {item.group}
                </p>
              )}

              <div
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={isActive}
                data-index={index}
                onMouseMove={() => setActive(index)}
                onClick={() => run(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  isActive ? "bg-accent/10 text-foreground" : "text-foreground-muted"
                }`}
              >
                <Icon
                  size={16}
                  aria-hidden="true"
                  className={isActive ? "text-accent" : ""}
                />

                <span className="font-medium">{item.label}</span>

                {item.hint && (
                  <span className="ml-auto truncate pl-3 text-xs text-foreground-muted">
                    {item.hint}
                  </span>
                )}

                {isActive && (
                  <CornerDownLeft
                    size={14}
                    aria-hidden="true"
                    className={`shrink-0 text-accent ${item.hint ? "" : "ml-auto"}`}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="flex items-center justify-between border-t border-surface-border px-4 py-2.5 text-[11px] text-foreground-muted"
      >
        <span className="font-[family-name:var(--font-mono)]">
          ↑↓ to move · Enter to open
        </span>

        <span className="font-medium text-accent">{toast}</span>
      </div>
    </dialog>
  );
}
