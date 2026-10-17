import { ConfusingWordsPractice } from "@/components/ConfusingWordsPractice";
import { confusingWordPairs } from "@/lib/confusingWords";

/**
 * Renders word-pair practice inside English's GRE section.
 *
 * Example: `/english/gre/confusing-words` shows a personal introduction above the word-pair list and practice card.
 * An IPA reference below the practice area links to the source wordlist and dictionary references.
 */
export default function GreConfusingWordsPage() {
  return (
    <main className="section-band confusing-words-page">
      <aside className="practice-introduction" aria-label="About this word-pair collection">
        <p>
          I compiled this list while studying for the GRE. If you already know the difference, feel free to skip the pair.
        </p>
        <p>
          If you spot a mistake or would like to suggest another pair, please feel free to send me an email.
        </p>
      </aside>
      <ConfusingWordsPractice pairs={confusingWordPairs} />
      <footer className="pronunciation-references" aria-label="IPA references">
        <p>
          IPA references: primarily adapted from the General American wordlist in{" "}
          <a href="https://github.com/open-dict-data/ipa-dict">open-dict-data/ipa-dict</a>,
          with selected pronunciations checked against{" "}
          <a href="https://www.dictionary.com/">Dictionary.com</a> and{" "}
          <a href="https://dictionary.cambridge.org/">Cambridge Dictionary</a>.
        </p>
      </footer>
    </main>
  );
}
