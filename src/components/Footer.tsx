import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08090b] text-slate-400 border-t border-white/10 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info (Zone 1) */}
          <div className="space-y-4">
            <div className="scale-85 origin-right">
              <Logo size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              مركز تجهيز وزينة وكماليات السيارات في جدة حي طيبة. متخصصون في التظليل العازل، فك التظليل باحترافية، التنجيد الملكي، وترقية الإضاءات والشاشات.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>جودة معتمدة وشغل نظيف</span>
            </div>
          </div>

          {/* Quick Nav (Zone 2) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">أقسام الصفحة</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#overview" className="hover:text-[#e2c174] transition-colors">
                  لمحة عن المتجر
                </a>
              </li>
              <li>
                <a href="#primo-catalog" className="hover:text-[#e2c174] transition-colors font-semibold text-slate-200">
                  دليل الأصناف والتجهيزات (44 صنفاً)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#e2c174] transition-colors">
                  تقييمات العملاء (4.3 ⭐)
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#e2c174] transition-colors">
                  موقع المتجر وساعات العمل
                </a>
              </li>
            </ul>
          </div>

          {/* Core Offerings (Zone 3) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">أبرز الأقسام</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>الإكسسوارات والتلبيسات الفاخرة</li>
              <li>أنظمة الإضاءة و LED والزينون</li>
              <li>الشاشات الذكية والأنظمة الصوتية</li>
              <li>التظليل العازل وفك التظليل بدون خدوش</li>
              <li>حمايات الواجهة وتلميع الشمعات</li>
              <li>تجهيزات وملحقات حسب الطلب</li>
            </ul>
          </div>

          {/* Contact (Zone 4) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white mb-4">التواصل والموقع</h4>
            
            <div className="flex items-start gap-2.5 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                جدة – حي طيبة (عرض بالخريطة)
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>هاتف:</span>
              <a href={`tel:${STORE_INFO.phoneRaw}`} className="text-white hover:text-[#d4af37] transition-colors">
                <span className="phone-number font-bold text-white">057 922 5368</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12141a] border border-white/10 text-emerald-400 rounded-lg text-xs hover:border-white/20 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب مباشر</span>
              </a>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12141a] border border-white/10 text-slate-300 rounded-lg text-xs hover:border-white/20 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>خرائط Google</span>
              </a>
              <a
                href={STORE_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12141a] border border-white/10 text-pink-400 hover:text-white hover:border-pink-500/40 rounded-lg text-xs transition-colors"
                title="حساب تيك توك الرسمي لبرج الشارقة"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.85-4.49V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69h-.92z"/>
                </svg>
                <span>تيك توك {STORE_INFO.tiktokHandle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {STORE_INFO.name} - جدة، المملكة العربية السعودية.</p>
          <div className="flex items-center gap-3 text-slate-500">
            <span>التسوّق والتركيب داخل المتجر</span>
            <span aria-hidden="true">·</span>
            <span>حي طيبة - جدة</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
