import { ogContentType, ogSize, renderOgImage } from "../lib/og";

export const alt = "Aidan Barends, founder of Digital Solutions WC and Software Engineering student";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Founder of Digital Solutions WC & aspiring AI Engineer.",
    subtitle: "Software Engineering student at CPUT building full-stack apps for real clients.",
  });
}
