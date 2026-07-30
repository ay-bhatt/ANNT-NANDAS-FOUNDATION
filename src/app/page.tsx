"use client";

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
  return (
    <>
      <div className="opacity-100 transition-opacity duration-700">
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