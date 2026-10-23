import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { confusingWordPairs } from "@/lib/confusingWords";
import { getConfusingWordPath } from "@/lib/confusingWordRoutes";

export const dynamic = "force-static";

/**
 * Generates the production sitemap during each static build.
 *
 * Example: adding an article with slug `new-study-note` adds
 * `https://bumblebee.work/articles/new-study-note` automatically; `/global-expansion` is listed explicitly.
 * Every word group is included too, e.g. `/english/gre/confusing-words/factitious-facetious`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // List destination pages only: /gre and /confusing-words redirect into /english.
  const paths = ["/", "/english", "/english/gre", "/english/gre/confusing-words", "/entrepreneurship", "/global-expansion", "/contact"];
  return [
    ...paths.map((path) => ({ url: new URL(path, "https://bumblebee.work").href })),
    ...confusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug)}`
    })),
    ...articles.map((article) => ({
      url: `https://bumblebee.work/articles/${encodeURIComponent(article.slug)}`
    }))
  ];
}
