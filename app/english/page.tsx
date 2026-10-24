import { SectionNav } from "@/components/SectionNav";

/**
 * Lists the English blog sections without placeholder article content.
 *
 * Example: `/english` offers General and GRE entries in the reusable left navigation.
 */
export default function EnglishPage() {
  return (
    <main className="section-layout">
      <SectionNav
        title="English"
        href="/english"
        items={[
          { href: "/english/general", label: "General" },
          { href: "/english/gre", label: "GRE" }
        ]}
      />
      <div className="section-content" />
    </main>
  );
}
