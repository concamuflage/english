"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Renders the compact bee-only branding and primary blog navigation.
 *
 * Example: `/global-expansion` displays 品牌出海 after Entrepreneurship; Contact is the rightmost link.
 * Wrapped links expand the header; e.g. a narrow viewport updates sticky offsets to its measured height.
 * Math links to `/math`, where Calculus contains interactive plots.
 */
export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    /** Keeps sticky content below all header rows; e.g. a 118px header sets its offset to `118px`. */
    function updateHeaderHeight() {
      if (!header) return;
      document.documentElement.style.setProperty("--site-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
    }

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
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
        <Link href="/math">Math</Link>
        <Link href="/entrepreneurship">Entrepreneurship</Link>
        <Link href="/global-expansion" lang="zh-CN">品牌出海</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
