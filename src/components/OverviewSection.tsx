import React from 'react';
import { Layers, Car, MapPin, Check } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  return (
    <section id="overview" className="py-16 md:py-20 border-b border-white/10 bg-[#0a0b0e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Tag */}
        <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2.5">
          لمحة عن المتجر
        </span>

        {/* Concise Luxury Overview */}
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          مركز متخصص في شمال جدة (حي طيبة) يوفر تجربة متكاملة لتجهيز السيارات وتطوير مقصورتها ومظهرها الخارجي، مع إمكانية المعاينة الدقيقة للقطع وخيارات التركيب المباشر داخل المعرض.
        </p>

        {/* 3 Minimalist Luxury Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-[#121318] border border-white/10 hover:border-white/20 rounded-xl p-5 flex items-center justify-center gap-3 text-slate-300 text-sm transition-colors">
            <Layers className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-medium">معرض متكامل ومجهز للاستقبال</span>
          </div>

          <div className="bg-[#121318] border border-white/10 hover:border-white/20 rounded-xl p-5 flex items-center justify-center gap-3 text-slate-300 text-sm transition-colors">
            <Car className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-medium">خيارات تناسب مختلف موديلات السيارات</span>
          </div>

          <div className="bg-[#121318] border border-white/10 hover:border-white/20 rounded-xl p-5 flex items-center justify-center gap-3 text-slate-300 text-sm transition-colors">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="font-medium">معاينة وتركيب مباشر داخل الفرع</span>
          </div>

        </div>

      </div>
    </section>
  );
};
