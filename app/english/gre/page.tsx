import { permanentRedirect } from "next/navigation";

/** Preserves the former section link; e.g. /english/gre redirects directly to /english. */
export default function LegacyEnglishPage() {
  permanentRedirect("/english");
}
