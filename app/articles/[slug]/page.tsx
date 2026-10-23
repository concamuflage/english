import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { BlogEntry } from "@/components/blog/BlogEntry";
import { BigCompanyHiringPost } from "@/components/blog/BigCompanyHiringPost";
import { ChoosingDistributorPost } from "@/components/blog/ChoosingDistributorPost";
import { DevelopingDistributorsPost } from "@/components/blog/DevelopingDistributorsPost";
import { KeywordPlannerPost } from "@/components/blog/KeywordPlannerPost";
import { MarketResearchPost } from "@/components/blog/MarketResearchPost";
import { QuinoaBusinessPost } from "@/components/blog/QuinoaBusinessPost";
import { RetailChainPost } from "@/components/blog/RetailChainPost";
import { RetailChainChinesePost } from "@/components/blog/RetailChainChinesePost";
import { StudyNotePost } from "@/components/blog/StudyNotePost";
import { articles } from "@/lib/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Register each authored body once; the same component can also be rendered in another section.
const articleBodies: Partial<Record<string, ComponentType>> = {
  "hiring-big-company-talent-for-small-businesses": BigCompanyHiringPost,
  "market-research-without-resources": MarketResearchPost,
  "how-to-find-overseas-distributors": DevelopingDistributorsPost,
  "how-to-choose-a-distributor": ChoosingDistributorPost,
  "wait-until-right-time-major-retail-chain": RetailChainPost,
  "wait-until-right-time-major-retail-chain-zh": RetailChainChinesePost,
  "selling-quinoa-validate-business-ideas": QuinoaBusinessPost,
  "validate-demand-google-keyword-planner": KeywordPlannerPost
};

/**
 * Gives each authored article a descriptive search title, summary, and canonical URL.
 * Example: the quinoa post uses its story title and `/articles/selling-quinoa-validate-business-ideas`.
 * Retail-chain versions each use their own canonical URL and link both languages with hreflang.
 */
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const translation = articles.find((item) => item.slug === article.translationSlug);
  // Link both localized URLs for search engines; each version remains independently indexable.
  const languages = translation && article.language && translation.language
    ? {
        [article.language]: `https://bumblebee.work/articles/${article.slug}`,
        [translation.language]: `https://bumblebee.work/articles/${translation.slug}`
      }
    : undefined;

  return {
    title: `${article.title} | Bumblebee`,
    description: article.excerpt,
    alternates: {
      canonical: `https://bumblebee.work/articles/${article.slug}`,
      languages
    }
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
