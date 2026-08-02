"use client";

import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import OurWorkSection from "@/components/OurWorkSection";
import ImpactSection from "@/components/ImpactSection";
import EventsSection from "@/components/EventsSection";
import DonationStrip from "@/components/DonationStrip";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DonateSection from "@/components/DonateSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={isLoading ? "pointer-events-none opacity-0" : "transition-opacity duration-700 opacity-100"}>
        <Hero />
        <AboutSection />
        <OurWorkSection />
        <ImpactSection />
        <EventsSection />
        <DonationStrip />
        <GallerySection />
        <NewsSection />
        <TestimonialsSection />
        <DonateSection />
        <ContactSection />
      </div>
    </>
  );
}