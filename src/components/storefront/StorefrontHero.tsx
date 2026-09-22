import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import banner330g from '@/assets/banners/banner-330g.webp';
import banner500g from '@/assets/banners/banner-500g.webp';
import banner330gMobile from '@/assets/banners/banner-330g-mobile.webp';
import banner500gMobile from '@/assets/banners/banner-500g-mobile.webp';
import bannerQuality from '@/assets/banners/banner-quality.webp';
import bannerQualityMobile from '@/assets/banners/banner-quality-mobile.webp';

interface StorefrontHeroProps {
  onScrollToProducts: () => void;
}

const slides = [
  {
    id: 1,
    desktopImage: banner330g,
    mobileImage: banner330gMobile,
    alt: 'Volta Premium Honey - 330g Bottle',
  },
  {
    id: 2,
    desktopImage: banner500g,
    mobileImage: banner500gMobile,
    alt: 'Volta Premium Honey - 500g Family Size',
  },
  {
    id: 3,
    desktopImage: bannerQuality,
    mobileImage: bannerQualityMobile,
    alt: 'Volta Premium Honey - 100% Pure Honey Tested & Certified',
  },
];

export const StorefrontHero: React.FC<StorefrontHeroProps> = ({ onScrollToProducts }) => {
  const [current, setCurrent] = useState(0);

  // Preload all banner images immediately to prevent any lag or stutter
  useEffect(() => {
    slides.forEach((s) => {
      const imgDesktop = new Image();
      imgDesktop.src = s.desktopImage;
      const imgMobile = new Image();
      imgMobile.src = s.mobileImage;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-amber-50/20 select-none">
      {/* Mobile-to-Desktop Hero Container: 4:5 portrait on mobile (covers screen edge-to-edge), cinematic widescreen on desktop */}
      <div className="relative w-full aspect-4/5 sm:aspect-4/3 md:aspect-21/9 lg:aspect-23/9 md:max-h-145 overflow-hidden flex items-center justify-center">

        {/* Background Banner Carousel with seamless crossfade (zero black flash, zero lag) */}
        {slides.map((s, idx) => (
          <div
            key={s.id}
            onClick={onScrollToProducts}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              idx === current ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Responsive Art-Directed Banner (Oraimo Pattern):
                - On mobile (<768px): 4:5 portrait banner where headline, bottle, and honeycomb cover the screen edge-to-edge
                - On desktop (>=768px): 21:9 cinematic banner spanning full width */}
            <picture className="w-full h-full block">
              <source media="(min-width: 768px)" srcSet={s.desktopImage} />
              <img
                src={s.mobileImage}
                alt={s.alt}
                className="w-full h-full object-cover object-center select-none"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>
          </div>
        ))}

        {/* Banner CTA Button (Oraimo Style - "Shop Now") positioned cleanly on the table area */}
        <div className="absolute inset-0 z-10 max-w-6xl mx-auto px-3 sm:px-8 md:px-12 flex items-end pb-2.5 sm:pb-6 md:pb-10 pointer-events-none">
          <button
            type="button"
            onClick={onScrollToProducts}
            className="pointer-events-auto px-3 py-1.5 sm:px-6 sm:py-2.5 md:px-7 md:py-3.5 bg-green-700 hover:bg-green-600 text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-xl hover:shadow-green-900/40 transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ShoppingCart size={13} className="sm:w-4 sm:h-4" />
            <span>Shop Now</span>
            <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Carousel Navigation Chevron Arrows (Oraimo Style) */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-1.5 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 cursor-pointer"
          aria-label="Previous Banner"
        >
          <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-1.5 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 cursor-pointer"
          aria-label="Next Banner"
        >
          <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>

        {/* Carousel Bottom Pagination Dots (Oraimo Style) */}
        <div className="absolute bottom-1.5 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? 'w-5 sm:w-7 md:w-8 bg-green-500 shadow-xs' : 'w-1 sm:w-1.5 md:w-2 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorefrontHero;
