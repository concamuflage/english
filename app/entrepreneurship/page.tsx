import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Entrepreneurship | the bumblebee's"
};

/**
 * Lists Entrepreneurship posts using the site's reusable article preview component.
 *
 * Example: `/entrepreneurship` links to the Google Keyword Planner demand-validation post.
 * The section title uses compact typography above the article listing.
 */
export default function EntrepreneurshipPage() {
  return (
    <main className="section-band empty-page">
      <h1 className="section-page-title">Entrepreneurship</h1>
      <div className="article-grid">
        {articles.filter((article) => article.section === "Entrepreneurship").map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
