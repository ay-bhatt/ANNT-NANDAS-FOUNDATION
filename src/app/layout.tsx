import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://annt-1.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}