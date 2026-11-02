import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { autoRepairJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const DEFAULT_TITLE = `${BUSINESS.name} — Honest Auto Repair & Mobile Mechanic in Rockwall, TX`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Bobby's Garage — Rockwall, TX Auto Repair",
  },
  description: `${BUSINESS.tagline} Family-owned auto repair and mobile service at ${BUSINESS.address.street}, Rockwall, TX. Call ${BUSINESS.phone.display}.`,
  applicationName: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
    title: DEFAULT_TITLE,
    description: BUSINESS.tagline,
    url: "/",
    images: [{ url: "/images/hero.jpg", alt: "Bobby's Garage auto repair in Rockwall, TX" }],
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1a2e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = JSON.stringify(autoRepairJsonLd()).replace(/</g, "\\u003c");
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-accent-500 px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
