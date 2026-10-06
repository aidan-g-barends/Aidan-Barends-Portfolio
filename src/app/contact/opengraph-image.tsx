import { ogContentType, ogSize, renderOgImage } from "../../lib/og";

export const alt = "Contact Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Let's build something.",
    subtitle: "Open to junior developer roles and new freelance clients.",
  });
}
