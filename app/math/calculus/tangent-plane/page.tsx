import type { Metadata } from "next";
import Link from "next/link";
import { TangentPlanePlot } from "@/components/TangentPlanePlot";
import { TangentPlaneProof } from "@/components/TangentPlaneProof";

export const metadata: Metadata = {
  title: "Tangent Plane: Two Steps and Approximation Error | Bumblebee",
  description: "Prove that tangent-plane approximation error is the sum of two signed step errors, then explore a rotatable 3D plot of z = x² + y².",
  alternates: { canonical: "https://bumblebee.work/math/calculus/tangent-plane" }
};

/**
 * Introduces the article's purpose, then lets the proof flow beside and below the interactive plot.
 * Example: the plot illustrates how the step errors add up: 0.09 + 0.09 = 0.18.
 * The introduction spans the page; proof text expands to full width after the right-hand plot's divider ends.
 * The legend remains beside the plot, and phones stack the proof above the visualization.
 * The introduction uses actual minus estimated error (+0.09 + +0.09 = +0.18) and links to test2.py's download.
 * Readers can first follow the prerequisite link to the Δx/Δy height-contribution visualization.
 */
export default function TangentPlanePage() {
  return (
    <main className="section-band tangent-page tangent-flow-page">
      <h1 className="section-page-title">Tangent Plane: Two Steps and Approximation Error</h1>
      <div className="calculus-post-introduction">
        <p>Before reading this article, you should already understand the geometric meaning of f<sub>x</sub>(a, b)Δx and f<sub>y</sub>(a, b)Δy. If not, read <Link href="/math/calculus/canceling-height-changes">the visualization of the sum of estimated height changes</Link> first.</p>
        <p>This article visualizes how the total error in a tangent-plane linear approximation equals the sum of the errors from each coordinate step. In the visualized example, both errors are positive, so the total error is positive too. In general, the first-step error and second-step error can each be positive, negative, or zero.</p>
        <p>If you’re interested, you can <a href="/downloads/tangent-plane-step-errors.py" download>download the Python script</a> and tinker with it through vibe coding.</p>
      </div>
      <div className="tangent-flow-content">
        <section className="tangent-visualization" aria-labelledby="tangent-visualization-title">
          <h2 id="tangent-visualization-title">Visualization: the total error is the sum of the two step errors (Drag to rotate)</h2>
          <TangentPlanePlot />
        </section>
        <TangentPlaneProof />
      </div>
    </main>
  );
}
