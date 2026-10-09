import React, { useState } from 'react';
import { Phone, Menu, X, Navigation, MessageCircle, Star, Edit3, Image as ImageIcon } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { Logo } from './Logo';
import { LogoManagerModal } from './LogoManagerModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-6 h-20">
            
            {/* Brand Wordmark & Logo Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#hero"
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] rounded-lg whitespace-nowrap shrink-0 group"
                aria-label="برج الشارقة لزينة السيارات"
              >
                <div className="scale-75 origin-right sm:scale-85 transition-transform group-hover:scale-90">
                  <Logo size="sm" />
                </div>
              </a>

              {/* Discreet Logo Edit Button for the store owner */}
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-amber-300/80 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 rounded-lg transition-all"
                title="تثبيت أو رفع شعار المتجر في Firebase"
              >
                <Edit3 className="w-3 h-3 text-[#d4af37]" />
                <span className="hidden sm:inline">تثبيت / تغيير الشعار</span>
                <span className="sm:hidden">الشعار</span>
              </button>
            </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#overview"
              className="hover:text-[#e2c174] transition-colors whitespace-nowrap shrink-0"
            >
              لمحة عن المتجر
            </a>
            <a
              href="#primo-catalog"
              className="text-[#e2c174] hover:text-[#f4d896] transition-colors whitespace-nowrap shrink-0 font-semibold"
            >
              دليل الأصناف والتجهيزات (44 صنفاً)
            </a>
            <a
              href="#reviews"
              className="hover:text-[#e2c174] transition-colors whitespace-nowrap shrink-0"
            >
              تقييمات العملاء
            </a>
            <a
              href="#location"
              className="hover:text-[#e2c174] transition-colors whitespace-nowrap shrink-0"
            >
              موقع المتجر وساعات العمل
            </a>
          </nav>

          {/* Clean Action Buttons with Prominent Google Review Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Primary Google Review Button */}
            <a
              href={STORE_INFO.googleMapsWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 hover:border-amber-400 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 group"
              title="اضغط هنا لكتابة تقييم على Google Maps"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>قيّمنا على Google ⭐</span>
            </a>

            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>اتصل بنا:</span>
              <span className="phone-number font-bold text-slate-950">057 922 5368</span>
            </a>
          </div>

          {/* Mobile Top Actions: Direct Review Button + Call + Drawer Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={STORE_INFO.googleMapsWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-200 bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 rounded-xl active:scale-95 transition-all shadow-sm"
              aria-label="قيّمنا على Google Maps"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>قيّمنا ⭐</span>
            </a>

            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="p-2 text-slate-950 bg-[#c5a059] rounded-xl hover:bg-[#d4af37] transition-colors"
              aria-label="اتصال سريع"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-[#151720] border border-white/10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1014] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e2c174] py-1 transition-colors"
            >
              لمحة عن المتجر
            </a>
            <a
              href="#primo-catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e2c174] py-1 transition-colors font-bold text-[#e2c174]"
            >
              دليل الأصناف والتجهيزات (44 صنفاً)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e2c174] py-1 transition-colors"
            >
              تقييمات العملاء (4.3 ⭐)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e2c174] py-1 transition-colors"
            >
              الموقع وساعات العمل
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-950 bg-[#c5a059] rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال مباشر:</span>
              <span className="phone-number font-bold text-slate-950">057 922 5368</span>
            </a>
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب مباشرة</span>
            </a>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-slate-300 bg-[#161822] border border-white/10 rounded-xl"
            >
              <Navigation className="w-4 h-4 text-red-400" />
              <span>الاتجاهات على خرائط Google</span>
            </a>
            <a
              href={STORE_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-pink-300 bg-[#161822] border border-pink-500/20 hover:border-pink-500/40 rounded-xl"
            >
              <svg className="w-4 h-4 fill-current text-pink-400" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.85-4.49V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69h-.92z"/>
              </svg>
              <span>حساب تيك توك الرسمي ({STORE_INFO.tiktokHandle})</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLogoModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-amber-300 bg-[#1e202d] border border-amber-500/30 rounded-xl hover:bg-[#282a3d] transition-colors"
            >
              <Edit3 className="w-4 h-4 text-[#d4af37]" />
              <span>تثبيت أو رفع شعار المتجر في Firebase</span>
            </button>
          </div>
        </div>
      )}
    </header>

    <LogoManagerModal
      isOpen={isLogoModalOpen}
      onClose={() => setIsLogoModalOpen(false)}
    />
  </>
  );
};
