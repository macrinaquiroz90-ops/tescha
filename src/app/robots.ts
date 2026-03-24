import type { MetadataRoute } from "next";
import { siteRuntimeConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteRuntimeConfig.siteUrl}/sitemap.xml`,
  };
}
