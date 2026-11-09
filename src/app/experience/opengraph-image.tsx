import { ogContentType, ogSize, renderOgImage } from "../../lib/og";

export const alt = "Experience of Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Experience",
    title: "My business, IT field work & study.",
    subtitle: "Founder of Digital Solutions WC and IT Field Technician at CraythorneIT.",
  });
}
