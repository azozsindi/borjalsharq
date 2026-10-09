import React from 'react';
import { ShieldCheck, Cpu, Sparkles, Clock, Check } from 'lucide-react';

export const StoreAdvantagesSection: React.FC = () => {
  const advantages = [
    {
      id: 'scratch-free',
      title: 'فك تظليل بدون أي خدوش',
      desc: 'أجهزة بخار ومذيبات مخصصة لفك التظليل المستعصي دون إيذاء الزجاج أو خطوط التسخين الخلفية نهائياً.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'plug-and-play',
      title: 'أسلاك مخفية وتوافق الدركسون',
      desc: 'توصيل بفيش الوكالة المباشر دون تجريح أسلاك، مع ربط كامل وموثوق بأزرار التحكم بالمقود الأصلية.',
      icon: <Cpu className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'quality-goods',
      title: 'بضاعة ممتازة وتجهيز مرتب',
      desc: 'عوازل نانو سيراميك وخامات تلبيس وشاشات مجربة تضمن دقة المقاس وأعلى مقاومة لحرارة الصيف.',
      icon: <Sparkles className="w-5 h-5 text-[#d4af37]" />
    },
    {
      id: 'fast-service',
      title: 'سرعة الإنجاز والتعامل الراقي',
      desc: 'كفاءة عالية في التنفيذ والتركيب داخل المعرض لتقليل وقت انتظارك وضمان الجودة التامة.',
      icon: <Clock className="w-5 h-5 text-amber-300" />
    }
  ];

  return (
    <section id="advantages" className="py-16 md:py-20 bg-[#0a0b0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            مميزات المتجر
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            لماذا يختار العملاء برج الشارقة؟
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
            تجارب حقيقية موثقة تثبت حرصنا على نظافة الشغل وسلامة سيارتك وتوفير أفضل قطع الزينة.
          </p>
        </div>

        {/* 4 Crisp Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((adv) => (
            <div 
              key={adv.id}
              className="bg-[#121318] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#191a22] border border-white/10 flex items-center justify-center mb-4">
                  {adv.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {adv.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#d4af37] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>شغل نظيف وموثق</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
