import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "品牌出海 | Bumblebee",
  description: "分享品牌出海的实战经验，探讨海外代理商开发、渠道拓展与当地市场经营。",
  alternates: { canonical: "https://bumblebee.work/global-expansion" }
};

/**
 * Lists Chinese global-expansion articles with the site's reusable ArticleCard component.
 * Example: articles with `section: "品牌出海"` appear at `/global-expansion`.
 * The first post links to `/articles/how-to-find-overseas-distributors`.
 */
export default function GlobalExpansionPage() {
  return (
    <main className="section-band empty-page" lang="zh-CN">
      <h1 className="section-page-title">品牌出海</h1>
      <div className="article-grid">
        {articles.filter((article) => article.section === "品牌出海").map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
