"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

// How long the page must be still before a visible preview starts scrolling
const SCROLL_IDLE_MS = 350;
// Share of the preview that must be on screen to count as "looking at it"
const VISIBLE_RATIO = 0.6;
// Below this the card has left the screen, so the preview resets to the top
const RESET_RATIO = 0.15;

// Full-page preview image. Hover devices scroll it on hover (CSS classes in
// ProjectShot). Touch screens have no hover, so here it starts scrolling on
// its own once it's on screen and the visitor stops scrolling, the same way
// hovering would, and resets when it leaves the screen.
export default function PreviewImage({
  src,
  alt,
  sizes,
  preload,
  scrollSeconds,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  preload: boolean;
  scrollSeconds: number;
  className: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    // Don't rely on "(hover: none)": some phones (e.g. Samsung) report
    // that they can hover, so check for a touchscreen instead
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isTouch || reduceMotion) return;

    let ratio = 0;
    let idleTimer: number | undefined;

    const start = () => {
      if (ratio >= VISIBLE_RATIO) image.dataset.autoscroll = "on";
    };

    const scheduleStart = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(start, SCROLL_IDLE_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        ratio = entry.intersectionRatio;

        if (ratio < RESET_RATIO) {
          delete image.dataset.autoscroll;
        } else if (ratio >= VISIBLE_RATIO) {
          // Covers stopping with the card already on screen (or page load)
          scheduleStart();
        }
      },
      { threshold: [0, RESET_RATIO, VISIBLE_RATIO, 1] }
    );

    observer.observe(image);
    window.addEventListener("scroll", scheduleStart, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleStart);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <Image
      ref={imageRef}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      style={
        {
          "--scroll-duration": `${scrollSeconds}s`,
        } as CSSProperties
      }
      className={className}
    />
  );
}
