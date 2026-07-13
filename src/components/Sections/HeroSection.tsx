import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Legacy standard fallback routes preserved
import apiaryLive from '@/assets/images/Apiary-live.png';
import heroHoney from '@/assets/images/hero-honey.png';
import productionHub from '@/assets/images/production-hub.png';
import harvestTime from '@/assets/images/harvest-time.png';
import communitySupport from '@/assets/images/community-support.png';

// NEXT-GEN WEBP ALTERNATIVES: Explicitly maps the new high-performance webp copies you will drop in your assets folder
import apiaryLiveWebp from '@/assets/images/apiary-live.webp';
import heroHoneyWebp from '@/assets/images/hero-honey.webp';
import productionHubWebp from '@/assets/images/production-hub.webp';
import harvestTimeWebp from '@/assets/images/harvest-time.webp';
import communitySupportWebp from '@/assets/images/community-support.webp';

const slides = [
  {
    eyebrow: 'Pure. Authentic. Premium Quality.',
    title: "Freshly sourced from the\nVolta Region",
    subtitle: 'Vivaldi Foods Ltd delivers safe, 100% pure honey and food products directly from our Volta Region apiaries.',
    cta1: { label: 'Make an Enquiry', href: '/contact' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-green-700 hover:bg-green-800',
    image: productionHub,
    webp: productionHubWebp,
  },
  {
    eyebrow: 'Guaranteed 100% Pure Honey',
    title: 'Strict Quality\n& Checks',
    subtitle: 'Every batch of honey is carefully handled to guarantee absolute freshness and customer trust.',
    cta1: { label: 'Our Mission', href: '/about' },
    textColor: 'text-white',
    overlay: 'bg-black/60',
    btnColor: 'bg-green-700 hover:bg-green-800',
    image: apiaryLive,
    webp: apiaryLiveWebp,
  },
  {
    eyebrow: 'Sustainable Harvesting',
    title: 'Ethical Beekeeping\nIn Every Drop',
    subtitle: 'We prioritize bee health and sustainable practices to bring you nature’s finest honey.',
    cta1: { label: 'Learn More', href: '/about' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-green-700 hover:bg-green-800',
    image: harvestTime,
    webp: harvestTimeWebp,
  },
  {
    eyebrow: 'Community Impact',
    title: 'Supporting Volta Oti Local Growth',
    subtitle: 'Supporting local beekeepers through the Volta and Oti Beekeepers Cooperative Union.',
    cta1: { label: 'Our Impact', href: '/community-impact' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-green-700 hover:bg-green-800',
    image: communitySupport,
    webp: communitySupportWebp,
  },
  {
    eyebrow: 'Wholesale & Retail Markets',
    title: 'Supplying Leading Supermarkets & Households',
    subtitle: 'Providing natural, chemical-free honey products to meet healthy consumer demands across Ghana.',
    cta1: { label: 'Make an Enquiry', href: '/contact' },
    textColor: 'text-gray-900',
    overlay: 'bg-amber-50/40',
    btnColor: 'bg-green-700 hover:bg-green-800',
    image: heroHoney,
    webp: heroHoneyWebp,
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const isDarkSlide = slide.textColor === 'text-white';

  return (
    <section className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-33.75 w-full aspect-16/7 md:aspect-21/8 min-h-100 md:min-h-115 overflow-hidden bg-gray-100 text-gray-800 flex flex-col justify-center">

      {/* Background Slides Engine */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          {/* NATIVE LIGHTHOUSE OPTIMIZATION PARADIGM: The <picture> element handles automated
              WebP delivery shifts with standard legacy JPG fallbacks natively */}
          <picture className="w-full h-full">
            <source srcSet={s.webp} type="image/webp" />
            <img
              src={s.image}
              alt=""
              loading={i === current ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === current ? "high" : "low"} // Forces Google crawler to download the first active slice instantly
              className="w-full h-full object-cover object-center select-none image-rendering-crisp"
            />
          </picture>
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      {/* Content Area Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-8 sm:py-12 md:py-16 flex flex-col justify-center">
        <div className="max-w-3xl space-y-2 sm:space-y-3 md:space-y-4">
          <div className={`font-bold tracking-[0.2em] uppercase text-[9px] sm:text-xs bg-black/10 backdrop-blur-xs w-fit px-2.5 py-0.5 rounded-full ${slide.textColor}`}>
            {slide.eyebrow}
          </div>
          <h1 className={`${slide.textColor} whitespace-pre-line text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-[1.15] max-w-4xl`}>
            {slide.title}
          </h1>
          <p className={`${slide.textColor} text-[11px] sm:text-xs md:text-sm max-w-xl font-medium opacity-90 leading-relaxed`}>
            {slide.subtitle}
          </p>
          <div className="pt-1">
            <Link
              to={slide.cta1.href as "/"}
              className={`${slide.btnColor} text-white px-4 py-2 rounded-xl transition-all shadow-sm inline-flex items-center text-[11px] font-bold uppercase tracking-wider`}
            >
              {slide.cta1.label} <ArrowRight className="ml-1.5" size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-3 right-6 sm:bottom-4 z-20 flex gap-2">
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all ${
            isDarkSlide ? 'border-white/30 text-white hover:bg-white hover:text-gray-900' : 'border-gray-300 text-gray-900 hover:bg-green-700 hover:text-white hover:border-green-700'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all ${
            isDarkSlide ? 'border-white/30 text-white hover:bg-white hover:text-gray-900' : 'border-gray-300 text-gray-900 hover:bg-green-700 hover:text-white hover:border-green-700'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
