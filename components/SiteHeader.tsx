import Image from "next/image";
import Link from "next/link";

/**
 * Renders the compact bee-only branding and primary blog navigation.
 *
 * Example: `/contact` is the rightmost link after `/entrepreneurship`.
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
        <Link href="/entrepreneurship">Entrepreneurship</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
