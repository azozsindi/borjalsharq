import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const MobileQuickBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0c0d10]/95 backdrop-blur-md border-t border-white/10 p-2.5 px-3">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#161822] border border-white/10 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>اتصال</span>
        </a>

        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#c5a059] text-slate-950 rounded-xl text-xs font-bold active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>واتساب</span>
        </a>

        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#161822] border border-white/10 text-slate-200 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
        >
          <Navigation className="w-3.5 h-3.5 text-red-400" />
          <span>الخريطة</span>
        </a>
      </div>
    </div>
  );
};
