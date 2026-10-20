import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Business | Bumblebee",
  description: "Lessons from managing markets, negotiating retail deals, and building profitable businesses.",
  alternates: { canonical: "https://bumblebee.work/business" }
};

/**
 * Lists Business posts with the site's reusable article preview component.
 * Example: `/business` links to the retail-chain story rendered inside BlogEntry.
 */
export default function BusinessPage() {
  return (
    <main className="section-band empty-page">
      <h1 className="section-page-title">Business</h1>
      <div className="article-grid">
        {articles.filter((article) => article.section === "Business").map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
