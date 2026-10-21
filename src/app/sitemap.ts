import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site, siteUrl } from "@/content/site";

export const dynamic = "force-static";

// Static export: dates reflect the last deploy, which is when content changes.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}${site.portrait.src}`],
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
