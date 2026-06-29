import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { VenueSection } from "@/components/VenueSection";
import { SegmentsSection } from "@/components/SegmentsSection";
import { OrganizersSection } from "@/components/OrganizersSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0d0d]">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <div id="home" className="absolute top-0 w-full" />

        <Hero />
        <AboutSection targetDate="2026-09-07T09:00:00" />
        <VenueSection />
        <SegmentsSection />
        <OrganizersSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

