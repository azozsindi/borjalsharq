import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Navigation, MessageCircle, Clock, ShieldCheck, Check, Sparkles, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { Logo } from './Logo';

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
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Verified Google Maps Status */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.3] tracking-tight">
              وجهتكم الأولى لتجهيز وتطوير وتزيين السيارات في{' '}
              <span className="text-[#e2c174]">
                برج الشارقة
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              نقدم لكم تشكيلة حصرية ومتكاملة من إكسسوارات السيارات، والزينة الداخلية والخارجية، وأنظمة الإنارة والصوتيات، والتلبيسات وحمايات السيارات لتناسب مختلف الأنواع والأذواق بأعلى معايير الجودة والأناقة.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>تظليل عازل حراري وفك احترافي بدون خدش للقزاز</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>تلبيسات مقاعد ودعاسات وخياطة دركسون يدوية</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>أنظمة إنارة LED وزينون وعدسات بروجكتر متطورة</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#d4af37]" />
                </span>
                <span>شاشات أندرويد ذكية وكاميرات وأنظمة صوت متكاملة</span>
              </div>
            </div>

            {/* Clean, Pristine Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 w-full sm:w-auto">
              {/* WhatsApp */}
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-sm active:scale-98 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>استفسار عبر الواتساب</span>
              </a>

              {/* Direct Phone Call with Isolated LTR Digits */}
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#171920] hover:bg-[#20232d] border border-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0"
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
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-[#12141a] hover:bg-[#1a1d26] border border-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 text-red-400" />
                <span>موقع المحل بالخريطة</span>
              </a>
            </div>

          </div>

          {/* Right Column: Store Highlights & Location Card (No Logo) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md">
              
              <div className="rounded-2xl bg-gradient-to-b from-[#14161f] to-[#0a0b0e] border border-amber-500/20 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
                
                {/* Glow accent */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#d4af37]">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-semibold text-amber-300/90 tracking-wide">
                      الفرع المعتمد · جدة
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    isOpenNow 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{isOpenNow ? 'مفتوح الآن' : 'من 9:00 ص إلى 1:30 ص'}</span>
                  </span>
                </div>

                {/* Main Card Content */}
                <div className="py-5 space-y-4">
                  {/* Store Official Logo Emblem */}
                  <div className="py-3 px-2 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center">
                    <Logo size="md" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>مركز برج الشارقة لزينة السيارات</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      حي طيبة · شارع بن ملوح · خدمة فورية وتركيب احترافي
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
                      <span className="text-slate-400 text-[11px]">التقييم العام</span>
                      <span className="font-bold text-white flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4.3</span>
                        <span className="text-[10px] text-slate-400 font-normal">(Google)</span>
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
                      <span className="text-slate-400 text-[11px]">حساب التيك توك</span>
                      <a 
                        href={STORE_INFO.tiktokUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-pink-300 hover:text-pink-200 flex items-center gap-1 mt-1 transition-colors"
                      >
                        <span dir="ltr">@borjalsharq</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Working Hours banner */}
                  <div className="p-3 rounded-xl bg-[#0f1117] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>ساعات العمل اليومية:</span>
                    </div>
                    <span className="font-semibold text-white dir-ltr">
                      9:00 AM – 1:30 AM
                    </span>
                  </div>
                </div>

                {/* Subtext info & Direct navigation */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e2c174] hover:text-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-red-400" />
                    <span>الاتجاهات إلى المحل</span>
                  </a>

                  <span className="text-[11px] text-slate-400 font-medium">
                    جدة · حي طيبة
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

