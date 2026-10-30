"use client";

import Link from "next/link";
import { useState } from "react";

type Answer = "intermediate" | "original";

/**
 * Turns the supplied handwritten question into two accessible formula choices.
 * The fixed tangent plane uses fy(a, b), so selecting `original` is correct.
 * Example: for f(x, y) = xy at (1, 2), Δx = 0.5 and Δy = 0.2 give a second-step error of 0.1.
 * Feedback appears only after a choice; Try again clears both the choice and its explanation.
 * Explains why the original plane's y-slope remains fy(a, b) after moving to (a + Δx, b).
 */
export function SecondStepErrorPractice() {
  const [selection, setSelection] = useState<Answer | null>(null);
  const correct = selection === "original";

  /** Clears the answer so, for example, a previously incorrect first choice can be attempted again. */
  function resetAnswer() {
    setSelection(null);
  }

  return (
    <section className="calculus-question" aria-labelledby="second-step-question">
      <p>Suppose we start at (a, b) and use the tangent plane at (a, b) to approximate f(a + Δx, b + Δy). We move in two coordinate steps:</p>
      <ol className="calculus-question-steps">
        <li><span className="calculus-math">(a, b) → (a + Δx, b)</span></li>
        <li><span className="calculus-math">(a + Δx, b) → (a + Δx, b + Δy)</span></li>
      </ol>
      <p>Define error as <strong>actual height change − estimated height change</strong>.</p>
      <h2 id="second-step-question">Which formula gives the error in Step 2?</h2>
      <fieldset className="calculus-answer-list" aria-describedby="second-step-question">
        <legend>Choose one formula</legend>
        {(["intermediate", "original"] as const).map((answer, index) => (
          <label
            className={`calculus-answer-option${selection === answer ? (correct ? " calculus-answer-correct" : " calculus-answer-wrong") : ""}`}
            key={answer}
          >
            <input
              type="radio"
              name="second-step-error"
              value={answer}
              checked={selection === answer}
              onChange={() => setSelection(answer)}
            />
            <span>
              <strong className="calculus-answer-number">Option {index + 1}</strong>
              <span className="calculus-math calculus-answer-formula">
                f(a + Δx, b + Δy) − f(a + Δx, b) − f<sub>y</sub>({answer === "original" ? "a, b" : "a + Δx, b"})Δy
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="calculus-answer-feedback" role="status" aria-live="polite">
        {selection !== null && (
          <>
            <p className={correct ? "calculus-feedback-correct" : "calculus-feedback-wrong"}>
              <strong>{correct ? "✓ Correct. Option 2 uses the original tangent plane." : "! Not quite. Option 2 is correct."}</strong>
            </p>
            <p>The tangent plane stays fixed at (a, b), so its estimated height change in Step 2 is <span className="calculus-math">f<sub>y</sub>(a, b)Δy</span>. The actual height change is <span className="calculus-math">f(a + Δx, b + Δy) − f(a + Δx, b)</span>.</p>
            <p>Using <span className="calculus-math">f<sub>y</sub>(a + Δx, b)</span> instead would use the surface’s slope at the intermediate point.</p>
            <p>The original tangent plane is flat, so its y-slope is <span className="calculus-math">f<sub>y</sub>(a, b)</span> everywhere, including at the intermediate point. Constructing a new tangent plane to the surface at <span className="calculus-math">(a + Δx, b)</span> would switch to a new local approximation. Here, we want the error of the <strong>same original tangent plane</strong> over both steps.</p>
            <p><Link href="/math/calculus/tangent-plane">Review the proof and visualization</Link></p>
            <button className="practice-next-button" type="button" onClick={resetAnswer}>Try again</button>
          </>
        )}
      </div>
    </section>
  );
}
