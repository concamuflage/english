import { notFound } from "next/navigation";
import { articles } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Generates all static article routes for Cloudflare Pages export.
 *
 * Example: returns `{ slug: "build-a-daily-reading-loop" }` for the reading article.
 */
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug
  }));
}

/**
 * Renders a static article page from local content data.
 *
 * Example: `/articles/gre-sentence-equivalence-patterns` renders the GRE article shell.
 */
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <article className="article-page">
        <p className="eyebrow">{article.section}</p>
        <h1>{article.title}</h1>
        <p className="article-date">
          {article.date} · {article.readingTime}
        </p>
        <p className="lede">{article.excerpt}</p>
        <h2>Study note</h2>
        <p>
          Start by reading once for meaning. On the second pass, mark the signal words that show contrast, cause,
          emphasis, or sequence. On the third pass, write one original sentence that uses the most useful new word.
        </p>
        <h2>Try this</h2>
        <p>
          Choose a paragraph from today&apos;s reading and reduce it to one sentence. Then expand it again with two new
          details. This before-and-after exercise trains accuracy and style at the same time.
        </p>
      </article>
    </main>
  );
}
