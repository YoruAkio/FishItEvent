import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TimezoneProvider } from "@/contexts/TimezoneContext";
import { I18nProvider } from "@/contexts/I18nContext";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://fish-it-event.yoruakio.xyz";
const ogImage = "https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/fish-it-event/og-image.png";

// @note JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fish It Event",
  description: "This website is for who don't know when the Fish It events started on their local time.",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "YoruAkio",
    url: "https://github.com/YoruAkio",
  },
  publisher: {
    "@type": "Person",
    name: "YoruAkio",
  },
  inLanguage: ["en", "id"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Fish It Event",
    template: "%s | Fish It Event",
  },
  description: "This website is for who don't know when the Fish It events started on their local time.",
  keywords: ["Fish It", "Roblox", "events", "countdown", "timezone", "schedule"],
  authors: [{ name: "YoruAkio", url: "https://github.com/YoruAkio" }],
  creator: "YoruAkio",
  metadataBase: new URL("https://fish-it-event.yoruakio.xyz"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fish-it-event.yoruakio.xyz",
    siteName: "Fish It Event",
    title: "Fish It Event",
    description: "This website is for who don't know when the Fish It events started on their local time.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Fish It Event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish It Event",
    description: "This website is for who don't know when the Fish It events started on their local time.",
    creator: "@YoruAkio",
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${bricolage.variable}`}>
      <head>
        {/* @note JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <I18nProvider>
          <TimezoneProvider>
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </TimezoneProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
