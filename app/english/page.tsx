import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "English Vocabulary and Pronunciation Practice | Bumblebee",
  description: "Explore confusing words, American English pronunciation, uncommon meanings, misleading word forms, and meanings in context in one English section.",
  alternates: { canonical: "https://bumblebee.work/english" }
};

/**
 * Lists every vocabulary topic directly under English instead of separate GRE and General branches.
 * Example: Confusing Words opens `/english/confusing-words`, where coma/comma and door/doorway share one list.
 */
export default function EnglishPage() {
  return (
    <main className="section-layout">
      <SectionNav
        title="English"
        href="/english"
        items={[
          { href: "/english/confusing-words", label: "Confusing Words" },
          { href: "/english/commonly-mispronounced-words", label: "Commonly Mispronounced Words" },
          { href: "/english/uncommon-meaning-of-common-words", label: "Uncommon meaning of common words" },
          { href: "/english/words-that-look-misleading", label: "Words That Look Misleading" },
          { href: "/english/words-whose-meaning-depends-on-context", label: "Words Whose Meaning Depends on Context" }
        ]}
      />
      <div className="section-content">
        <h1 className="section-page-title">English</h1>
        <p>Vocabulary, pronunciation, and meaning in context.</p>
      </div>
    </main>
  );
}
