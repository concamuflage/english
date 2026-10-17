import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";

export const dynamic = "force-static";

/**
 * Generates the production sitemap during each static build.
 *
 * Example: adding an article with slug `new-study-note` adds
 * `https://bumblebee.work/articles/new-study-note` automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // List destination pages only: /gre and /confusing-words redirect into /english.
  const paths = ["/", "/english", "/english/gre", "/english/gre/confusing-words", "/entrepreneurship"];
  return [
    ...paths.map((path) => ({ url: new URL(path, "https://bumblebee.work").href })),
    ...articles.map((article) => ({
      url: `https://bumblebee.work/articles/${encodeURIComponent(article.slug)}`
    }))
  ];
}
