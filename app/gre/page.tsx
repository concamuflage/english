import { redirect } from "next/navigation";

/**
 * Preserves links to the former top-level GRE page.
 *
 * Example: `/gre` redirects to `/english/gre`.
 */
export default function GrePage() {
  redirect("/english/gre");
}
