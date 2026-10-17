import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { BlogEntry } from "@/components/blog/BlogEntry";
import { KeywordPlannerPost } from "@/components/blog/KeywordPlannerPost";
import { StudyNotePost } from "@/components/blog/StudyNotePost";
import { articles } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Register each authored body once; the same component can also be rendered in another section.
const articleBodies: Partial<Record<string, ComponentType>> = {
  "validate-demand-google-keyword-planner": KeywordPlannerPost
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
 * Renders local article components inside the reusable BlogEntry shell.
 *
 * Example: `/articles/validate-demand-google-keyword-planner` renders KeywordPlannerPost with its screenshots.
 */
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const ArticleBody = articleBodies[slug];

  return (
    <main>
      <BlogEntry article={article}>
        {ArticleBody ? (
          <ArticleBody />
        ) : (
          <>
            <p className="lede">{article.excerpt}</p>
            <StudyNotePost />
          </>
        )}
      </BlogEntry>
    </main>
  );
}
