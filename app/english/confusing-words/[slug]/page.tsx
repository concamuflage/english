import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { confusingWordPairs, getConfusingWordPair } from "@/lib/confusingWords";
import { getConfusingWordMetadata } from "@/lib/confusingWordRoutes";

type GroupPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Exports every merged group; e.g. coma-comma and door-doorway both live under /english/confusing-words. */
export function generateStaticParams() {
  return confusingWordPairs.map((pair) => ({ slug: pair.slug }));
}

/** Gives each pair its own English title and canonical URL; e.g. /english/confusing-words/restrain-constrain. */
export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getConfusingWordPair(slug);
  if (!pair) notFound();
  const { title, description, canonical } = getConfusingWordMetadata(pair);
  return { title, description, alternates: { canonical } };
}

/** Opens the URL's pair in the unified list; e.g. a door-doorway link takes priority over saved progress. */
export default async function ConfusingWordGroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const pair = getConfusingWordPair(slug);
  if (!pair) notFound();
  return <ConfusingWordsPage initialSlug={pair.slug} />;
}
