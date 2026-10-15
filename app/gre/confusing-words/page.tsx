import { ConfusingWordsPractice } from "@/components/ConfusingWordsPractice";
import { confusingWordPairs } from "@/lib/confusingWords";

/**
 * Renders the GRE confusing words practice section.
 *
 * Example: learners can select `coma / comma` and answer fill-in-the-blank practice cards.
 */
export default function GreConfusingWordsPage() {
  return (
    <main>
      <section className="section-band">
        <ConfusingWordsPractice pairs={confusingWordPairs} />
      </section>
    </main>
  );
}
