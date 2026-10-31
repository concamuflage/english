import { permanentRedirect } from "next/navigation";

/** Preserves the former General URL; e.g. /english/general/commonly-mispronounced-words now opens /english/commonly-mispronounced-words. */
export default function LegacyGeneralTopicPage() {
  permanentRedirect("/english/commonly-mispronounced-words");
}
