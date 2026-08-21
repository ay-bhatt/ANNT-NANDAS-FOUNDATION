import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getAllData } from "@/lib/api";
import logoImage from "@/assets/logo.webp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
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

  return (
    <html lang="en-IN" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href={logoImage.src} type="image/webp" sizes="any" />
        <link rel="apple-touch-icon" href={logoImage.src} />
      </head>
      <body suppressHydrationWarning className="min-h-screen min-w-0 overflow-x-clip bg-slate-50 text-slate-950 antialiased">
        <Navbar navigationItems={data.navigationItems} />
        <main id="main-content" className="relative min-w-0">{children}</main>
        <Footer
          siteConfig={data.siteConfig}
          navigationItems={data.navigationItems}
          impactAreas={data.impactAreas}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}