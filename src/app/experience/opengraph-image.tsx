import { ogContentType, ogSize, renderOgImage } from "../../lib/og";

export const alt = "Experience of Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Experience",
    title: "Freelancing, IT field work & study.",
    subtitle: "Freelance web developer and IT Field Technician at CraythorneIT.",
  });
}
