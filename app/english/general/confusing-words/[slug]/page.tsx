import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { GENERAL_WORD_COLLECTION, getConfusingWordMetadata } from "@/lib/confusingWordRoutes";
import { generalConfusingWordPairs } from "@/lib/generalConfusingWords";

type GroupPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Exports General-only group URLs; for example, door-doorway, but not coma-comma. */
export function generateStaticParams() {
  return generalConfusingWordPairs.map((pair) => ({ slug: pair.slug }));
}

/** Gives door-doorway a General English title, description, and canonical URL. */
export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = generalConfusingWordPairs.find((item) => item.slug === slug);
  if (!pair) notFound();
  const { title, description, canonical } = getConfusingWordMetadata(pair, GENERAL_WORD_COLLECTION);
  return { title, description, alternates: { canonical } };
}

/** Opens a General pair directly; e.g. refreshing door-doorway retains that card instead of switching to GRE. */
export default async function GeneralConfusingWordGroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const pair = generalConfusingWordPairs.find((item) => item.slug === slug);
  if (!pair) notFound();
  return <ConfusingWordsPage pairs={generalConfusingWordPairs} collection={GENERAL_WORD_COLLECTION} initialSlug={pair.slug} />;
}
