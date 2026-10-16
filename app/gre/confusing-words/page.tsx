import { redirect } from "next/navigation";

/**
 * Preserves links to the former GRE practice page.
 *
 * Example: `/gre/confusing-words` redirects to `/english/gre/confusing-words`.
 */
export default function GreConfusingWordsPage() {
  redirect("/english/gre/confusing-words");
}
