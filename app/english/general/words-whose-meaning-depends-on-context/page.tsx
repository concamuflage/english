import { permanentRedirect } from "next/navigation";

/** Preserves the former General URL; e.g. /english/general/words-whose-meaning-depends-on-context now opens /english/words-whose-meaning-depends-on-context. */
export default function LegacyGeneralTopicPage() {
  permanentRedirect("/english/words-whose-meaning-depends-on-context");
}
