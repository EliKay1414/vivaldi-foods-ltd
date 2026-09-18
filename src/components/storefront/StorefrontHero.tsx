import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import banner330g from '@/assets/banners/banner-330g.webp';
import banner500g from '@/assets/banners/banner-500g.webp';

interface StorefrontHeroProps {
  onScrollToProducts: () => void;
}

const slides = [
  {
    id: 1,
    image: banner330g,
    alt: 'Volta Premium Honey - 330g Bottle',
  },
  {
    id: 2,
    image: banner500g,
    alt: 'Volta Premium Honey - 500g Family Size',
  },
];

export const StorefrontHero: React.FC<StorefrontHeroProps> = ({ onScrollToProducts }) => {
  const [current, setCurrent] = useState(0);

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

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-gray-950 select-none">
      {/* Mobile-to-Desktop Native Aspect Ratio Container: 100% zoomed out so all details, bottles, and texts are crystal clear */}
      <div className="relative w-full aspect-1902/827 sm:aspect-[2.3/1] md:aspect-[2.3/1] lg:aspect-23/9 md:max-h-145 flex items-center">

        {/* Background Banner Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={onScrollToProducts}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Subtle bottom edge gradient to ensure controls stay distinct without darkening the artwork */}
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

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
