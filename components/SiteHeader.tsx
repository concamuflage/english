import Link from "next/link";

/**
 * Renders the primary navigation for the personal blog shell.
 *
 * Example: `English` links to `/`, while `Confusing Words` appears under the GRE section.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand brand-empty" href="/" aria-label="Home" />
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/">English</Link>
        <div className="nav-group">
          <Link href="/gre">GRE</Link>
          <Link className="nav-child-link" href="/gre/confusing-words">
            Confusing Words
          </Link>
        </div>
      </nav>
    </header>
  );
}
