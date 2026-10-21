import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import { baseOpenGraph, baseTwitter, ogImage } from "@/lib/metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RevealController } from "@/components/ui/RevealController";
import { BackToTop } from "@/components/ui/BackToTop";
import { CursorFollower } from "@/components/ui/CursorFollower";
import Script from "next/script";
import { themeInitScript } from "@/components/ui/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const shareTitle = `${site.name} | ${site.title}`;
const shareImage = ogImage("home", shareTitle);
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seoTitle, template: `%s | ${site.name}` },
  description: site.metaDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    type: "profile",
    url: "/",
    title: shareTitle,
    description: site.shareDescription,
    firstName: "Ahmad",
    lastName: "Hussain",
    images: [shareImage],
  },
  twitter: {
    ...baseTwitter,
    title: shareTitle,
    description: site.shareDescription,
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  colorScheme: "light dark",
  // Lets fixed UI use env(safe-area-inset-*) on notched phones.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint to avoid a light flash in dark mode. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
          <BackToTop />
        </main>
        <Footer />
        <RevealController />
        <CursorFollower />
        {/* Cloudflare Web Analytics: cookieless, so no consent banner. Only when a token is set. */}
        {cloudflareAnalyticsToken ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
