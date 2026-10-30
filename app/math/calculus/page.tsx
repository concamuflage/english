import type { Metadata } from "next";
import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Calculus | Bumblebee",
  description: "Interactive calculus plots, including a tangent plane and its approximation error.",
  alternates: { canonical: "https://bumblebee.work/math/calculus" }
};

/** Lists calculus posts; e.g. the total-estimated-height-change post shows +0.3 and −0.3 contributions. */
export default function CalculusPage() {
  return (
    <main className="section-layout">
      <SectionNav title="Calculus" href="/math/calculus" parent={{ href: "/math", label: "Math" }} items={[]} />
      <div className="section-content">
        <h1 className="section-page-title">Calculus</h1>
        <article className="article-card"><h2><Link href="/math/calculus/tangent-plane">Tangent Plane: Two Steps and Approximation Error</Link></h2></article>
        <article className="article-card"><h2><Link href="/math/calculus/canceling-height-changes">Total estimated height change = estimated height change from Δx + estimated height change from Δy</Link></h2></article>
      </div>
    </main>
  );
}
