import { Fragment, type ReactNode } from "react";

type EquationRow = { left?: ReactNode; operator?: string; right: ReactNode };

/** Renders a borderless equation with aligned operators; e.g. a second subtraction stays beneath the equals sign in the narrow column. */
function Equation({ rows }: { rows: EquationRow[] }) {
  return (
    <div className="proof-equation">
      <div className="proof-equation-grid">
        {rows.map((row, index) => (
          <Fragment key={index}>
            {row.left && <span className="proof-eq-left">{row.left}</span>}
            <span className="proof-eq-operator">{row.operator}</span>
            <span className="proof-eq-right">{row.right}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** Adds a curly underbrace and explanation; e.g. f(end) − f(start) is the total real height change. */
function Term({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span className="proof-term">
      <span>{children}</span>
      <svg className="proof-underbrace" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M 1 1 Q 1 6 6 6 H 44 Q 50 6 50 11 Q 50 6 56 6 H 94 Q 99 6 99 1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="proof-term-label">{label}</span>
    </span>
  );
}

/**
 * Presents the supplied error-decomposition proof before the interactive construction.
 * Both estimated steps use derivatives at (a, b); for example, the plotted errors are 0.09 + 0.09 = 0.18.
 * Left-aligned equation grids preserve equality and continuation columns, with mobile wrapping.
 * An Intuition heading introduces the two-journey explanation after the proof.
 * The sum uses the shared equation layout, so its two braced errors wrap inside a 412px phone viewport.
 * Matching intermediate values f(a + Δx, b) are crossed out directly in the rearranged equation.
 * All equations are unboxed, including E_total = E_step 1 + E_step 2.
 */
export function TangentPlaneProof() {
  return (
    <section className="tangent-proof" aria-labelledby="error-proof-title">
      <h2 id="error-proof-title">Proof: the total error is the sum of the two step errors</h2>
      <p>We start with the total error of the linear approximation at (<i>a</i>, <i>b</i>):</p>
      <Equation rows={[
        { left: <>E<sub>total</sub></>, operator: "=", right: <Term label="total real height change">[f(a + Δx, b + Δy) − f(a, b)]</Term> },
        { operator: "−", right: <Term label="total estimated height change">[f<sub>x</sub>(a, b)Δx + f<sub>y</sub>(a, b)Δy]</Term> }
      ]} />
      <p>The first bracket is the total real height change; the second is the total estimated height change. We want to prove:</p>
      <Equation rows={[{ left: <>E<sub>total</sub></>, operator: "=", right: <>E<sub>step 1</sub> + E<sub>step 2</sub></> }]} />

      <h3>1. Divide the movement into two steps</h3>
      <p>Instead of moving directly from (a, b) to (a + Δx, b + Δy), change x first, then y:</p>
      <Equation rows={[{ right: <Term label="Step 1: change x">(a, b) → (a + Δx, b)</Term> }]} />
      <Equation rows={[{ right: <Term label="Step 2: change y">(a + Δx, b) → (a + Δx, b + Δy)</Term> }]} />

      <h3>2. Define the error of each step</h3>
      <p><strong>Step 1:</strong> Change x while keeping y = b. Subtract the estimated height change from the real height change:</p>
      <Equation rows={[
        { left: <>E<sub>step 1</sub></>, operator: "=", right: <Term label="real height change in step 1">[f(a + Δx, b) − f(a, b)]</Term> },
        { operator: "−", right: <Term label="estimated height change in step 1">f<sub>x</sub>(a, b)Δx</Term> }
      ]} />
      <p><strong>Step 2:</strong> Change y while keeping x = a + Δx:</p>
      <Equation rows={[
        { left: <>E<sub>step 2</sub></>, operator: "=", right: <Term label="real height change in step 2">[f(a + Δx, b + Δy) − f(a + Δx, b)]</Term> },
        { operator: "−", right: <Term label="estimated height change in step 2">f<sub>y</sub>(a, b)Δy</Term> }
      ]} />
      <p className="proof-original-point">Both estimated changes use the partial derivatives at the <strong>original point (a, b)</strong>. This is important because we are proving the error formula for the linear approximation at that point.</p>

      <h3>3. Add the two step errors</h3>
      <Equation rows={[
        { left: <>E<sub>step 1</sub> + E<sub>step 2</sub></>, operator: "=", right: <>{"{"}[f(a + Δx, b) − f(a, b)] − f<sub>x</sub>(a, b)Δx{"}"}</> },
        { operator: "+", right: <>{"{"}[f(a + Δx, b + Δy) − f(a + Δx, b)] − f<sub>y</sub>(a, b)Δy{"}"}</> }
      ]} />
      <p>Rearrange the terms:</p>
      <Equation rows={[
        { operator: "=", right: <><span className="proof-cancelled-term">f(a + Δx, b)</span> − f(a, b)</> },
        { operator: "+", right: <>f(a + Δx, b + Δy) − <span className="proof-cancelled-term">f(a + Δx, b)</span></> },
        { operator: "−", right: <>f<sub>x</sub>(a, b)Δx − f<sub>y</sub>(a, b)Δy</> }
      ]} />
      <p>So we obtain:</p>
      <Equation rows={[
        { left: <>E<sub>step 1</sub> + E<sub>step 2</sub></>, operator: "=", right: <Term label="total real height change">[f(a + Δx, b + Δy) − f(a, b)]</Term> },
        { operator: "−", right: <Term label="total estimated height change">[f<sub>x</sub>(a, b)Δx + f<sub>y</sub>(a, b)Δy]</Term> },
        { operator: "=", right: <>E<sub>total</sub></> }
      ]} />
      <p><strong>The key insight:</strong> The two real height changes add up to the total real height change, and the two estimated height changes add up to the total estimated height change. Consequently, the two signed errors also add up to the total signed error.</p>
      <h3>Intuition</h3>
      <p>Imagine making the journey twice: once along the surface and once using the tangent plane. Both journeys start at the same height.</p>
      <ul>
        <li>After Step 1, their heights differ by the <strong>first step error</strong>.</li>
        <li>During Step 2, the difference between their height changes adds the <strong>second step error</strong> to that existing separation.</li>
      </ul>
    </section>
  );
}
