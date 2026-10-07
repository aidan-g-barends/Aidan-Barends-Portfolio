import Image from "next/image";
import type { Project } from "../data/projects";
import PreviewImage from "./PreviewImage";

// Project image for cards and detail pages. Projects with a full-page
// preview scroll from top to bottom while the parent `group/image` is
// hovered; the rest zoom slightly.
export default function ProjectShot({
  project,
  sizes,
  preload = false,
}: {
  project: Project;
  sizes: string;
  preload?: boolean;
}) {
  const alt = project.imageIsIllustration
    ? `Illustration representing ${project.name}`
    : `${project.name} screenshot`;

  if (project.preview) {
    // Longer pages scroll for longer, so the speed feels the same
    const scrollSeconds = Math.max(
      2.5,
      (project.preview.height / 960 - 0.625) * 2.2
    );

    return (
      <>
      <PreviewImage
        src={project.preview.src}
        alt={`${project.name} full page preview`}
        sizes={sizes}
        preload={preload}
        scrollSeconds={scrollSeconds}
        className="preview-shot object-cover object-top transition-[object-position] duration-700 ease-in-out group-hover/image:object-bottom group-hover/image:duration-(--scroll-duration) group-hover/image:ease-linear motion-reduce:group-hover/image:object-top"
      />

      {/* Hover devices scroll on hover; touch screens scroll once the visitor
          stops scrolling with the preview on screen (PreviewImage) */}
      <span
        aria-hidden="true"
        className="preview-hint-hover pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-white backdrop-blur transition-opacity duration-300 group-hover/image:opacity-0 motion-reduce:hidden"
      >
        Hover to scroll ↓
      </span>

      <span
        aria-hidden="true"
        className="preview-hint-touch pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-white backdrop-blur motion-reduce:hidden"
      >
        Pause here to preview ↓
      </span>
      </>
    );
  }

  return (
    <Image
      src={project.image!}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className="object-cover object-top transition-transform duration-500 group-hover/image:scale-[1.04]"
    />
  );
}
