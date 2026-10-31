import { ConfusingWordsPractice } from "@/components/ConfusingWordsPractice";
import { confusingWordPairs, type ConfusingWordPair } from "@/lib/confusingWords";
import { ENGLISH_WORD_COLLECTION } from "@/lib/confusingWordRoutes";

/**
 * Shares the existing practice layout between the collection and permanent group URLs.
 * Example: initialSlug `factitious-facetious` exports that group's card, IPA, sentences, and notes in HTML.
 * Former GRE and General pairs share one alphabetized English collection, including door/doorway.
 */
export function ConfusingWordsPage({ initialSlug, pairs = confusingWordPairs, collection = ENGLISH_WORD_COLLECTION }: {
  initialSlug?: string;
  pairs?: ConfusingWordPair[];
  collection?: typeof ENGLISH_WORD_COLLECTION;
}) {
  return (
    <main className="section-band confusing-words-page">
      <h1 className="section-page-title">{collection.label} Confusing Words Practice</h1>
      <aside className="practice-introduction" aria-label="About this word-pair collection">
        <p>
          If you already know the difference, feel free to skip the pair.
        </p>
        <p>
          If you spot a mistake or would like to suggest another pair, please feel free to send me an email.
        </p>
      </aside>
      <ConfusingWordsPractice pairs={pairs} initialSlug={initialSlug} collection={collection} />
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
