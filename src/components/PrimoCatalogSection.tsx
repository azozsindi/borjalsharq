import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Lightbulb, 
  Monitor, 
  Shield, 
  MessageCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  PhoneCall,
  Check
} from 'lucide-react';
import { PRIMO_CATALOG, PRIMO_SECTIONS, PrimoItem, STORE_INFO } from '../data/storeData';

export const PrimoCatalogSection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<PrimoItem | null>(null);

  useEffect(() => {
    const handleSelectSection = (e: CustomEvent<string>) => {
      if (e.detail) {
        setSelectedSection(e.detail);
        const catalogEl = document.getElementById('catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('select-catalog-section' as any, handleSelectSection);
    return () => window.removeEventListener('select-catalog-section' as any, handleSelectSection);
  }, []);

  const filteredCatalog = useMemo(() => {
    return PRIMO_CATALOG.filter((item) => {
      if (selectedSection !== 'all' && item.sectionId !== selectedSection) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.sectionName.toLowerCase().includes(q) ||
          item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [selectedSection, searchQuery]);

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'interior':
        return <Layers className="w-4 h-4 text-[#d4af37]" />;
      case 'lighting':
        return <Lightbulb className="w-4 h-4 text-red-400" />;
      case 'tech':
        return <Monitor className="w-4 h-4 text-[#d4af37]" />;
      case 'exterior':
      default:
        return <Shield className="w-4 h-4 text-slate-300" />;
    }
  };

  const getSectionRomanNumeral = (id: string) => {
    switch (id) {
      case 'interior': return 'أولاً';
      case 'lighting': return 'ثانياً';
      case 'tech': return 'ثالثاً';
      case 'exterior': return 'رابعاً';
      default: return '';
    }
  };

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#0a0b0e] border-b border-white/10 relative">
      <div id="primo-catalog" className="absolute -top-24 pointer-events-none" />
      <div id="calculator" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            دليل المتجر
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            التجهيزات والإكسسوارات
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
            استعرض قائمة التجهيزات والإكسسوارات المعتمدة لسيارتك في برج الشارقة – جدة، حي طيبة.
          </p>
        </div>

        {/* Search Bar & Section Tabs */}
        <div className="bg-[#121318] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأصناف والتجهيزات (مثال: تظليل، دركسون، شاشات، عدسات LED، عطور، كربون، تلبيس...)"
              className="w-full bg-[#0a0b0e] border border-white/10 rounded-xl pr-10 pl-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Section Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-white/5 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                selectedSection === 'all'
                  ? 'bg-[#c5a059] text-slate-950 shadow-sm'
                  : 'bg-[#0c0d10] border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <span>جميع الأصناف</span>
              <span className="text-[10px] opacity-80 tabular-nums">({PRIMO_CATALOG.length})</span>
            </button>

            {PRIMO_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                  selectedSection === sec.id
                    ? 'bg-[#c5a059] border-[#c5a059] text-slate-950 shadow-sm'
                    : 'bg-[#0c0d10] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {getSectionIcon(sec.id)}
                <span>{sec.shortTitle}</span>
                <span className="text-[10px] opacity-75 tabular-nums">({sec.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            إجمالي الأصناف المعروضة: <strong className="text-white tabular-nums">{filteredCatalog.length}</strong> صنفاً
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Check className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>متوفر في فرع حي طيبة بجدة</span>
          </span>
        </div>

        {/* Items Grid / Grouped Sections */}
        {filteredCatalog.length === 0 ? (
          <div className="py-16 text-center bg-[#121318] border border-white/10 rounded-2xl p-8">
            <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">لم يتم العثور على نتائج</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              يرجى تعديل مصطلح البحث أو تصفح كافة الأصناف، أو مراسلتنا مباشرة للاستفسار عن أي صنف نادر.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSection('all');
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-[#c5a059] rounded-lg"
            >
              عرض كافة الأصناف
            </button>
          </div>
        ) : selectedSection === 'all' && !searchQuery.trim() ? (
          /* Grouped by Section to avoid repeating long section names above every card */
          <div className="space-y-12">
            {PRIMO_SECTIONS.map((sec) => {
              const secItems = filteredCatalog.filter((item) => item.sectionId === sec.id);
              if (secItems.length === 0) return null;

              return (
                <div key={sec.id} className="space-y-5">
                  {/* Single Group Heading for the section */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#191a22] border border-white/10 flex items-center justify-center text-[#d4af37]">
                        {getSectionIcon(sec.id)}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {getSectionRomanNumeral(sec.id)}: {sec.title}
                        </h3>
                        <span className="text-xs text-slate-400">{sec.count} صنفاً معتمداً</span>
                      </div>
                    </div>
                  </div>

                  {/* Section Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {secItems.map((item) => {
                      const whatsappMsg = encodeURIComponent(
                        `السلام عليكم، أود الاستفسار عن توفر وتركيب: *${item.title}* لدى برج الشارقة لزينة السيارات بجدة حي طيبة.`
                      );
                      const itemWhatsappUrl = `${STORE_INFO.whatsappUrl}?text=${whatsappMsg}`;

                      return (
                        <div
                          key={item.id}
                          className="bg-[#121318] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/25 transition-all shadow-sm h-full"
                        >
                          <div>
                            {/* Title */}
                            <h4 className="text-base font-bold text-white mb-2 leading-snug">
                              {item.title}
                            </h4>

                            {/* Brief Description on Card */}
                            <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2" title={item.description}>
                              {item.description}
                            </p>

                            {/* Top Tags (Compact) */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {item.tags.slice(0, 2).map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] text-slate-300 bg-[#0a0b0e] border border-white/5 px-2 py-0.5 rounded"
                                  >
                                    {t}
                                  </span>
                                ))}
                                {item.tags.length > 2 && (
                                  <span className="text-[10px] text-slate-500 bg-[#0a0b0e] border border-white/5 px-1.5 py-0.5 rounded">
                                    +{item.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                            <button
                              onClick={() => setActiveModalItem(item)}
                              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span>تفاصيل الصنف</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                            </button>

                            <a
                              href={itemWhatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-lg transition-colors whitespace-nowrap active:scale-95"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>استفسار واتساب</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Filtered or Search View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCatalog.map((item) => {
              const whatsappMsg = encodeURIComponent(
                `السلام عليكم، أود الاستفسار عن توفر وتركيب: *${item.title}* لدى برج الشارقة لزينة السيارات بجدة حي طيبة.`
              );
              const itemWhatsappUrl = `${STORE_INFO.whatsappUrl}?text=${whatsappMsg}`;

              const currentSec = PRIMO_SECTIONS.find(s => s.id === item.sectionId);

              return (
                <div
                  key={item.id}
                  className="bg-[#121318] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/25 transition-all shadow-sm h-full"
                >
                  <div>
                    {/* Compact Section Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-semibold text-[#d4af37] flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {getSectionIcon(item.sectionId)}
                        <span>{currentSec?.shortTitle || item.sectionName}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    {/* Brief Description on Card */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2" title={item.description}>
                      {item.description}
                    </p>

                    {/* Top Tags (Compact) */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-slate-300 bg-[#0a0b0e] border border-white/5 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-[10px] text-slate-500 bg-[#0a0b0e] border border-white/5 px-1.5 py-0.5 rounded">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span>تفاصيل الصنف</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                    </button>

                    <a
                      href={itemWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-lg transition-colors whitespace-nowrap active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>استفسار واتساب</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Order Request Box */}
        <div className="mt-12 bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-right">
            <h3 className="text-lg font-bold text-white">
              هل تبحث عن تجهيز أو قطعة زينة خاصة لسيارتك؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              نوفر جميع التجهيزات والقطع لمختلف موديلات السيارات اليابانية، الكورية، الأمريكية، والأوروبية حسب طلبك.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن توفير قطعة وتجهيز خاص لسيارتي لدى برج الشارقة.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all whitespace-nowrap active:scale-98 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار خاص عبر الواتساب</span>
            </a>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0a0b0e] border border-white/10 hover:bg-white/5 rounded-xl transition-colors whitespace-nowrap active:scale-98"
            >
              <PhoneCall className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>اتصال:</span>
              <span className="phone-number font-bold text-white">057 922 5368</span>
            </a>
          </div>
        </div>

      </div>

      {/* Item Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12141a] border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-lg bg-[#0a0b0e] border border-white/10"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold text-[#d4af37] block mb-1">
                {activeModalItem.sectionName}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                {activeModalItem.title}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0b0e] border border-white/10 mb-4 text-sm text-slate-300 leading-relaxed">
              {activeModalItem.description}
            </div>

            {activeModalItem.tags && activeModalItem.tags.length > 0 && (
              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-2 font-medium">الخصائص والمميزات:</span>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-300 bg-[#0a0b0e] border border-white/10 px-2.5 py-1 rounded-lg"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(`السلام عليكم، استفسر عن (${activeModalItem.title}) في برج الشارقة لزينة السيارات.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-colors"
              >
                استفسار وتحديد موعد بالفرع
              </a>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-[#0a0b0e] border border-white/10 rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
