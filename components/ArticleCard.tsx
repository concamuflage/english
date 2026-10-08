import type { Article } from "@/lib/content";

type ArticleCardProps = {
  article: Article;
};

/**
 * Displays a compact article preview for list views.
 *
 * Example: pass the `gre-sentence-equivalence-patterns` article to show its title, section, and summary.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card">
      <div className="article-meta">
        <span>{article.section}</span>
        <span>{article.readingTime}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <a href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
        Read article
      </a>
    </article>
  );
}
