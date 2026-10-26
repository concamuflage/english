import type { Metadata } from "next";
import { MisleadingWordsPractice } from "@/components/MisleadingWordsPractice";

export const metadata: Metadata = {
  title: "Words That Look Misleading | Bumblebee",
  description: "Practice English words whose appearance can suggest the wrong meaning, starting with spendthrift: someone who spends money wastefully.",
  alternates: { canonical: "https://bumblebee.work/english/general/words-that-look-misleading" }
};

/**
 * Practices meanings that can be misread from familiar-looking word parts.
 *
 * Example: the spendthrift question offers `thrifty` and `not thrifty`;
 * its prompt, `Daniel is a spendthrift. This means he is ____.`, gives no definition hint.
 * Answering shows the standard correct/incorrect indicator; mnemonics stay inside the collapsible Note.
 * A word list selects the exercise, with a side-by-side card on desktop and a dialog on mobile.
 */
export default function MisleadingWordFormsPage() {
  return (
    <main className="section-band">
      <h1 className="section-page-title">Words That Look Misleading</h1>
      <p>Words whose roots, spelling, or familiar-looking parts can lead you to guess the wrong meaning.</p>
      <MisleadingWordsPractice />
    </main>
  );
}
