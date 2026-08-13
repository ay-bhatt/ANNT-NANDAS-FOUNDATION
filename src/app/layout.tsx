import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AppShell from "@/components/AppShell";
import { getAllData } from "@/lib/api";
import logoImage from "@/assets/logo.jpeg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
  description:
    "ANNT NANDAS FOUNDATION is a non-profit organization empowering communities in the Himalayas through sports, education, healthcare, and sustainable development.",
  keywords:
    "ANNT NANDAS FOUNDATION, NGO, Uttarakhand, Himalayas, sports development, education, healthcare, community development",
  openGraph: {
    title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
    description:
      "Empowering Communities | Discovering Talent | Creating Opportunities",
    type: "website",
    locale: "en_IN",
    siteName: "ANNT NANDAS FOUNDATION",
    images: [{ url: logoImage.src, width: 1254, height: 1254, alt: "ANNT NANDAS FOUNDATION logo" }],
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable} ${devanagari.variable}`}>
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <AppShell>
          <Navbar navigationItems={data.navigationItems} />
          <main id="main-content" className="relative">{children}</main>
          <Footer
            siteConfig={data.siteConfig}
            navigationItems={data.navigationItems}
            impactAreas={data.impactAreas}
          />
          <ScrollToTop />
        </AppShell>
      </body>
    </html>
  );
}