import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'هل فك التظليل القديم يضر بخطوط تسخين الزجاج الخلفي أو يسبب خدوشاً؟',
      a: 'إطلاقاً! يتم استخدام أجهزة بخار ومذيبات صمغية متخصصة تفك التظليل القديم والمستعصي بنعومة تامة ودون استخدام أي شفرات حادة على خطوط التسخين، مما يضمن سلامة الزجاج 100% وبدون أي خدش.'
    },
    {
      q: 'ما هي مواعيد العمل الرسمية بالفرع؟',
      a: 'يفتح المحل أبوابه يومياً من الساعة ٩:٠٠ صباحاً وحتى الساعة ١:٣٠ بعد منتصف الليل لاستقبالكم وتجهيز سياراتكم طوال أيام الأسبوع.'
    },
    {
      q: 'هل التسوّق والتركيب متاح مباشرة في المحل بحي طيبة؟',
      a: 'نعم، يتوفر معرض متكامل ومجهز في حي طيبة بجدة لمعاينة الإكسسوارات والتلبيسات والشاشات وأنظمة الإنارة وتركيبها مباشرة في الموقع.'
    },
    {
      q: 'ما نوع العوازل الحرارية المستخدمة في التظليل؟',
      a: 'نوفر عوازل نانو سيراميك وكربون معتمدة تعزل حتى 98% من حرارة الأشعة تحت الحمراء، مع درجات شفافية نظامية متوافقة مع اشتراطات المرور وضمان رسمي على ثبات اللون وعدم تكوّن فقاعات.'
    },
    {
      q: 'هل تركيب الشاشات وإضاءات LED يتطلب تجريح أسلاك الوكالة؟',
      a: 'لا، جميع الشاشات والإضاءات تأتي بفيش إلى فيش (Plug and Play) مخصصة لموديل سيارتك ومطابقة للضفيرة الأصلية دون أي تجريح أو قص للأسلاك، للحفاظ الكامل على كهرباء وضمان الوكالة.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#0a0b0e] border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
            الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            معلومات هامة قبل زيارة الفرع
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            إجابات واضحة على استفسارات أصحاب السيارات حول مواعيد العمل، التظليل، وضمان سلامة الزجاج والكهرباء.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#121318] border border-white/10 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 text-white hover:text-[#e2c174] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-[#0a0b0e] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#d4af37]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
