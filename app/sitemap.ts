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
 * Misleading word forms includes `/english/general/words-that-look-misleading`, starting with spendthrift.
 * Math includes `/math/calculus/tangent-plane`, the rotatable tangent-plane post.
 * Cancellation adds `/math/calculus/canceling-height-changes`, exported from test.py.
 * Calculus practice includes `/math/calculus/practices/second-step-error`, the handwritten formula question.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // List destination pages only: /gre and /confusing-words redirect into /english.
  const paths = ["/", "/english", "/english/gre", "/english/gre/confusing-words", "/math", "/math/calculus", "/math/calculus/tangent-plane", "/math/calculus/canceling-height-changes", "/math/calculus/practices/second-step-error", "/entrepreneurship", "/global-expansion", "/contact"];
  return [
    ...paths.map((path) => ({ url: new URL(path, "https://bumblebee.work").href })),
    ...confusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug)}`
    })),
    { url: `https://bumblebee.work${GENERAL_WORD_COLLECTION.path}` },
    { url: "https://bumblebee.work/english/general/commonly-mispronounced-words" },
    { url: "https://bumblebee.work/english/general/uncommon-meaning-of-common-words" },
    { url: "https://bumblebee.work/english/general/words-that-look-misleading" },
    ...generalConfusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug, GENERAL_WORD_COLLECTION)}`
    })),
    ...articles.map((article) => ({
      url: `https://bumblebee.work/articles/${encodeURIComponent(article.slug)}`
    }))
  ];
}
