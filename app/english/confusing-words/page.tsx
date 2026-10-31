import type { Metadata } from "next";
import { ConfusingWordsPage } from "@/components/ConfusingWordsPage";
import { CONFUSING_WORDS_DESCRIPTION, CONFUSING_WORDS_PATH, CONFUSING_WORDS_TITLE } from "@/lib/confusingWordRoutes";

export const metadata: Metadata = {
  title: CONFUSING_WORDS_TITLE,
  description: CONFUSING_WORDS_DESCRIPTION,
  alternates: { canonical: `https://bumblebee.work${CONFUSING_WORDS_PATH}` }
};

/** Opens the unified English collection; e.g. former GRE coma/comma and General restrain/constrain share one list. */
export default function EnglishConfusingWordsPage() {
  return <ConfusingWordsPage />;
}
