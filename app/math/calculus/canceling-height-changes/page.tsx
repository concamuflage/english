import type { Metadata } from "next";
import { TangentPlanePlot } from "@/components/TangentPlanePlot";

export const metadata: Metadata = {
  title: "Total estimated height change = estimated height change from Δx + estimated height change from Δy | Bumblebee",
  description: "Rotate a 3D tangent-plane construction to see how equal and opposite height contributions cancel, while the actual surface still rises by 0.18.",
  alternates: { canonical: "https://bumblebee.work/math/calculus/canceling-height-changes" }
};

/**
 * Publishes test.py's cancellation construction with its original angle/height legend and separate conclusion.
 * Example: +0.3 and −0.3 cancel in the tangent approximation while f(0.8, 0.2) − f(0.5, 0.5) = 0.18.
 * The title states that the total estimate is the sum of the Δx and Δy contributions.
 * The introduction explains the two contributions and offers a Python download for programming or vibe coding other cases.
 * The title aligns the Δx and Δy contributions on separate rows, with + ending the first term's row.
 * The explanation occupies the left column; the plot, adjacent legend, and conclusion below occupy the right.
 */
export default function CancelingHeightChangesPage() {
  return (
    <main className="section-band tangent-page">
      <h1 className="section-page-title height-change-title">
        <span className="height-title-total">Total estimated height change</span>
        <span className="height-title-equals">=</span>
        <span className="height-title-x">estimated height change from Δx +</span>
        <span className="height-title-y">estimated height change from Δy</span>
      </h1>
      <div className="tangent-article-columns">
        <div>
          <div className="calculus-post-introduction">
            <p>You may have come across the following formula and wondered what it means geometrically:</p>
            <p className="proof-equation">Estimated height change = f<sub>x</sub>(a, b)Δx + f<sub>y</sub>(a, b)Δy</p>
            <p>You’re in the right place. This page visualizes an example in which the two terms cancel each other, so the estimated height change is 0. In general, each term can independently be positive, negative, or zero.</p>
            <p>If you’re interested and know how to program or vibe code, you can <a href="/downloads/tangent-plane-height-changes.py" download>download the Python script</a> and explore different cases yourself by changing the starting point and the increments Δx and Δy. The script requires Python with NumPy, Matplotlib, and Tkinter.</p>
          </div>
        </div>
        <section className="tangent-visualization" aria-labelledby="cancellation-plot-title">
          <h2 id="cancellation-plot-title">Visualization (Drag to rotate)</h2>
          <TangentPlanePlot dataPath="/plots/canceling-height-changes.json" />
          <section className="calculus-post-conclusion" aria-labelledby="cancellation-conclusion-title">
            <h3 id="cancellation-conclusion-title">Conclusion: height change = 0</h3>
            <p>The orange and green vectors have equal heights (0.3) and opposite directions. Their height contributions cancel, so the tangent plane predicts no height increase. The actual surface rises by 0.18.</p>
          </section>
        </section>
      </div>
    </main>
  );
}
