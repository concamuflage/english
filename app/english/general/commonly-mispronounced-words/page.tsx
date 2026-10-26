import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commonly Mispronounced Words | Bumblebee",
  description: "Practice commonly mispronounced words in American English. Reveal IPA pronunciations for plaid, presumptuous, presume, and herb.",
  alternates: { canonical: "https://bumblebee.work/english/general/commonly-mispronounced-words" }
};

/**
 * Lists pronunciation disclosures with IPA initially hidden beneath each word.
 *
 * Example: clicking or keyboard-activating `plaid` reveals `/plæd/`; activating it again hides the IPA.
 * An introductory note identifies American English as the pronunciation standard.
 * Only US readings are shown; for example, `herb` reveals `/ɝːb/` with a silent h.
 */
export default function CommonlyMispronouncedWordsPage() {
  return (
    <main className="section-band">
      <h1 className="section-page-title">Commonly Mispronounced Words</h1>
      <p>The pronunciations in this section are based on American English.</p>
      <div className="pronunciation-word-list">
        <details className="pronunciation-word">
          <summary>plaid</summary>
          <p lang="en-fonipa">/plæd/</p>
        </details>
        <details className="pronunciation-word">
          <summary>presumptuous</summary>
          <p>US: <span lang="en-fonipa">/prɪˈzʌmp.tʃuː.əs/</span></p>
        </details>
        <details className="pronunciation-word">
          <summary>presume</summary>
          <p>US: <span lang="en-fonipa">/prɪˈzuːm/</span></p>
        </details>
        <details className="pronunciation-word">
          <summary>herb</summary>
          <p>US: <span lang="en-fonipa">/ɝːb/</span> (silent h)</p>
        </details>
      </div>
    </main>
  );
}
