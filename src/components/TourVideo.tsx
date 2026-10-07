"use client";

import { useEffect, useRef } from "react";
import type { Tour } from "../data/projects";

// Share of the video that must be on screen before it plays on touchscreens
const VISIBLE_RATIO = 0.6;

// Recorded walkthrough of an app (scripts/capture-tours.mjs). Shows the
// poster until hovered; touchscreens play it once it's on screen instead.
export default function TourVideo({ tour, label }: { tour: Tour; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const play = () => {
      video.play().catch(() => {});
    };

    const stop = () => {
      video.pause();
      video.currentTime = 0;
    };

    // The video covers the whole frame, so hovering it means hovering the card
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    if (!isTouch) {
      video.addEventListener("mouseenter", play);
      video.addEventListener("mouseleave", stop);

      return () => {
        video.removeEventListener("mouseenter", play);
        video.removeEventListener("mouseleave", stop);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= VISIBLE_RATIO) play();
        else video.pause();
      },
      { threshold: [0, VISIBLE_RATIO] }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={tour.video}
        poster={tour.poster}
        aria-label={`${label} walkthrough video`}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-white backdrop-blur transition-opacity duration-300 group-hover/image:opacity-0 motion-reduce:hidden"
      >
        ▶ {tour.duration}s walkthrough
      </span>
    </>
  );
}
