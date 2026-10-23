import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { BlogEntry } from "@/components/blog/BlogEntry";
import { ChoosingDistributorPost } from "@/components/blog/ChoosingDistributorPost";
import { KeywordPlannerPost } from "@/components/blog/KeywordPlannerPost";
import { QuinoaBusinessPost } from "@/components/blog/QuinoaBusinessPost";
import { RetailChainPost } from "@/components/blog/RetailChainPost";
import { StudyNotePost } from "@/components/blog/StudyNotePost";
import { articles } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Register each authored body once; the same component can also be rendered in another section.
const articleBodies: Partial<Record<string, ComponentType>> = {
  "how-to-choose-a-distributor": ChoosingDistributorPost,
  "wait-until-right-time-major-retail-chain": RetailChainPost,
  "selling-quinoa-validate-business-ideas": QuinoaBusinessPost,
  "validate-demand-google-keyword-planner": KeywordPlannerPost
};

/**
 * Gives each authored article a descriptive search title, summary, and canonical URL.
 * Example: the quinoa post uses its story title and `/articles/selling-quinoa-validate-business-ideas`.
 */
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return {
    title: `${article.title} | Bumblebee`,
    description: article.excerpt,
    alternates: { canonical: `https://bumblebee.work/articles/${article.slug}` }
  };
}

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
 * `/articles/selling-quinoa-validate-business-ideas` renders QuinoaBusinessPost with the supplied photograph.
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
