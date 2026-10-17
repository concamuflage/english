import Image from "next/image";
import Link from "next/link";

/**
 * Renders the compact bee-only branding and primary blog navigation.
 *
 * Example: the logo links home and the sole navigation item opens `/english`.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand brand-logo" href="/" aria-label="The bumblebee's home">
        <Image
          src="/images/bumblebee-mark.png"
          alt=""
          width={40}
          height={40}
          preload
        />
        <span>the bumblebee&apos;s</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/english">English</Link>
      </nav>
    </header>
  );
}
