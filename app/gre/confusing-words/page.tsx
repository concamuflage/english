import { permanentRedirect } from "next/navigation";

/** Preserves the former section link; e.g. /gre/confusing-words redirects directly to /english/confusing-words. */
export default function LegacyEnglishPage() {
  permanentRedirect("/english/confusing-words");
}
