import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { confusingWordPairs, getConfusingWordPair } from "@/lib/confusingWords";
import { getConfusingWordMetadata } from "@/lib/confusingWordRoutes";

type GroupPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Exports every current group; e.g. `{ slug: "factitious-facetious" }` creates its permanent HTML page. */
export function generateStaticParams() {
  return confusingWordPairs.map((pair) => ({ slug: pair.slug }));
}

/** Gives each group a unique title, description, and self-canonical URL; unknown slugs return 404. */
export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getConfusingWordPair(slug);
  if (!pair) notFound();
  const { title, description, canonical } = getConfusingWordMetadata(pair);
  return { title, description, alternates: { canonical } };
}

/** Renders the same practice UI with the URL's group selected; e.g. a shared coma-comma URL overrides saved progress. */
export default async function ConfusingWordGroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const pair = getConfusingWordPair(slug);
  if (!pair) notFound();
  return <ConfusingWordsPage initialSlug={pair.slug} />;
}
