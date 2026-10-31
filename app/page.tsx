import { redirect } from "next/navigation";

/**
 * Sends homepage visitors directly to Confusing Words practice.
 *
 * Example: visiting `/` opens the unified `/english/confusing-words` collection.
 */
export default function HomePage() {
  redirect("/english/confusing-words");
}
