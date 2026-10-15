import Link from "next/link";

/**
 * Renders the minimal footer for the personal blog shell.
 *
 * Example: the footer keeps `Confusing Words` grouped under GRE.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/">English</Link>
        <div className="nav-group">
          <Link href="/gre">GRE</Link>
          <Link className="nav-child-link" href="/gre/confusing-words">
            Confusing Words
          </Link>
        </div>
      </nav>
    </footer>
  );
}
