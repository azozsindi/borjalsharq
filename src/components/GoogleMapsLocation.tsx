import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Share2, Bookmark, Check, ExternalLink, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const GoogleMapsLocation: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: STORE_INFO.name,
          text: `موقع ${STORE_INFO.name} في جدة حي طيبة`,
          url: STORE_INFO.googleMapsUrl,
        });
        return;
      } catch (err) {
        // Fallback
      }
    }
    navigator.clipboard.writeText(STORE_INFO.googleMapsUrl);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-[#0a0b0e] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            موقع المتجر وساعات العمل
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            طريقك إلى برج الشارقة في جدة - حي طيبة
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            موقع ميسر في شمال جدة (حي طيبة) مجهز لاستقبالكم وتقديم أفضل خدمات العناية بسيارتكم.
          </p>
        </div>

        {/* Business Info Card */}
        <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {STORE_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                متجر كماليات وزينة وتجهيز السيارات · جدة حي طيبة
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e2c174]'
                    : 'bg-[#0a0b0e] border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#e2c174]' : ''}`} />
                <span>{isSaved ? 'تم الحفظ' : 'حفظ'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0a0b0e] border border-white/10 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                {shareSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{shareSuccess ? 'تم النسخ' : 'مشاركة'}</span>
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
            
            <div className="p-4 rounded-xl bg-[#0a0b0e] border border-white/5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block mb-1">الموقع الجغرافي:</span>
                <span className="text-sm font-semibold text-white block mb-1.5">
                  جدة – حي طيبة
                </span>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <span>عرض الموقع في خرائط Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0b0e] border border-white/5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-400 block mb-1">ساعات العمل الرسمية:</span>
                <span className="text-sm font-semibold text-white block">
                  يومياً من الساعة ٩:٠٠ صباحاً حتى ١:٣٠ بعد منتصف الليل
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  مفتوح طوال أيام الأسبوع
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0b0e] border border-white/5 flex items-center justify-between gap-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">رقم الاتصال المباشر:</span>
                  <a 
                    href={`tel:${STORE_INFO.phoneRaw}`} 
                    className="text-base font-bold text-white hover:text-[#d4af37] transition-colors"
                  >
                    <span className="phone-number text-white font-bold tracking-wider">057 922 5368</span>
                  </a>
                </div>
              </div>
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-lg transition-colors"
              >
                اتصال الآن
              </a>
            </div>

          </div>

          {/* Directions Primary CTA & Social */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-md active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>فتح الاتجاهات المباشرة في Google Maps</span>
            </a>

            <a
              href={STORE_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 px-5 text-sm font-medium text-pink-300 hover:text-white bg-[#0a0b0e] hover:bg-[#161822] border border-pink-500/20 hover:border-pink-500/40 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-pink-400" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.85-4.49V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69h-.92z"/>
              </svg>
              <span>تيك توك {STORE_INFO.tiktokHandle}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
