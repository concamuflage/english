import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Math | Bumblebee",
  description: "Explore mathematics through interactive calculus plots.",
  alternates: { canonical: "https://bumblebee.work/math" }
};

/** Lists mathematical subjects; for example, Calculus opens `/math/calculus`. */
export default function MathPage() {
  return <main className="section-layout"><SectionNav title="Math" href="/math" items={[{ href: "/math/calculus", label: "Calculus" }]} /><div className="section-content"><h1 className="section-page-title">Math</h1></div></main>;
}
