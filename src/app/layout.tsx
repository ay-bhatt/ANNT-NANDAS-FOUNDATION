import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Noto_Sans_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RouteProgress from "@/components/site/RouteProgress";
import SiteNotices from "@/components/site/SiteNotices";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { getAllData } from "@/lib/api";
import { LOCALE_COOKIE, localeLang, parseLocale } from "@/lib/i18n";
import logoImage from "@/assets/logo.webp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
  description:
    "ANNT NANDAS FOUNDATION is a non-profit organization empowering communities in the Himalayas through sports, education, healthcare, and sustainable development.",
  keywords:
    "ANNT NANDAS FOUNDATION, Kalam Singh Bisht, NGO, Uttarakhand, Himalayas, sports development, education, healthcare, community development, Hajar Ultra, COAS Commendation",
  icons: {
    icon: [{ url: logoImage.src, type: "image/webp" }],
    shortcut: logoImage.src,
    apple: [{ url: logoImage.src, type: "image/webp" }],
  },
  openGraph: {
    title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
    description:
      "Empowering Communities | Discovering Talent | Creating Opportunities",
    type: "website",
    locale: "en_IN",
    siteName: "ANNT NANDAS FOUNDATION",
    images: [{ url: logoImage.src, width: 512, height: 512, alt: "ANNT NANDAS FOUNDATION logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
    description: "Empowering Himalayan communities through education, health, sports, opportunity, and sustainable development.",
    images: [logoImage.src],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

// Root layout — a Server Component that fetches shared data (site config,
// navigation, impact areas) and passes it to Navbar (Client) and Footer (Server).
// Each child page still calls its own `getAllData()` — Next.js automatically
// deduplicates identical `fetch(..., { next: { revalidate } })` calls within
// the same request cycle, so the API is hit only once per page load.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch shared data needed by Navbar + Footer.
  // In a real CMS this would be a separate lightweight endpoint.
  const data = await getAllData();
  const cookieStore = await cookies();
  const initialLocale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={localeLang(initialLocale)}
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${poppins.variable} ${notoDevanagari.variable} ${
        initialLocale === "hi" ? "lang-hi" : ""
      }`}
    >
      <head>
        <link rel="icon" href={logoImage.src} type="image/webp" sizes="any" />
        <link rel="apple-touch-icon" href={logoImage.src} />
        <link rel="describedby" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/index.md" title="Markdown version" />
      </head>
      <body suppressHydrationWarning className="min-h-screen min-w-0 bg-slate-50 text-slate-950 antialiased">
        <LanguageProvider initialLocale={initialLocale}>
          <Navbar navigationItems={data.navigationItems} />
          <RouteProgress />
          <main id="main-content" className="relative min-w-0 overflow-x-clip">{children}</main>
          <Footer
            siteConfig={data.siteConfig}
            navigationItems={data.navigationItems}
            impactAreas={data.impactAreas}
          />
          <SiteNotices notices={data.siteNotices} />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}