import { redirect } from "next/navigation";

/**
 * Sends homepage visitors directly to Confusing Words practice.
 *
 * Example: visiting `/` opens `/english/gre/confusing-words`.
 */
export default function HomePage() {
  redirect("/english/gre/confusing-words");
}
