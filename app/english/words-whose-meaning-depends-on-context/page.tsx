import type { Metadata } from "next";
import { ContextDependentWordsPractice } from "@/components/ContextDependentWordsPractice";

export const metadata: Metadata = {
  title: "Words Whose Meaning Depends on Context | Bumblebee",
  description: "Match examples of ingenuous and sloppy with meanings that fit their context.",
  alternates: { canonical: "https://bumblebee.work/english/words-whose-meaning-depends-on-context" }
};

/**
 * Practices context-sensitive meanings using complete sentences rather than fill-in-the-blank prompts.
 * Example: the missed-meeting sentence pairs with "frank"; the salesman sentence pairs with "naive, overly trusting".
 * A word list selects the exercise: for example, ingenuous opens beside it on desktop and in a dialog on mobile.
 * User-supplied examples pair with their meanings; e.g. sloppy work means work done carelessly, with mistakes.
 */
export default function ContextDependentMeaningsPage() {
  return (
    <main className="section-band">
      <h1 className="section-page-title">Words Whose Meaning Depends on Context</h1>
      <p>Words whose meaning depends heavily on the sentence or situation in which they are used.</p>
      <ContextDependentWordsPractice />
    </main>
  );
}
