import "@workspace/ui/globals.css";

import { SanityLive } from "@workspace/sanity/live";
import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";
import { preconnect, prefetchDNS } from "react-dom";

import { JambFooter } from "@/components/jamb-sections/jamb-footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { getNavigationData } from "@/lib/navigation";

const fontBrand = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  const nav = await getNavigationData();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontBrand.variable} ${fontMono.variable} antialiased`}>
        <Providers>
          <div className='jamb-site-shell'>
            <Navbar />
            {children}
            <JambFooter />
            <SanityLive />
            <CombinedJsonLd includeOrganization includeWebsite />
            {(await draftMode()).isEnabled && (
              <>
                <PreviewBar />
                <VisualEditing />
              </>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
