"use client";

import { useState } from "react";

/**
 * Asks whether existing partial derivatives guarantee a tangent plane, without revealing the answer initially.
 * Example: selecting No shows correct feedback; Try again returns to the unanswered Yes/No choices.
 */
export function TangentPlaneExistenceQuiz() {
  const [selection, setSelection] = useState<"Yes" | "No" | null>(null);
  const correct = selection === "No";

  return (
    <section className="calculus-question" aria-labelledby="tangent-plane-existence-question">
      <h2 id="tangent-plane-existence-question">If the partial derivatives of f(x, y) exist at (a, b), then a tangent plane to the surface z = f(x, y) exists at (a, b).</h2>
      <fieldset className="calculus-answer-list">
        <legend>Is this statement true? Choose Yes or No.</legend>
        {(["Yes", "No"] as const).map((answer) => (
          <label
            className={`calculus-answer-option${selection === answer ? (correct ? " calculus-answer-correct" : " calculus-answer-wrong") : ""}`}
            key={answer}
          >
            <input
              type="radio"
              name="tangent-plane-existence"
              value={answer}
              checked={selection === answer}
              onChange={() => setSelection(answer)}
            />
            <span>{answer}</span>
          </label>
        ))}
      </fieldset>
      <div className="calculus-answer-feedback" role="status" aria-live="polite">
        {selection !== null && (
          <>
            <p className={correct ? "calculus-feedback-correct" : "calculus-feedback-wrong"}>
              <strong>{correct ? "✓ Correct. The answer is No." : "! Not quite. The answer is No."}</strong>
            </p>
            <p>Partial derivatives describe slopes in the two coordinate directions. Their existence alone does not guarantee that a single tangent plane approximates the surface in every direction.</p>
            <p><a href="https://openstax.org/books/calculus-volume-3/pages/4-4-tangent-planes-and-linear-approximations">Read about tangent planes and differentiability in OpenStax.</a></p>
            <button className="practice-next-button" type="button" onClick={() => setSelection(null)}>Try again</button>
          </>
        )}
      </div>
    </section>
  );
}
