import { redirect } from "next/navigation";

/**
 * Redirects the old confusing words route into the GRE section.
 *
 * Example: `/confusing-words` redirects to `/gre/confusing-words`.
 */
export default function ConfusingWordsPage() {
  redirect("/gre/confusing-words");
}
