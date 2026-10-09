import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ExternalLink, ShieldCheck, Check, MessageSquare } from 'lucide-react';
import { INITIAL_REVIEWS, STORE_INFO, StoreReview } from '../data/storeData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<StoreReview[]>(INITIAL_REVIEWS);
  const [activeTag, setActiveTag] = useState<string>('all');

  useEffect(() => {
    // Ensure Elfsight script initializes safely
    const scriptId = 'elfsight-platform-script';
    const existingScript = document.getElementById(scriptId) || document.querySelector('script[src*="elfsightcdn.com"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLike = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, likesCount: r.likesCount + 1 } : r))
    );
  };

  const filteredReviews = activeTag === 'all'
    ? reviews
    : reviews.filter(r => r.tags.includes(activeTag) || r.content.includes(activeTag));

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#0d0e12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161822] border border-white/10 text-xs font-semibold mb-3">
              {/* Google 4-Color Logo SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-white">تقييمات معتمدة ومربوطة مباشرة بـ Google Maps</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              آراء وتقييمات زوار برج الشارقة
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              تقييمات حقيقية موثقة ومحدثة حياً من صفحة المتجر الرسمية على خرائط Google.
            </p>
          </div>

          {/* Direct Google Action */}
          <div className="flex items-center">
            <a
              href={STORE_INFO.googleMapsReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-sm active:scale-98"
            >
              <span>مشاهدة كافة التقييمات على خرائط Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Elfsight Google Reviews Container (Live Sync Widget) */}
        <div className="mb-12 rounded-2xl bg-[#121318] border border-white/10 p-4 sm:p-6 shadow-xl overflow-hidden min-h-[140px]">
          <div className="elfsight-app-0f7994eb-bec9-4dcd-853b-c2d8d0ccdcf1" data-elfsight-app-lazy />
        </div>

        {/* Rating Overview Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 bg-[#121318] border border-white/10 rounded-2xl p-6 sm:p-8">
          
          {/* Big Score (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b lg:border-b-0 lg:border-l border-white/10">
            <span className="text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
              4.3
            </span>
            <div className="flex gap-1 text-amber-400 my-2.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i === 4 ? 'fill-amber-400/30 text-amber-400' : 'fill-amber-400 text-amber-400'}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-white">
              استناداً إلى {STORE_INFO.reviewCount} تقييماً موثقاً
            </span>
            <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>تم التحقق من الحسابات عبر Google Maps</span>
            </span>
          </div>

          {/* Rating Bars (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
            {[
              { stars: 5, pct: 75, count: 41 },
              { stars: 4, pct: 15, count: 8 },
              { stars: 3, pct: 5, count: 3 },
              { stars: 2, pct: 3, count: 2 },
              { stars: 1, pct: 2, count: 1 },
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-3 text-xs text-slate-400">
                <span className="w-3 text-center tabular-nums font-semibold text-slate-300">{row.stars}</span>
                <div className="flex-1 h-2 bg-[#0a0b0e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c5a059] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-left tabular-nums text-slate-400">{row.count}</span>
              </div>
            ))}
          </div>

          {/* Tags Filter (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <span className="text-xs font-semibold text-slate-300 mb-3 block">
              أبرز الكلمات في التقييمات:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTag === 'all'
                    ? 'bg-[#c5a059] text-slate-950 font-bold'
                    : 'bg-[#0a0b0e] border border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                الكل (55)
              </button>
              {STORE_INFO.popularTags.map(tag => (
                <button
                  key={tag.label}
                  onClick={() => setActiveTag(tag.label)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTag === tag.label
                      ? 'bg-[#c5a059] text-slate-950 font-bold'
                      : 'bg-[#0a0b0e] border border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{tag.label}</span>
                  <span className="text-[10px] opacity-75 tabular-nums">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Real Customer Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121318] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/25 transition-colors"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#181a24] border border-white/10 flex items-center justify-center text-[#d4af37] font-bold text-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {rev.author}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        {rev.badge && <span className="text-emerald-400">{rev.badge}</span>}
                        {rev.reviewCount && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{rev.reviewCount}</span>
                          </>
                        )}
                        {rev.photoCount && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{rev.photoCount}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 tabular-nums">
                    {rev.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Actual Review Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  "{rev.content}"
                </p>
              </div>

              {/* Bottom Verification & Google Maps Link */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <a
                  href={STORE_INFO.googleMapsReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#d4af37] hover:underline"
                >
                  <span>عرض المراجعة على Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
                  aria-label="أعجبني هذا التعليق"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums font-semibold">{rev.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Direct CTA banner to Google Maps */}
        <div className="mt-10 p-6 rounded-2xl bg-[#121318] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <h3 className="text-base font-bold text-white">
              هل زرت برج الشارقة مؤخراً؟
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              رأيك يهمنا ويساعد أصحاب السيارات في جدة حي طيبة في اختيار الأفضل لسياراتهم.
            </p>
          </div>

          <a
            href={STORE_INFO.googleMapsWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all whitespace-nowrap shrink-0"
          >
            <span>أضف تقييمك على خرائط Google الآن</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
