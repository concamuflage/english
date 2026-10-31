import { permanentRedirect } from "next/navigation";

/** Preserves the former General URL; e.g. /english/general/uncommon-meaning-of-common-words now opens /english/uncommon-meaning-of-common-words. */
export default function LegacyGeneralTopicPage() {
  permanentRedirect("/english/uncommon-meaning-of-common-words");
}
