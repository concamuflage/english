import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { confusingWordPairs } from "@/lib/confusingWords";
import { GENERAL_WORD_COLLECTION, getConfusingWordPath } from "@/lib/confusingWordRoutes";
import { generalConfusingWordPairs } from "@/lib/generalConfusingWords";

export const dynamic = "force-static";

/**
 * Generates the production sitemap during each static build.
 *
 * Example: adding an article with slug `new-study-note` adds
 * `https://bumblebee.work/articles/new-study-note` automatically; `/global-expansion` is listed explicitly.
 * Every word group is included too, e.g. `/english/gre/confusing-words/factitious-facetious`.
 * General practice adds its collection and pair pages, e.g. `/english/general/confusing-words/door-doorway`.
 * The pronunciation collection includes `/english/general/commonly-mispronounced-words` once it has content.
 * Meaning practice includes `/english/general/uncommon-meaning-of-common-words`, starting with inform.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // List destination pages only: /gre and /confusing-words redirect into /english.
  const paths = ["/", "/english", "/english/gre", "/english/gre/confusing-words", "/entrepreneurship", "/global-expansion", "/contact"];
  return [
    ...paths.map((path) => ({ url: new URL(path, "https://bumblebee.work").href })),
    ...confusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug)}`
    })),
    { url: `https://bumblebee.work${GENERAL_WORD_COLLECTION.path}` },
    { url: "https://bumblebee.work/english/general/commonly-mispronounced-words" },
    { url: "https://bumblebee.work/english/general/uncommon-meaning-of-common-words" },
    ...generalConfusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug, GENERAL_WORD_COLLECTION)}`
    })),
    ...articles.map((article) => ({
      url: `https://bumblebee.work/articles/${encodeURIComponent(article.slug)}`
    }))
  ];
}
