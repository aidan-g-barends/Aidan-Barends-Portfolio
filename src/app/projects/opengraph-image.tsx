import { ogContentType, ogSize, renderOgImage } from "../../lib/og";

export const alt = "Projects by Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Projects",
    title: "Client work, live apps & university projects.",
    subtitle: "Full-stack websites and apps built with React, Next.js, Spring Boot and more.",
  });
}
