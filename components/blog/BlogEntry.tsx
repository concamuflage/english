import type { ReactNode } from "react";
import type { Article } from "@/lib/content";

type BlogEntryProps = {
  article: Article;
  children: ReactNode;
};

/**
 * Provides shared full-post typography and metadata for any site section.
 *
 * Example: `<BlogEntry article={article}><KeywordPlannerPost /></BlogEntry>`
 * renders an Entrepreneurship post using the same shell as an English article.
 * Body content uses black text, separate from the header's theme accents.
 * An article with `language: "zh-CN"` marks its Chinese content for screen readers.
 */
export function BlogEntry({ article, children }: BlogEntryProps) {
  return (
    <article className="article-page" lang={article.language}>
      <header>
        <p className="eyebrow">{article.section}</p>
        <h1>{article.title}</h1>
        <p className="article-date">
          <time dateTime={article.date}>{article.date}</time> · {article.readingTime}
        </p>
      </header>
      <div className="article-body">{children}</div>
    </article>
  );
}
