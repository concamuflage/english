import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Allows public-page crawling and advertises the generated sitemap.
 *
 * Example: /robots.txt contains `Sitemap: https://bumblebee.work/sitemap.xml`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bumblebee.work/sitemap.xml"
  };
}
