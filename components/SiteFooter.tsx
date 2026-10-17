/**
 * Renders the copyright footer shared by every blog page.
 *
 * Example: a build in 2026 displays `Copyright 2026 the bumblebee's. All rights reserved.`
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <small>&copy; {new Date().getFullYear()} the bumblebee&apos;s. All rights reserved.</small>
    </footer>
  );
}
