import type { MetadataRoute } from "next";
import { siteRuntimeConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteRuntimeConfig.siteUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${siteRuntimeConfig.siteUrl}/plan-estudios`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${siteRuntimeConfig.siteUrl}/especialidades`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${siteRuntimeConfig.siteUrl}/contacto`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
