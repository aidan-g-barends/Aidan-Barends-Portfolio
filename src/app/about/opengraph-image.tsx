import { ogContentType, ogSize, renderOgImage } from "../../lib/og";

export const alt = "About Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "From gaming to shipping software.",
    subtitle: "Software Engineering student, freelance web developer and IT Field Technician.",
  });
}
