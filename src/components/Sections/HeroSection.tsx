import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Secure local asset filesystem paths preserved
import apiaryLive from '@/assets/images/apiary-live.jpg';
import heroHoney from '@/assets/images/hero-honey.png';
import productionHub from '@/assets/images/production-hub.jpg';
import harvestTime from '@/assets/images/harvest-time.jpg';
import communitySupport from '@/assets/images/community-support.jpg';

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
    // SYMMETRY FIX: Replaced elastic viewport variables with a compact, standardized container size.
    // Clears the fixed navbar with mt-16 md:mt-24 and keeps the image frame cute, tidy, and proportional across all screens.
    <section className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-33.75 w-full overflow-hidden bg-gray-100 text-gray-800">

      {/* Background Slides Engine */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={s.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover select-none image-rendering-crisp"
          />
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      {/* CONTENT AREA CONTAINER: Applied perfect top-to-bottom pixel symmetry (py-20 md:py-28)
          This eliminates the overly long vertical look, making it clean and cozy on mobile screens. */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 sm:py-24 md:py-28 flex flex-col justify-center">
        <div className="max-w-3xl space-y-4 md:space-y-5">

          {/* Symmetrical Rounded Eyebrow Badge */}
          <div className={`font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs bg-black/10 backdrop-blur-xs w-fit px-3 py-1 rounded-full ${slide.textColor}`}>
            {slide.eyebrow}
          </div>

          {/* Main Title Heading - Clean fluid typography for easy mobile reading */}
          <h1 className={`${slide.textColor} whitespace-pre-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.15] max-w-4xl`}>
            {slide.title}
          </h1>

          {/* Subtitle Description */}
          <p className={`${slide.textColor} text-xs sm:text-sm md:text-base max-w-xl font-medium opacity-90 leading-relaxed pt-1`}>
            {slide.subtitle}
          </p>

          {/* Action Trigger Button */}
          <div className="pt-2">
            <Link
              to={slide.cta1.href as "/"}
              className={`${slide.btnColor} text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm inline-flex items-center text-xs font-bold uppercase tracking-wider`}
            >
              {slide.cta1.label} <ArrowRight className="ml-2" size={14} />
            </Link>
          </div>

        </div>
      </div>

      {/* Symmetrical Carousel Round Control Badges */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 z-20 flex gap-2.5">
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-all ${
            isDarkSlide
              ? 'border-white/30 text-white hover:bg-white hover:text-gray-900'
              : 'border-gray-300 text-gray-900 hover:bg-green-700 hover:text-white hover:border-green-700'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-all ${
            isDarkSlide
              ? 'border-white/30 text-white hover:bg-white hover:text-gray-900'
              : 'border-gray-300 text-gray-900 hover:bg-green-700 hover:text-white hover:border-green-700'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={15} />
        </button>
      </div>

    </section>
  );
}
