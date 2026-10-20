import type { ConfusingWordPair } from "@/lib/confusingWords";

export const CONFUSING_WORDS_PATH = "/english/gre/confusing-words";
export const CONFUSING_WORDS_TITLE = "GRE Confusing Words: Free Vocabulary Practice | Bumblebee";
export const CONFUSING_WORDS_DESCRIPTION = "Practice commonly confused GRE words with contextual sentences, IPA pronunciations, instant feedback, and notes explaining the differences.";

/** Returns a group's permanent path; e.g. factitious-facetious becomes `/english/gre/confusing-words/factitious-facetious`. */
export function getConfusingWordPath(slug: string) {
  return `${CONFUSING_WORDS_PATH}/${encodeURIComponent(slug)}`;
}

/** Creates matching server/client metadata; e.g. `factitious vs facetious: GRE Vocabulary Practice | Bumblebee`. */
export function getConfusingWordMetadata(pair: ConfusingWordPair) {
  const words = pair.words.join(" vs ");
  return {
    title: `${words}: GRE Vocabulary Practice | Bumblebee`,
    description: `Compare ${pair.words.join(", ")} with IPA pronunciations, contextual practice sentences, instant feedback, and available study notes.`,
    canonical: `https://bumblebee.work${getConfusingWordPath(pair.slug)}`
  };
}
