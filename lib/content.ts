export type Article = {
  slug: string;
  title: string;
  section: "Reading" | "Vocabulary" | "Writing" | "GRE" | "Entrepreneurship" | "品牌出海";
  excerpt: string;
  date: string;
  readingTime: string;
  /** Language of the article, e.g. `zh-CN` for 如何选择代理商？; omitted entries inherit the page language. */
  language?: "en" | "zh-CN";
  /** Slug of the other language version, e.g. `wait-until-right-time-major-retail-chain-zh`. */
  translationSlug?: string;
};

export type GreResource = {
  title: string;
  focus: string;
  example: string;
};

export const articles: Article[] = [
  {
    slug: "hiring-big-company-talent-for-small-businesses",
    title: "为什么中小企业聘用那些直接从大公司出来的人是件非常危险的事情？",
    section: "品牌出海",
    excerpt: "从大厂转到中小品牌后，如何调整与代理商、同事的相处方式？分享亲身经历，反思把大品牌的话语权误当成个人能力的风险。",
    date: "2026-10-23",
    readingTime: "3 min read",
    language: "zh-CN"
  },
  {
    slug: "market-research-without-resources",
    title: "如何避免在下属面前展现自己是一个无能的傻子？",
    section: "品牌出海",
    excerpt: "要求员工调研市场容量、品牌份额和线上线下占比之前，管理者应该先理解获取数据需要的资源与成本。",
    date: "2026-10-23",
    readingTime: "3 min read",
    language: "zh-CN"
  },
  {
    slug: "how-to-find-overseas-distributors",
    title: "如何开发海外代理商？",
    section: "品牌出海",
    excerpt: "从谷歌搜索、LinkedIn 和谷歌地图，到会展、爬虫、竞争对手网站和进出口数据，分享开发海外代理商的实战经验。",
    date: "2026-10-23",
    readingTime: "3 min read",
    language: "zh-CN"
  },
  {
    slug: "how-to-choose-a-distributor",
    title: "如何选择代理商？",
    section: "品牌出海",
    excerpt: "品牌出海如何选择代理商？先评估自身的营销、渠道和零售能力，再判断需要的是运营团队还是资金物流平台。",
    date: "2026-10-22",
    readingTime: "3 min read",
    language: "zh-CN"
  },
  {
    slug: "wait-until-right-time-major-retail-chain-zh",
    title: "等时机成熟，再进入大型零售连锁",
    section: "品牌出海",
    excerpt: "从进入西班牙大型零售连锁的经历中总结教训：先算清利润、积累议价能力，再让销售激励与企业的长期利益保持一致。",
    date: "2026-10-20",
    readingTime: "5 min read",
    language: "zh-CN",
    translationSlug: "wait-until-right-time-major-retail-chain"
  },
  {
    slug: "wait-until-right-time-major-retail-chain",
    title: "Wait Until the Right Time to Enter a Major Retail Chain",
    section: "品牌出海",
    excerpt: "Lessons from entering major retail chains in Spain: evaluate the economics, build bargaining power, and reward long-term profitability.",
    date: "2026-10-20",
    readingTime: "5 min read",
    language: "en",
    translationSlug: "wait-until-right-time-major-retail-chain-zh"
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
