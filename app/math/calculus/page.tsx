import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculus | Bumblebee",
  description: "Explore calculus blogs and practice questions on tangent planes, linear approximation, and step errors.",
  alternates: { canonical: "https://bumblebee.work/math/calculus" }
};

/**
 * Groups calculus content under Blogs and Practices with matching sidebar anchors.
 * Example: Practices opens `/math/calculus#practices`; Blogs contains the +0.3/−0.3 visualization.
 * Practices links to the second-step error question, which distinguishes fy(a, b) from fy(a + Δx, b).
 * A second practice asks whether partial derivatives alone guarantee a tangent plane, with Yes/No choices.
 * Dedicated resource cards keep titles, descriptions, and actions in a single link instead of nesting button borders.
 * The two blog cards sit side by side on desktop and stack on phones; section navigation becomes a compact row.
 * The sidebar starts with its section label and the Blogs/Practices links.
 */
export default function CalculusPage() {
  return (
    <main className="calculus-library">
      <aside className="calculus-library-nav">
        <p className="calculus-nav-label">In this section</p>
        <nav aria-label="Calculus sections">
          <ul>
            {/* Native anchors also scroll when reselecting the current hash after resizing, e.g. #practices on a phone. */}
            <li><a className="calculus-blogs-link" href="#blogs"><span>Blogs</span><span className="calculus-nav-count" aria-label="2 articles">02</span></a></li>
            <li><a className="calculus-practices-link" href="#practices"><span>Practices</span><span className="calculus-nav-count" aria-label="2 practices">02</span></a></li>
          </ul>
        </nav>
      </aside>
      <div className="section-content calculus-library-content">
        <header className="calculus-library-header">
          <p className="calculus-kicker">Explore mathematics</p>
          <h1>Calculus</h1>
          <p>Visual explanations and practice for tangent planes and linear approximation.</p>
        </header>
        <section id="blogs" className="calculus-index-section" aria-labelledby="calculus-blogs-title">
          <div className="calculus-library-section-heading">
            <div><h2 id="calculus-blogs-title">Blogs</h2><p>See the ideas behind the formulas.</p></div>
            <span className="calculus-section-count">2 articles</span>
          </div>
          <div className="calculus-blog-list">
            <article className="calculus-resource-card">
              <Link href="/math/calculus/tangent-plane">
                <span className="calculus-resource-type">Proof & visualization</span>
                <h3>Two steps. One total error.</h3>
                <p>See how the errors from two coordinate steps add up to the total tangent-plane approximation error.</p>
                <span className="calculus-card-action">Read article <span aria-hidden="true">↗</span></span>
              </Link>
            </article>
            <article className="calculus-resource-card">
              <Link href="/math/calculus/canceling-height-changes">
                <span className="calculus-resource-type">Interactive visualization</span>
                <h3>How height changes add up</h3>
                <p>Explore the geometry of the Δx and Δy contributions—and what happens when they cancel.</p>
                <span className="calculus-card-action">Read article <span aria-hidden="true">↗</span></span>
              </Link>
            </article>
          </div>
        </section>
        <section id="practices" className="calculus-index-section" aria-labelledby="calculus-practices-title">
          <div className="calculus-library-section-heading">
            <div><h2 id="calculus-practices-title">Practices</h2><p>Put your understanding to the test.</p></div>
            <span className="calculus-section-count">2 questions</span>
          </div>
          <div className="calculus-practice-list">
            <article className="calculus-resource-card calculus-practice-card">
              <Link href="/math/calculus/practices/second-step-error">
                <div>
                  <span className="calculus-resource-type">Linear approximation</span>
                  <h3>Which formula gives the second-step error?</h3>
                  <p>Choose between two formulas and check your reasoning.</p>
                </div>
                <span className="calculus-practice-action">Start practice <span aria-hidden="true">↗</span></span>
              </Link>
            </article>
            <article className="calculus-resource-card calculus-practice-card">
              <Link href="/math/calculus/practices/tangent-plane-existence">
                <div>
                  <span className="calculus-resource-type">Yes/No quiz</span>
                  <h3>Do partial derivatives guarantee a tangent plane?</h3>
                  <p>Decide whether the existence of partial derivatives is enough.</p>
                </div>
                <span className="calculus-practice-action">Start quiz <span aria-hidden="true">↗</span></span>
              </Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
