import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const MobileQuickBar: React.FC = () => {
  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0c0d10]/95 backdrop-blur-xl border-t border-white/10 px-3 pt-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom, 0.65rem))' }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#161822] hover:bg-[#1e202d] border border-white/10 text-white rounded-xl text-xs font-bold active:scale-95 transition-all shadow-sm"
          aria-label="اتصال هاتفي مباشر"
        >
          <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span>اتصال</span>
        </a>

        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] min-h-[46px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e2c174] text-slate-950 rounded-xl text-xs font-extrabold active:scale-95 transition-all shadow-md shadow-amber-500/20"
          aria-label="محادثة واتساب مباشرة"
        >
          <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
          <span>واتساب فوري</span>
        </a>

        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#161822] hover:bg-[#1e202d] border border-white/10 text-slate-200 rounded-xl text-xs font-semibold active:scale-95 transition-all shadow-sm"
          aria-label="موقع المحل على الخريطة"
        >
          <Navigation className="w-4 h-4 text-red-400 shrink-0" />
          <span>الخريطة</span>
        </a>
      </div>
    </div>
  );
};

