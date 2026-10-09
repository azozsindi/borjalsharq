import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBackground?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showBackground = false,
  className = ''
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('borj_alsharq_custom_logo');
      if (saved) setCustomLogoUrl(saved);
    }
  }, []);

  const dimensions = {
    sm: {
      carWidth: 150,
      carHeight: 28,
      mainText: 'text-lg',
      subText: 'text-xs',
      container: 'py-2 px-3',
      imgHeight: 'h-10 sm:h-12'
    },
    md: {
      carWidth: 210,
      carHeight: 40,
      mainText: 'text-2xl',
      subText: 'text-sm',
      container: 'py-3 px-4',
      imgHeight: 'h-14 sm:h-16'
    },
    lg: {
      carWidth: 300,
      carHeight: 56,
      mainText: 'text-3xl md:text-4xl',
      subText: 'text-base md:text-lg',
      container: 'py-5 px-6',
      imgHeight: 'h-24 sm:h-28'
    },
    hero: {
      carWidth: 380,
      carHeight: 72,
      mainText: 'text-4xl sm:text-5xl md:text-6xl',
      subText: 'text-xl sm:text-2xl md:text-3xl',
      container: 'py-8 px-6 sm:px-10',
      imgHeight: 'h-32 sm:h-36'
    }
  }[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none text-center ${
        showBackground
          ? 'bg-classic-wood-slats rounded-2xl border border-white/10 shadow-2xl shadow-black/90'
          : ''
      } ${dimensions.container} ${className}`}
    >
      {/* If custom logo image is provided or saved, display it; otherwise render signature luxury gold emblem */}
      {customLogoUrl && !imageError ? (
        <div className="relative flex flex-col items-center justify-center">
          <img
            src={customLogoUrl}
            alt="شعار برج الشارقة لزينة السيارات"
            onError={() => setImageError(true)}
            className={`${dimensions.imgHeight} w-auto max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
          />
        </div>
      ) : (
        <>
          {/* Aerodynamic Car Silhouette Vector - Classic Metallic Gold Lighting */}
          <div className="relative z-10 flex justify-center mb-1">
            <svg
              viewBox="0 0 400 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: `${dimensions.carWidth}px`, height: `${dimensions.carHeight}px` }}
              className="overflow-visible drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            >
              <defs>
                <linearGradient id="classicGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A059" />
                  <stop offset="35%" stopColor="#F5E4B2" />
                  <stop offset="65%" stopColor="#E6C875" />
                  <stop offset="100%" stopColor="#B38B3F" />
                </linearGradient>
              </defs>

              {/* Upper Aerodynamic Arch */}
              <path
                d="M 135 48 C 145 15, 230 4, 385 10 C 375 22, 360 38, 360 48"
                stroke="url(#classicGoldGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Main Coupe Roofline Sweep */}
              <path
                d="M 18 56 C 24 32, 60 20, 125 18 C 180 18, 260 27, 305 39"
                stroke="url(#classicGoldGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 18 56 L 16 58"
                stroke="url(#classicGoldGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Main Arabic Signboard Typography: "برج الشارقة" */}
          <div className="relative z-10 font-bold tracking-tight leading-none mb-1">
            <span
              className={`font-['Alexandria',sans-serif] font-black signboard-gold-text ${dimensions.mainText}`}
            >
              برج الشارقة
            </span>
          </div>

          {/* Subtitle Arabic Signboard Typography: "لزينة السيارات" */}
          <div className="relative z-10 font-semibold tracking-wide leading-tight">
            <span
              className={`font-['Alexandria',sans-serif] font-bold signboard-red-text ${dimensions.subText}`}
            >
              لزينة السيارات
            </span>
          </div>
        </>
      )}
    </div>
  );
};
