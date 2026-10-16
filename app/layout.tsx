import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Blog",
  description: "A personal blog with GRE study notes and confusing word practice."
};

/**
 * Provides the shared page shell for the personal blog.
 *
 * Example: both `/` and `/english/gre/confusing-words` reuse the same header and copyright footer.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
