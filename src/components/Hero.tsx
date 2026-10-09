import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, ArrowDown, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const Hero: React.FC = () => {
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const ksaTime = new Date(utc + (3600000 * 3));
      const hours = ksaTime.getHours();
      const minutes = ksaTime.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      // Open daily from 9:00 AM (540 mins) to 1:30 AM (90 mins)
      setIsOpenNow(totalMinutes >= 540 || totalMinutes < 90);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/10 bg-[#0a0b0e] overflow-hidden">
      {/* Subtle Luxury Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Center Content */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-7">

          {/* Metadata pill: Rating + Location + Status */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1.5 px-3.5 rounded-full bg-[#12141c] border border-white/10 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span className="tabular-nums">4.3 ⭐</span>
              <span className="text-slate-400 font-normal">من 55 تقييماً على Google</span>
            </span>

            <span aria-hidden="true" className="text-slate-600">·</span>

            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>جدة – حي طيبة</span>
            </span>

            <span aria-hidden="true" className="text-slate-600">·</span>

            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className={isOpenNow ? 'text-emerald-400 font-medium' : 'text-slate-300'}>
                {isOpenNow ? 'مفتوح الآن' : STORE_INFO.openingHourFormatted}
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            ارتقِ بتجربة سيارتك
          </h1>

          {/* Short Luxury Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            تجهيز وتطوير السيارات، التظليل العازل، والتلبيسات الفاخرة في برج الشارقة – جدة، حي طيبة.
          </p>

          {/* EXACTLY 3 Main Luxury Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 w-full sm:w-auto">
            
            {/* Button 1: استكشف التجهيزات (Primary & Most Prominent) */}
            <a
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-md active:scale-98 whitespace-nowrap"
            >
              <span>استكشف التجهيزات</span>
              <ArrowDown className="w-4 h-4 text-slate-950" />
            </a>

            {/* Button 2: تواصل معنا (WhatsApp) */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#14161f] hover:bg-[#1c202d] border border-white/15 rounded-xl transition-all active:scale-98 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>تواصل معنا</span>
            </a>

            {/* Button 3: قيّمنا على Google ⭐ */}
            <a
              href={STORE_INFO.googleMapsWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-amber-200 bg-[#14161f] hover:bg-[#1c202d] border border-amber-500/30 hover:border-amber-400/50 rounded-xl transition-all active:scale-98 whitespace-nowrap"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>قيّمنا على Google ⭐</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

