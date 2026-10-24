import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "General English | Bumblebee",
  description: "General English notes on the bumblebee's blog.",
  alternates: { canonical: "https://bumblebee.work/english/general" },
  // Keep the empty section out of search results until it contains published notes.
  robots: { index: false, follow: true }
};

/**
 * Reserves the General English section without adding placeholder content.
 *
 * Example: `/english/general` lists Confusing Words, Commonly Mispronounced Words,
 * and Uncommon meaning of common words,
 * with an empty body and a sidebar link back to `/english`.
 */
export default function GeneralEnglishPage() {
  return (
    <main className="section-layout">
      <SectionNav
        title="General"
        href="/english/general"
        parent={{ href: "/english", label: "English" }}
        items={[
          { href: "/english/general/confusing-words", label: "Confusing Words" },
          { href: "/english/general/commonly-mispronounced-words", label: "Commonly Mispronounced Words" },
          { href: "/english/general/uncommon-meaning-of-common-words", label: "Uncommon meaning of common words" }
        ]}
      />
      <div className="section-content" />
    </main>
  );
}
