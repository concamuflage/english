export type Article = {
  slug: string;
  title: string;
  section: "Reading" | "Vocabulary" | "Writing" | "GRE";
  excerpt: string;
  date: string;
  readingTime: string;
};

export type GreResource = {
  title: string;
  focus: string;
  example: string;
};

export const articles: Article[] = [
  {
    slug: "build-a-daily-reading-loop",
    title: "Build a Daily Reading Loop That Actually Sticks",
    section: "Reading",
    excerpt:
      "A practical routine for turning short English passages into vocabulary, grammar, and fluency gains.",
    date: "2026-10-04",
    readingTime: "5 min read"
  },
  {
    slug: "learn-words-in-families",
    title: "Learn Words in Families, Not in Isolation",
    section: "Vocabulary",
    excerpt:
      "Use roots, collocations, and example sentences to make new words easier to remember and reuse.",
    date: "2026-10-04",
    readingTime: "4 min read"
  },
  {
    slug: "gre-sentence-equivalence-patterns",
    title: "GRE Sentence Equivalence: Find the Pair Before the Words",
    section: "GRE",
    excerpt:
      "A strategy for spotting logic pairs before answer choices start competing for your attention.",
    date: "2026-10-04",
    readingTime: "6 min read"
  }
];

export const greResources: GreResource[] = [
  {
    title: "Sentence Equivalence",
    focus: "Match the sentence logic first, then choose two words with the same role.",
    example: "If the clue is contrast, expect an answer pair that reverses the first half."
  },
  {
    title: "Text Completion",
    focus: "Mark support, contrast, cause, and concession signals before checking choices.",
    example: "Although, however, and despite often point to a turn in the blank."
  },
  {
    title: "High-Value Vocabulary",
    focus: "Group words by tone and use instead of memorizing long alphabetical lists.",
    example: "Frugal, parsimonious, and miserly all relate to spending, but carry different judgments."
  }
];

/**
 * Returns the most recent articles for the home page.
 *
 * Example: `getFeaturedArticles(2)` returns the two newest article summaries.
 */
export function getFeaturedArticles(limit = 3): Article[] {
  return articles.slice(0, limit);
}

/**
 * Returns every article in the GRE section.
 *
 * Example: `getGreArticles()` returns posts whose section value is `"GRE"`.
 */
export function getGreArticles(): Article[] {
  return articles.filter((article) => article.section === "GRE");
}
