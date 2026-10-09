import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { PrimoCatalogSection } from './components/PrimoCatalogSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GoogleMapsLocation } from './components/GoogleMapsLocation';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-100 flex flex-col font-['IBM_Plex_Sans_Arabic',sans-serif]">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 01. Hero with Official Signboard */}
        <Hero />

        {/* 02. Overview of the Store */}
        <OverviewSection />

        {/* 03. Comprehensive Primo Catalog (44 Items - No Prices) */}
        <PrimoCatalogSection />

        {/* 04. Customer Reviews (4.3 ⭐, 55 reviews) */}
        <ReviewsSection />

        {/* 05. Exact Google Maps Location & Hours */}
        <GoogleMapsLocation />

        {/* 06. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Mobile Quick Action Bar */}
      <MobileQuickBar />
    </div>
  );
}
