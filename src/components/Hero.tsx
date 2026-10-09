import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Navigation, MessageCircle, Clock, Check } from 'lucide-react';
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
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-20 border-b border-white/10 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          
          {/* Verified Google Maps Status */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span className="tabular-nums">4.3</span>
              <span className="text-slate-400 font-normal">(55 تقييماً على خرائط Google)</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>جدة – حي طيبة</span>
            </a>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{isOpenNow ? 'مفتوح الآن لاستقبالكم' : STORE_INFO.openingHourFormatted}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-snug sm:leading-[1.3] tracking-tight">
            وجهتكم الأولى لتجهيز وتطوير وتزيين السيارات في{' '}
            <span className="text-[#e2c174]">
              برج الشارقة
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            نقدم لكم تشكيلة حصرية ومتكاملة من إكسسوارات السيارات، والزينة الداخلية والخارجية، وأنظمة الإنارة والصوتيات، والتلبيسات وحمايات السيارات لتناسب مختلف الأنواع والأذواق بأعلى معايير الجودة والأناقة.
          </p>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-x-8 sm:gap-y-3.5 text-xs sm:text-sm text-slate-300 pt-2 w-full max-w-2xl text-right">
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:bg-transparent sm:border-0 sm:p-0">
              <span className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#d4af37]" />
              </span>
              <span>تظليل عازل حراري وفك احترافي بدون خدش للقزاز</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:bg-transparent sm:border-0 sm:p-0">
              <span className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#d4af37]" />
              </span>
              <span>تلبيسات مقاعد ودعاسات وخياطة دركسون يدوية</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:bg-transparent sm:border-0 sm:p-0">
              <span className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#d4af37]" />
              </span>
              <span>أنظمة إنارة LED وزينون وعدسات بروجكتر متطورة</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:bg-transparent sm:border-0 sm:p-0">
              <span className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#d4af37]" />
              </span>
              <span>شاشات أندرويد ذكية وكاميرات وأنظمة صوت متكاملة</span>
            </div>
          </div>

          {/* Clean, Pristine Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 w-full sm:w-auto">
            {/* WhatsApp */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-sm active:scale-98 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار عبر الواتساب</span>
            </a>

            {/* Direct Phone Call with Isolated LTR Digits */}
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#171920] hover:bg-[#20232d] border border-white/10 rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>اتصال مباشر:</span>
              <span className="phone-number font-bold text-white tracking-wider">057 922 5368</span>
            </a>

            {/* Exact Google Maps Link provided by user */}
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-[#12141a] hover:bg-[#1a1d26] border border-white/10 rounded-xl transition-colors whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 text-red-400" />
              <span>موقع المحل بالخريطة</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

