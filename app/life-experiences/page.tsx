import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Life Experiences | Bumblebee",
  description: "生活中的亲身经历、踩坑记录和解决办法，从 Mac 版 Kindle 的账户登录问题说起。",
  alternates: { canonical: "https://bumblebee.work/life-experiences" }
};

/** Lists personal-experience posts; e.g. `/life-experiences` links to the Mac Kindle sign-in story. */
export default function LifeExperiencesPage() {
  return (
    <main className="section-band empty-page">
      <h1 className="section-page-title">Life Experiences</h1>
      <div className="article-grid">
        {articles.filter((article) => article.section === "Life Experiences").map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
