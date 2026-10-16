import { SectionNav } from "@/components/SectionNav";

/**
 * Renders the GRE section navigation with an empty page body.
 *
 * Example: `/english/gre` lists Confusing Words in its sidebar without adding a sidebar to practice pages.
 */
export default function GrePage() {
  return (
    <main className="section-layout">
      <SectionNav
        title="GRE"
        href="/english/gre"
        items={[{ href: "/english/gre/confusing-words", label: "Confusing Words" }]}
      />
      <div className="section-content" />
    </main>
  );
}
