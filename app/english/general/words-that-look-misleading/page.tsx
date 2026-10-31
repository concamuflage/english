import { permanentRedirect } from "next/navigation";

/** Preserves the former General URL; e.g. /english/general/words-that-look-misleading now opens /english/words-that-look-misleading. */
export default function LegacyGeneralTopicPage() {
  permanentRedirect("/english/words-that-look-misleading");
}
