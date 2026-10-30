import type { Metadata } from "next";
import { SectionNav } from "@/components/SectionNav";
import { SecondStepErrorPractice } from "@/components/SecondStepErrorPractice";

export const metadata: Metadata = {
  title: "Second-Step Error Practice | Calculus | Bumblebee",
  description: "Test which partial derivative belongs in the second-step error formula when using a tangent plane for linear approximation.",
  alternates: { canonical: "https://bumblebee.work/math/calculus/practices/second-step-error" }
};

/** Publishes the handwritten two-choice exercise; e.g. Option 2 evaluates fy at the original point (a, b). */
export default function SecondStepErrorPracticePage() {
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
        <h1 className="section-page-title">Practice: the second-step error</h1>
        <SecondStepErrorPractice />
      </div>
    </main>
  );
}
