import type { Metadata } from "next";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { GENERAL_WORD_COLLECTION } from "@/lib/confusingWordRoutes";
import { generalConfusingWordPairs } from "@/lib/generalConfusingWords";

export const metadata: Metadata = {
  title: GENERAL_WORD_COLLECTION.title,
  description: GENERAL_WORD_COLLECTION.description,
  alternates: { canonical: `https://bumblebee.work${GENERAL_WORD_COLLECTION.path}` }
};

/**
 * Reuses the practice design with General English vocabulary only.
 *
 * Example: `/english/general/confusing-words` lists door/doorway, not the GRE pairs.
 */
export default function GeneralConfusingWordsPage() {
  return <ConfusingWordsPage pairs={generalConfusingWordPairs} collection={GENERAL_WORD_COLLECTION} />;
}
