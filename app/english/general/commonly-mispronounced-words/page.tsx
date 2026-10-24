import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commonly Mispronounced Words | Bumblebee",
  description: "Practice commonly mispronounced English words. Reveal the IPA pronunciation for words such as plaid.",
  alternates: { canonical: "https://bumblebee.work/english/general/commonly-mispronounced-words" }
};

/**
 * Lists pronunciation disclosures with IPA initially hidden beneath each word.
 *
 * Example: clicking or keyboard-activating `plaid` reveals `/plæd/`; activating it again hides the IPA.
 */
export default function CommonlyMispronouncedWordsPage() {
  return (
    <main className="section-band">
      <h1 className="section-page-title">Commonly Mispronounced Words</h1>
      <div className="pronunciation-word-list">
        <details className="pronunciation-word">
          <summary>plaid</summary>
          <p lang="en-fonipa">/plæd/</p>
        </details>
      </div>
    </main>
  );
}
