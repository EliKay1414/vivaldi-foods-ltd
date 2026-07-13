/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Image Assets Imports
import FiltrationImg from '@/assets/factory/Filtration.png';
import Packaging1Img from '@/assets/factory/Packaging1.png';
import Packaging2Img from '@/assets/factory/Packaging2.png';
import HeatingImg from '@/assets/factory/Pre-heating.png';
import ApiaryImg from '@/assets/images/apiary-live.webp';
import HeroImg from '@/assets/images/hero-honey.webp';

export const Route = createFileRoute('/faq')({
  component: FAQPage,
});

const faqImages = [FiltrationImg, Packaging1Img, Packaging2Img, HeatingImg, ApiaryImg, HeroImg];

const faqs = [
  {
    q: 'Is your honey 100% pure, no additives?',
    a: 'Yes. We never add sugar, water, or preservatives. Every batch comes straight from our apiaries and goes through filtration only, nothing else is added before it reaches you.',
  },
  {
    q: 'Where does your honey come from?',
    a: 'Our bees are kept at our own apiaries in Adaklu, Volta Region. We manage the hives ourselves, which means we control quality right from the source.',
  },
  {
    q: 'Who can buy from Vivaldi Foods?',
    a: 'Anyone. We supply supermarkets, wholesale distributors, and everyday households. We also export to international buyers who need certified, high-grade honey.',
  },
  {
    q: 'How do I know your products meet food safety standards?',
    a: "All our products go through continuous quality checks at every stage — from harvesting to packaging. We operate under Ghana's food regulatory standards and keep detailed compliance records.",
  },
  {
    q: 'Can I visit your factory or apiary?',
    a: 'Yes, we welcome visits by arrangement. Our main factory and apiaries are located in Adaklu, Volta Region. Reach out through our contact page to schedule a visit.',
  },
  {
    q: 'How do I place a bulk or wholesale order?',
    a: "Just send us an enquiry through the contact page or call us directly. We'll get back to you with pricing, available quantities, and delivery options.",
  },
];

function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

function FAQPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our honey, our process, and our commitment to food safety."
      />
      <FaqSection />
    </div>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">

      {/* INTRO HEADER REFACTOR: Centered perfectly to lock down top-level visual symmetry */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 space-y-4 flex flex-col items-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">
          FAQ's
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight leading-tight pt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium max-w-xl mx-auto pt-1">
          Everything you need to know about Vivaldi Foods Ltd, our premium products, and our strict quality standards.
        </p>
      </div>

      {/* Structured Multi-Column Action Section Grid */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

        {/* Left Column Area: Promotional Callouts & Cute Image Slider */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Still have queries or need custom adjustments?</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              Get in direct contact with our production support coordinators for rapid assistance on custom accounts.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm"
            >
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>

          <ImageSlider images={faqImages} />
        </div>

        {/* Right Column Area: Beautiful High-Contrast Accordion Directory List */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={i === 0 ? "pb-4" : "py-4 first:pt-0 last:pb-0"}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-4 group py-2"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm md:text-base font-bold leading-snug transition-colors ${
                      isOpen ? 'text-green-700' : 'text-gray-800 group-hover:text-green-700'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-green-700' : 'text-gray-400 group-hover:text-green-700'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-2 pr-4 text-xs md:text-sm text-gray-500 leading-relaxed antialiased">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
