import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { PopularServicesSection } from './components/PopularServicesSection';
import { PrimoCatalogSection } from './components/PrimoCatalogSection';
import { StoreAdvantagesSection } from './components/StoreAdvantagesSection';
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

      {/* Main Content Sections in Exact Required Order */}
      <main className="flex-1">
        {/* 01. الواجهة الرئيسية: عنوان واضح، وصف مختصر، وأبرز الخدمات */}
        <Hero />

        {/* 02. لمحة عن المتجر: نبذة مختصرة عن المعرض في حي طيبة بجدة دون تكرار */}
        <OverviewSection />

        {/* 03. الخدمات الأكثر طلباً: التظليل، تلبيس المقاعد، خياطة الدركسون، الشاشات، الإنارة والصوتيات */}
        <PopularServicesSection />

        {/* 04. دليل الأصناف والتجهيزات: جميع الأصناف الـ44 مع البحث والتصنيفات */}
        <PrimoCatalogSection />

        {/* 05. مميزات المتجر: فك التظليل بدون خدش، أسلاك مخفية، بضاعة ممتازة، وسرعة الإنجاز */}
        <StoreAdvantagesSection />

        {/* 06. تقييمات العملاء: أداة تقييمات Google المباشرة دون أي تعديل */}
        <ReviewsSection />

        {/* 07. موقع المتجر وساعات العمل: العنوان والخريطة وأوقات العمل ورقم الاتصال */}
        <GoogleMapsLocation />

        {/* 08. الأسئلة الشائعة: بطاقات قابلة للفتح والإغلاق */}
        <FAQSection />
      </main>

      {/* 09. التذييل: روابط الأقسام وبيانات التواصل وحقوق النشر */}
      <Footer />

      {/* Mobile Quick Action Bar */}
      <MobileQuickBar />
    </div>
  );
}
