import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";
import { TangentPlaneExistenceQuiz } from "@/components/TangentPlaneExistenceQuiz";

export const metadata: Metadata = {
  title: "Tangent Plane Existence Quiz | Calculus | Bumblebee",
  description: "A Yes/No calculus quiz: does the existence of partial derivatives at a point guarantee a tangent plane?",
  alternates: { canonical: "https://bumblebee.work/math/calculus/practices/tangent-plane-existence" }
};

/** Shows the Yes/No question directly, without a separate quiz heading, at `/math/calculus/practices/tangent-plane-existence`. */
export default function TangentPlaneExistenceQuizPage() {
  return (
    <main className="section-layout">
      <SectionNav
        title="Calculus"
        href="/math/calculus"
        parent={{ href: "/math", label: "Math" }}
        items={[
          { href: "/math/calculus#blogs", label: "Blogs" },
          { href: "/math/calculus#practices", label: "Practices" }
        ]}
      />
      <div className="section-content">
        <TangentPlaneExistenceQuiz />
      </div>
    </main>
  );
}
