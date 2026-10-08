import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unknown English | English Learning Blog",
  description: "A focused blog for English reading, vocabulary, writing, and GRE preparation."
};

/**
 * Provides the shared page shell for the English learning blog.
 *
 * Example: every route receives the header with the GRE navigation link.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
