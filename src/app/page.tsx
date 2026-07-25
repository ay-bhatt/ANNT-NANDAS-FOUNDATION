"use client";

import { useState } from "react";
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

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div
        className={
          isLoading
            ? "opacity-0 h-0 overflow-hidden"
            : "opacity-100 transition-opacity duration-700"
        }
      >
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