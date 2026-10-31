import type { ConfusingWordPair } from "@/lib/confusingWords";

export const CONFUSING_WORDS_PATH = "/english/confusing-words";
export const CONFUSING_WORDS_TITLE = "English Confusing Words: Free Vocabulary Practice | Bumblebee";
export const CONFUSING_WORDS_DESCRIPTION = "Practice commonly confused English words with contextual sentences, IPA pronunciations, instant feedback, and notes explaining the differences.";

export const ENGLISH_WORD_COLLECTION = {
  path: CONFUSING_WORDS_PATH,
  title: CONFUSING_WORDS_TITLE,
  description: CONFUSING_WORDS_DESCRIPTION,
  label: "English",
  // Retain the original storage key; e.g. an existing coma-comma selection survives the section merge.
  storageKey: "confusing-words:last-pair"
};

/** Returns the shared English path; e.g. door-doorway becomes `/english/confusing-words/door-doorway`. */
export function getConfusingWordPath(slug: string, collection = ENGLISH_WORD_COLLECTION) {
  return `${collection.path}/${encodeURIComponent(slug)}`;
}

/** Creates matching server/client metadata; e.g. `door vs doorway: English Vocabulary Practice | Bumblebee`. */
export function getConfusingWordMetadata(pair: ConfusingWordPair, collection = ENGLISH_WORD_COLLECTION) {
  const words = pair.words.join(" vs ");
  return {
    title: `${words}: ${collection.label} Vocabulary Practice | Bumblebee`,
    description: `Compare ${pair.words.join(", ")} with IPA pronunciations, contextual practice sentences, instant feedback, and available study notes.`,
    canonical: `https://bumblebee.work${getConfusingWordPath(pair.slug, collection)}`
  };
}
