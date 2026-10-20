import type { Metadata } from "next";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { CONFUSING_WORDS_DESCRIPTION, CONFUSING_WORDS_PATH, CONFUSING_WORDS_TITLE } from "@/lib/confusingWordRoutes";

export const metadata: Metadata = {
  title: CONFUSING_WORDS_TITLE,
  description: CONFUSING_WORDS_DESCRIPTION,
  alternates: { canonical: `https://bumblebee.work${CONFUSING_WORDS_PATH}` }
};

/**
 * Renders word-pair practice inside English's GRE section.
 *
 * Example: `/english/gre/confusing-words` shows a personal introduction above the word-pair list and practice card.
 * An IPA reference below the practice area links to the source wordlist and dictionary references.
 * The compact H1 reads `GRE Confusing Words Practice`, with page-specific search metadata.
 * The shared shell also renders permanent group pages such as `/english/gre/confusing-words/factitious-facetious`.
 */
export default function GreConfusingWordsPage() {
  return <ConfusingWordsPage />;
}
