"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionNavItem = {
  href: string;
  label: string;
};

type SectionNavProps = {
  title: string;
  href: string;
  parent?: SectionNavItem;
  items: SectionNavItem[];
};

/**
 * Renders section navigation while omitting links to the current page.
 *
 * Example: `/english` lists GRE; `/english/gre` lists Confusing Words without GRE.
 */
export function SectionNav({ title, href, parent, items }: SectionNavProps) {
  const pathname = usePathname();
  const visibleItems = items.filter((item) => item.href !== pathname);

  return (
    <aside className="section-sidebar">
      <nav className="section-nav" aria-label={`${title} sections`}>
        {parent && parent.href !== pathname && (
          <Link className="section-nav-parent" href={parent.href}>
            {parent.label}
          </Link>
        )}
        {href !== pathname && (
          <Link className="section-nav-title" href={href}>
            {title}
          </Link>
        )}
        {visibleItems.length > 0 && (
          <ul>
            {visibleItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
