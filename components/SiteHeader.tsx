import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gre", label: "GRE" },
  { href: "/confusing-words", label: "Confusing Words" },
  { href: "/#articles", label: "Articles" },
  { href: "/#practice", label: "Practice" }
];

/**
 * Renders the primary navigation shared across the static blog.
 *
 * Example: the `Confusing Words` item links to `/confusing-words` for pair-based practice.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Unknown English home">
        <span className="brand-mark">U</span>
        <span>Unknown English</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
