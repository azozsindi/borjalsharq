import React from 'react';
import { 
  Shield, 
  Layers, 
  Disc, 
  Monitor, 
  Lightbulb, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const PopularServicesSection: React.FC = () => {
  const services = [
    {
      id: 'tinting',
      title: 'التظليل والعزل الحراري',
      shortDesc: 'عوازل نانو سيراميك وكربون معتمدة لخفض الحرارة وحماية المقصورة، مع فك احترافي للتظليل القديم بأمان.',
      icon: <Shield className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'exterior'
    },
    {
      id: 'upholstery',
      title: 'تلبيسات المقاعد والأرضيات',
      shortDesc: 'تفصيل وتلبيس مقاعد بأحدث الخامات المريحة، مع دعاسات أرضية 5D و7D لحماية أرضية السيارة وسهولة التنظيف.',
      icon: <Layers className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'interior'
    },
    {
      id: 'steering',
      title: 'خياطة الدركسون',
      shortDesc: 'تطريز يدوي متقن للدركسون بأجود أنواع الجلد الناعم والمخرّم والمقاوم لحرارة الشمس ليمنحك ثباتاً ومظهراً فخماً.',
      icon: <Disc className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'interior'
    },
    {
      id: 'screens',
      title: 'الشاشات وأنظمة الصوت',
      shortDesc: 'شاشات أندرويد ذكية تدعم Apple CarPlay وAndroid Auto مع توافق كامل لأزرار الدركسون الأصلية وصوت نقي.',
      icon: <Monitor className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'tech'
    },
    {
      id: 'lighting',
      title: 'الإنارة وLED والزينون',
      shortDesc: 'لمبات LED فائقة السطوع، محولات زنون، وعدسات بروجكتر متطورة بتوصيل مباشر بفيش الوكالة دون تجريح أسلاك.',
      icon: <Lightbulb className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'lighting'
    },
    {
      id: 'exterior-accessories',
      title: 'الإكسسوارات الخارجية',
      shortDesc: 'إضافات زينة ولمسات جمالية وحمايات خارجية تمنح سيارتك طابعاً عصرياً مميزاً وتزيد من أناقتها على الطريق.',
      icon: <Sparkles className="w-5 h-5 text-[#d4af37]" />,
      catalogSection: 'exterior'
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0a0b0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            خدمات المتجر
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            الخدمات الأكثر طلباً
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
            حلول متكاملة للعناية بسيارتك وتطوير مظهرها وأدائها بأعلى معايير الإتقان في جدة حي طيبة.
          </p>
        </div>

        {/* 6 Luxury Minimal Text Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-[#121318] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-sm group"
            >
              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#181a24] border border-white/10 flex items-center justify-center shrink-0 text-[#d4af37]">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#e2c174] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Short Description (1-2 lines) */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Link: استكشف الخدمة */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('select-catalog-section', { detail: service.catalogSection }));
                  }}
                  className="text-xs font-semibold text-slate-300 hover:text-[#e2c174] inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-[-2px] cursor-pointer"
                >
                  <span>استكشف في التجهيزات</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
