/**
 * Renders the copyright footer shared by every blog page.
 *
 * Example: a build in 2026 displays `Copyright 2026 a bumblebee's garden. All rights reserved.`
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <small>&copy; {new Date().getFullYear()} a bumblebee&apos;s garden. All rights reserved.</small>
    </footer>
  );
}
