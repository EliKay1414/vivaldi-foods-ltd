import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Assets
import apiaryLive from '@/assets/images/apiary-live.jpg';
import heroHoney from '@/assets/images/hero-honey.png';
import productionHub from '@/assets/images/production-hub.jpg';
import harvestTime from '@/assets/images/harvest-time.jpg';
import communitySupport from '@/assets/images/community-support.jpg';

const slides = [
  {
    eyebrow: 'Pure. Authentic. Premium Quality.',
    title: "Sourced from the\nVolta Region\nto Your Home",
    subtitle: 'Vivaldi Foods Ltd delivers safe, 100% pure honey and food products directly from our Volta Region apiaries.',
    cta1: { label: 'Make an Enquiry', href: '/contact' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-brand-green hover:bg-brand-brown',
    image: productionHub,
  },
  {
    eyebrow: 'Guaranteed 100% Pure Honey',
    title: 'Strict Quality Control\n& Pure Honey Sourcing',
    subtitle: 'Every batch of honey is carefully handled to guarantee absolute freshness and customer trust.',
    cta1: { label: 'Our Mission', href: '/about' },
    textColor: 'text-white',
    overlay: 'bg-black/60',
    btnColor: 'bg-brand-green hover:bg-brand-brown',
    image: apiaryLive,
  },
  {
    eyebrow: 'Sustainable Harvesting',
    title: 'Ethical Beekeeping\nIn Every Drop',
    subtitle: 'We prioritize bee health and sustainable practices to bring you nature’s finest honey.',
    cta1: { label: 'Learn More', href: '/about' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-brand-green hover:bg-brand-brown',
    image: harvestTime,
  },
  {
    eyebrow: 'Community Impact',
    title: 'Supporting Volta Oti Local Growth',
    subtitle: 'Supporting local beekeepers through the Volta and Oti Beekeepers Cooperative Union.',
    cta1: { label: 'Our Impact', href: '/community-impact' },
    textColor: 'text-white',
    overlay: 'bg-black/50',
    btnColor: 'bg-brand-green hover:bg-brand-brown',
    image: communitySupport,
  },
  {
    eyebrow: 'Wholesale & Retail Markets',
    title: 'Supplying Leading Supermarkets & Households',
    subtitle: (
      <span className="text-brown text-opacity-30 font-bold">
        Providing natural, chemical-free honey products to meet healthy consumer demands across Ghana.
      </span>
    ),
    cta1: { label: 'Make an Enquiry', href: '/contact' },
    textColor: 'text-brand-brown',
    overlay: 'bg-white/40',
    btnColor: 'bg-brand-brown hover:bg-brand-green',
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
    <section className="relative min-h-170 h-screen overflow-hidden bg-brown-50">
      {/* Background Slides */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center container-custom pt-24 md:pt-28 pb-24 md:pb-20">
        <div className="max-w-3xl mt-8 md:mt-10 lg:mt-12">
          <div className={`font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-4 md:mb-5 ${slide.textColor}`}>
            {slide.eyebrow}
          </div>
          <h1 className={`${slide.textColor} mb-5 md:mb-6 whitespace-pre-line text-[clamp(2.35rem,7vw,4.9rem)] font-bold leading-[1.05] max-w-4xl`}>
            {slide.title}
          </h1>
          <p className={`${slide.textColor} text-base md:text-lg mb-7 md:mb-9 max-w-xl font-light opacity-90 leading-relaxed`}>
            {slide.subtitle}
          </p>
          <div className="flex gap-4">
            <Link
              to={slide.cta1.href as "/"}
              className={`${slide.btnColor} text-white px-6 md:px-8 py-3.5 md:py-4 rounded-none transition-colors flex items-center text-xs md:text-sm font-bold uppercase tracking-widest`}
            >
              {slide.cta1.label} <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex gap-3 md:gap-4">
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all ${
            isDarkSlide ? 'border-white/30 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-brand-green hover:text-white hover:border-brand-green'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all ${
            isDarkSlide ? 'border-white/30 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-brand-green hover:text-white hover:border-brand-green'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
