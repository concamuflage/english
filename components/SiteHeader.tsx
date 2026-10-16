import Image from "next/image";
import Link from "next/link";

/**
 * Renders the primary navigation for the personal blog shell.
 *
 * Example: the logo links home and the sole navigation item opens `/english`.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand brand-logo" href="/" aria-label="A bumblebee's garden home">
        <Image
          src="/images/bumblebees-garden-logo.png"
          alt="a bumblebee's garden"
          width={1774}
          height={887}
          preload
        />
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/english">English</Link>
      </nav>
    </header>
  );
}
