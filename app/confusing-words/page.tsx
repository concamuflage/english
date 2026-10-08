import { ConfusingWordsPractice } from "@/components/ConfusingWordsPractice";
import { confusingWordPairs } from "@/lib/confusingWords";

/**
 * Renders the Confusing Words blog page and practice cards.
 *
 * Example: learners can select `coma / comma` from the list and answer fill-in-the-blank flashcards.
 */
export default function ConfusingWordsPage() {
  return (
    <main>
      <section className="subpage-hero">
        <p className="eyebrow">Confusing words</p>
        <h1>Practice word pairs that look or sound dangerously close.</h1>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pair practice</p>
            <h2>Choose a pair to start</h2>
          </div>
        </div>
        <ConfusingWordsPractice pairs={confusingWordPairs} />
      </section>
    </main>
  );
}
