import { redirect } from "next/navigation";

/**
 * Redirects the old confusing words route into the GRE section.
 *
 * Example: `/confusing-words` redirects to `/english/gre/confusing-words`.
 */
export default function ConfusingWordsPage() {
  redirect("/english/gre/confusing-words");
}
