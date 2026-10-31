import { notFound, permanentRedirect } from "next/navigation";
import { generalConfusingWordPairs as legacyPairs } from "@/lib/generalConfusingWords";
import { getConfusingWordPath } from "@/lib/confusingWordRoutes";

type GroupPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Keeps former GENERAL pair links available in the static export, with the original stable slugs. */
export function generateStaticParams() {
  return legacyPairs.map((pair) => ({ slug: pair.slug }));
}

/** Redirects a former pair URL to the same merged card; e.g. /english/general/confusing-words/door-doorway goes to /english/confusing-words/door-doorway. */
export default async function LegacyConfusingWordGroupPage({ params }: GroupPageProps) {
  const { slug } = await params;
  const pair = legacyPairs.find((item) => item.slug === slug);
  if (!pair) notFound();
  permanentRedirect(getConfusingWordPath(pair.slug));
}
