import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aidan-barends.vercel.app";

  const staticRoutes = ["", "/about", "/projects", "/experience", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return staticRoutes;
}