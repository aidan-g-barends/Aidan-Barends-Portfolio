import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { projects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/experience", "/contact"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}