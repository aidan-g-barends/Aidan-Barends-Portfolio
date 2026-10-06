"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;

// Terminal-style line that types out each role in turn. Screen readers
// get the full list once; the animated text is hidden from them.
export default function TypedRoles({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Start after the hero entrance so the first role is readable
    const start = window.setTimeout(() => setAnimate(true), HOLD_MS);
    return () => window.clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!animate) return;

    const role = roles[roleIndex];
    let timeout: number;

    if (!deleting && length === role.length) {
      timeout = window.setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && length === 0) {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      }, 250);
    } else {
      timeout = window.setTimeout(
        () => setLength((value) => value + (deleting ? -1 : 1)),
        deleting ? DELETE_MS : TYPE_MS
      );
    }

    return () => window.clearTimeout(timeout);
  }, [animate, deleting, length, roleIndex, roles]);

  return (
    <p className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface/70 px-4 py-2 font-[family-name:var(--font-mono)] text-sm backdrop-blur">
      <span className="sr-only">{roles.join(", ")}</span>

      <span
        aria-hidden="true"
        className="text-foreground-muted"
      >
        ~/aidan $
      </span>

      <span
        aria-hidden="true"
        className="text-accent"
      >
        {roles[roleIndex].slice(0, length)}
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent motion-reduce:animate-none" />
      </span>
    </p>
  );
}
