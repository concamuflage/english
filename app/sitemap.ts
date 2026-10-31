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
 * Every merged word group is included once, e.g. `/english/confusing-words/factitious-facetious` and `/english/confusing-words/door-doorway`.
 * Topic pages live directly under English, e.g. `/english/commonly-mispronounced-words`.
 * Meaning practice includes `/english/uncommon-meaning-of-common-words`, starting with inform.
 * Misleading forms and context-dependent meanings retain spendthrift and ingenuous respectively.
 * Math includes `/math/calculus/tangent-plane`, the rotatable tangent-plane post.
 * Cancellation adds `/math/calculus/canceling-height-changes`, exported from test.py.
 * Calculus practice includes `/math/calculus/practices/second-step-error`, the handwritten formula question.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // List canonical destinations only; legacy GRE/General URLs and / redirect to these pages.
  const paths = ["/english", "/english/confusing-words", "/math", "/math/calculus", "/math/calculus/tangent-plane", "/math/calculus/canceling-height-changes", "/math/calculus/practices/second-step-error", "/entrepreneurship", "/global-expansion", "/contact"];
  return [
    ...paths.map((path) => ({ url: new URL(path, "https://bumblebee.work").href })),
    ...confusingWordPairs.map((pair) => ({
      url: `https://bumblebee.work${getConfusingWordPath(pair.slug)}`
    })),
    { url: "https://bumblebee.work/english/commonly-mispronounced-words" },
    { url: "https://bumblebee.work/english/uncommon-meaning-of-common-words" },
    { url: "https://bumblebee.work/english/words-that-look-misleading" },
    { url: "https://bumblebee.work/english/words-whose-meaning-depends-on-context" },
    ...articles.map((article) => ({
      url: `https://bumblebee.work/articles/${encodeURIComponent(article.slug)}`
    }))
  ];
}
