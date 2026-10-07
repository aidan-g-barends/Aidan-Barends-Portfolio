"use client";

import { lazy, Suspense, useEffect, useState } from "react";

// The Spline runtime is heavy, so it is only fetched when the robot is shown
const Spline = lazy(() => import("@splinetool/react-spline"));

// Public Spline community scene: a robot that follows the cursor
const SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Interactive 3D robot for the hero. Only loads on large screens with a
// mouse, and skips visitors who asked for reduced motion or data savings.
export default function HeroRobot() {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)"
    );
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;

    function update() {
      // Once loaded, keep it mounted so resizing doesn't re-download it
      if (query.matches && !saveData) setEnabled(true);
    }

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[560px] w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:block"
    >
      {/* Glow that sits behind the robot and doubles as the loading state */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-1000 ${
          loaded ? "opacity-30 dark:opacity-25" : "animate-pulse opacity-20"
        }`}
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {enabled && (
        <Suspense fallback={null}>
          <Spline
            scene={SCENE_URL}
            onLoad={(app) => {
              // The scene ships with a black backdrop; let the hero show through
              app.setBackgroundColor("transparent");
              setLoaded(true);
            }}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </Suspense>
      )}
    </div>
  );
}
