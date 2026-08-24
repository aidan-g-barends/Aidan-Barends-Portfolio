"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!container.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const ctx = gsap.context(() => {
        const page = container.current;

        if (!page) return;

        if (reduceMotion) {
          gsap.set(page, {
            clearProps: "all",
          });

          gsap.set("[data-gsap]", {
            clearProps: "all",
          });

          return;
        }

        /*
         * PAGE ENTRANCE
         */
        gsap.fromTo(
          page,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          }
        );

        /*
         * HERO
         */
        const heroElements = page.querySelectorAll(
          '[data-gsap="hero"]'
        );

        if (heroElements.length) {
          gsap.fromTo(
            heroElements,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.08,
            }
          );
        }

        /*
         * SCROLL REVEALS
         */
        const revealElements = page.querySelectorAll(
          '[data-gsap="reveal"]'
        );

        revealElements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

        /*
         * STAGGERED ELEMENTS
         */
        const staggerGroups = page.querySelectorAll(
          '[data-gsap="stagger"]'
        );

        staggerGroups.forEach((group) => {
          const children = group.children;

          if (!children.length) return;

          gsap.fromTo(
            children,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        /*
         * SCALE REVEALS
         */
        const scaleElements = page.querySelectorAll(
          '[data-gsap="scale"]'
        );

        scaleElements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 30,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

        /*
         * TIMELINE ITEMS
         */
        const timeline = page.querySelectorAll(
          '[data-gsap="timeline"]'
        );

        timeline.forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: 35,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        /*
         * TIMELINE LINE
         */
        const timelineLines = page.querySelectorAll(
          '[data-gsap="timeline-line"]'
        );

        timelineLines.forEach((line) => {
          gsap.fromTo(
            line,
            {
              scaleY: 0,
              transformOrigin: "top",
            },
            {
              scaleY: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

        /*
         * PARALLAX
         */
        const parallaxElements = page.querySelectorAll(
          '[data-gsap="parallax"]'
        );

        if (parallaxElements.length) {
          const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;

            parallaxElements.forEach((element) => {
              gsap.to(element, {
                x: x * 18,
                y: y * 12,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          };

          window.addEventListener("mousemove", handleMouseMove);

          return () => {
            window.removeEventListener(
              "mousemove",
              handleMouseMove
            );
          };
        }
      }, container);

      return () => ctx.revert();
    },
    {
      scope: container,
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={container} className="min-h-full">
      {children}
    </div>
  );
}