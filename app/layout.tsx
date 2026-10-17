import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "the bumblebee's",
  description: "A personal blog with GRE study notes and confusing word practice."
};

/**
 * Provides the shared page shell for the personal blog.
 *
 * Example: both `/` and `/english/gre/confusing-words` reuse the same header and copyright footer.
 * The shared Google tag records visits using measurement ID `G-BMC431JQJK`.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BMC431JQJK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            /** Queues Google tag commands; for example, gtag('config', 'G-BMC431JQJK'). */
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BMC431JQJK');
          `}
        </Script>
      </body>
    </html>
  );
}
