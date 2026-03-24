import type { MetadataRoute } from "next";
import { siteRuntimeConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteRuntimeConfig.siteUrl}/sitemap.xml`,
  };
}
