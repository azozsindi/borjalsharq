import React, { useState, useEffect } from 'react';
import { subscribeToStoreLogo, DEFAULT_LOGO_URL } from '../services/logoService';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBackground?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showBackground = false,
  className = '',
  onClick
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('/logo.webp');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToStoreLogo((url) => {
      if (url) {
        setCustomLogoUrl(url);
        setImageError(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const logoSrc = customLogoUrl || '/logo.webp';
  const showImage = Boolean(logoSrc && !imageError);

  const dimensions = {
    sm: {
      carWidth: 140,
      carHeight: 26,
      mainText: 'text-base sm:text-lg',
      subText: 'text-[10px] sm:text-xs',
      container: 'py-1 px-2',
      imgHeight: 'h-10 sm:h-12'
    },
    md: {
      carWidth: 200,
      carHeight: 38,
      mainText: 'text-xl sm:text-2xl',
      subText: 'text-xs sm:text-sm',
      container: 'py-2 px-3',
      imgHeight: 'h-14 sm:h-16'
    },
    lg: {
      carWidth: 280,
      carHeight: 52,
      mainText: 'text-2xl sm:text-3xl md:text-4xl',
      subText: 'text-sm sm:text-base md:text-lg',
      container: 'py-3 px-4',
      imgHeight: 'h-20 sm:h-24'
    },
    hero: {
      carWidth: 350,
      carHeight: 66,
      mainText: 'text-3xl sm:text-4xl md:text-5xl',
      subText: 'text-lg sm:text-xl md:text-2xl',
      container: 'py-4 px-6',
      imgHeight: 'h-24 sm:h-28'
    }
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none text-center ${
        showBackground
          ? 'bg-classic-wood-slats rounded-2xl border border-white/10 shadow-2xl shadow-black/90'
          : ''
      } ${dimensions.container} ${className}`}
    >
      {/* Official store logo image */}
      {showImage ? (
        <div className="relative flex flex-col items-center justify-center">
          <img
            src={logoSrc}
            alt="شعار برج الشارقة لزينة السيارات"
            onError={() => setImageError(true)}
            className={`${dimensions.imgHeight} w-auto max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          {/* Aerodynamic Car Silhouette Vector - Classic Metallic Gold Lighting */}
          <div className="relative z-10 flex justify-center mb-0.5">
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
              className={`font-['Alexandria','Tajawal',sans-serif] font-black signboard-gold-text ${dimensions.mainText}`}
            >
              برج الشارقة
            </span>
          </div>

          {/* Subtitle Arabic Signboard Typography: "لزينة السيارات" */}
          <div className="relative z-10 font-semibold tracking-wide leading-tight">
            <span
              className={`font-['Alexandria','Tajawal',sans-serif] font-bold signboard-red-text ${dimensions.subText}`}
            >
              لزينة السيارات
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
