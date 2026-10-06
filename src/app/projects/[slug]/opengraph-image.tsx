import { projects } from "../../../data/projects";
import { ogContentType, ogSize, renderOgImage } from "../../../lib/og";

export const alt = "Project by Aidan Barends";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return renderOgImage({
    eyebrow: project?.university
      ? "University project"
      : project?.clientWork
        ? "Client work"
        : "Project",
    title: project?.name ?? "Project",
    subtitle: project?.tech.slice(0, 4).join(" · ") ?? "",
    image: project?.image,
  });
}
