import React from 'react';
import { Store, Shield, Check, Award } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const OverviewSection: React.FC = () => {
  return (
    <section id="overview" className="py-16 md:py-20 border-b border-white/10 bg-[#0a0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            لمحة عن المتجر
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            مركز متكامل لزينة وتطوير كماليات السيارات
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            يقدم <strong className="text-white font-bold">برج الشارقة لزينة السيارات</strong> في حي طيبة بمدينة جدة تشكيلة عريضة من الإكسسوارات الفاخرة، والتجهيزات الداخلية والخارجية، والأنظمة الكهربائية والصوتية المتطورة، وحلول التظليل العازل للحرارة المعتمدة.
          </p>
        </div>

        {/* 3 Pillars of In-Store Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: In-Store Shopping */}
          <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#191a22] border border-white/10 flex items-center justify-center text-[#d4af37] mb-5">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">التسوّق والتركيب بالمتجر</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                معرض منظم ومتكامل يضم أحدث إكسسوارات وكماليات السيارات، مع إمكانية فحص خامات التنجيد ومعاينة درجات العزل وتجربة الشاشات والإضاءات مباشرة قبل التركيب.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-2 text-xs text-[#d4af37] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>فرع حي طيبة - جدة</span>
            </div>
          </div>

          {/* Card 2: Glass Protection & Tint Removal */}
          <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#191a22] border border-white/10 flex items-center justify-center text-emerald-400 mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">فك تظليل بدون أي خدوش</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                نولي اهتماماً فائقاً بسلامة زجاج سيارتك؛ حيث يتم فك التظليل القديم والمستعصي بمواد مخصصة تحمي الزجاج بالكامل وأسلاك التسخين الخلفية دون ترك أي خدوش.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>حماية تامة لزجاج السيارة</span>
            </div>
          </div>

          {/* Card 3: Wide Compatibility */}
          <div className="bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#191a22] border border-white/10 flex items-center justify-center text-[#d4af37] mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">توافق مع كافة السيارات</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                توفير قطع وإكسسوارات وتلبيسات وشاشات متوافقة تماماً مع السيارات اليابانية، الكورية، الأمريكية، والأوروبية بفيش الوكالة دون تجريح أسلاك.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-2 text-xs text-[#d4af37] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>تناسب دقيق لكافة الموديلات</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
