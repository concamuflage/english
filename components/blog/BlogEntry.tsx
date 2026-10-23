import type { ReactNode } from "react";
import { articles, type Article } from "@/lib/content";

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
 * A `translationSlug` adds language links, e.g. the retail-chain post links to its Chinese version.
 */
export function BlogEntry({ article, children }: BlogEntryProps) {
  const translation = articles.find((item) => item.slug === article.translationSlug);
  const languageVersions = translation ? [article, translation].sort((a, b) =>
    a.language === b.language ? 0 : a.language === "zh-CN" ? -1 : 1
  ) : [];

  return (
    <article className="article-page" lang={article.language}>
      <header>
        <p className="eyebrow">{article.section}</p>
        <h1>{article.title}</h1>
        {translation && (
          <nav className="article-languages" aria-label="Language / 语言">
            {languageVersions.map((version) => (
              <a
                key={version.slug}
                href={`/articles/${version.slug}`}
                hrefLang={version.language}
                lang={version.language}
                aria-current={version.slug === article.slug ? "page" : undefined}
              >
                {version.language === "zh-CN" ? "中文" : "English"}
              </a>
            ))}
          </nav>
        )}
        <p className="article-date">
          <time dateTime={article.date}>{article.date}</time> · {article.readingTime}
        </p>
      </header>
      <div className="article-body">{children}</div>
    </article>
  );
}
