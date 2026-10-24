import type { ConfusingWordPair } from "@/lib/confusingWords";

export const CONFUSING_WORDS_PATH = "/english/gre/confusing-words";
export const CONFUSING_WORDS_TITLE = "GRE Confusing Words: Free Vocabulary Practice | Bumblebee";
export const CONFUSING_WORDS_DESCRIPTION = "Practice commonly confused GRE words with contextual sentences, IPA pronunciations, instant feedback, and notes explaining the differences.";

export const GRE_WORD_COLLECTION = {
  path: CONFUSING_WORDS_PATH,
  title: CONFUSING_WORDS_TITLE,
  description: CONFUSING_WORDS_DESCRIPTION,
  label: "GRE",
  storageKey: "confusing-words:last-pair"
};

export const GENERAL_WORD_COLLECTION = {
  path: "/english/general/confusing-words",
  title: "General English Confusing Words: Vocabulary Practice | Bumblebee",
  description: "Practice commonly confused English words with contextual sentences, IPA pronunciations, instant feedback, and explanatory notes.",
  label: "General English",
  storageKey: "general-confusing-words:last-pair"
};

/** Returns a collection-specific path; e.g. door-doorway stays under `/english/general/confusing-words`. */
export function getConfusingWordPath(slug: string, collection = GRE_WORD_COLLECTION) {
  return `${collection.path}/${encodeURIComponent(slug)}`;
}

/** Creates matching server/client metadata; e.g. `door vs doorway: General English Vocabulary Practice | Bumblebee`. */
export function getConfusingWordMetadata(pair: ConfusingWordPair, collection = GRE_WORD_COLLECTION) {
  const words = pair.words.join(" vs ");
  return {
    title: `${words}: ${collection.label} Vocabulary Practice | Bumblebee`,
    description: `Compare ${pair.words.join(", ")} with IPA pronunciations, contextual practice sentences, instant feedback, and available study notes.`,
    canonical: `https://bumblebee.work${getConfusingWordPath(pair.slug, collection)}`
  };
}
