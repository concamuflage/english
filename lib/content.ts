export type Article = {
  slug: string;
  title: string;
  section: "Reading" | "Vocabulary" | "Writing" | "GRE" | "Entrepreneurship" | "Business";
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
    slug: "wait-until-right-time-major-retail-chain",
    title: "Wait Until the Right Time to Enter a Major Retail Chain",
    section: "Business",
    excerpt: "Lessons from entering major retail chains in Spain: evaluate the economics, build bargaining power, and reward long-term profitability.",
    date: "2026-10-20",
    readingTime: "5 min read"
  },
  {
    slug: "selling-quinoa-validate-business-ideas",
    title: "What Selling Quinoa Taught Me About Testing Business Ideas",
    section: "Entrepreneurship",
    excerpt: "A $1,000 lesson in testing market demand before investing in a company, a brand, and a customer service number.",
    date: "2026-10-20",
    readingTime: "2 min read"
  },
  {
    slug: "validate-demand-google-keyword-planner",
    title: "How Can We Validate Demand with Google Keyword Planner?",
    section: "Entrepreneurship",
    excerpt: "What I learned about checking demand after building a medical tourism website.",
    date: "2026-10-17",
    readingTime: "3 min read"
  },
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
