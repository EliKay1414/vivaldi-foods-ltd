import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import FiltrationImg from '@/assets/factory/Filtration.webp';
import Packaging1Img from '@/assets/factory/Packaging1.webp';
import Packaging2Img from '@/assets/factory/Packaging2.webp';
import HeatingImg from '@/assets/factory/Pre-heating.webp';
import ApiaryImg from '@/assets/images/apiary-live.webp';
import HeroImg from '@/assets/images/hero-honey.webp';

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
    a: "All our products go through continuous quality checks at every stage — from harvesting to packaging. We operate under Ghana's food regulatory standards and keep detailed compliance records",
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
    /* FIXED ASPECT SHIFT: Pre-calculates exact dimensions on compile runs to drop shift indices */
    <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-4/3 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white p-1.5">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover rounded-xl select-none"
        />
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden text-gray-800 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column Information Area */}
          <div className="space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
              FAQ's
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              Everything you need to know about Vivaldi Foods Ltd, our premium products, and our quality standards.
            </p>
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm cursor-pointer"
              >
                Get a Quote
              </Link>
            </div>

            <div className="pt-4 w-full">
              <ImageSlider images={faqImages} />
            </div>
          </div>

          {/* Right Column Area: Standard High-Contrast Accordion Directory List */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 w-full lg:mt-4">
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
      </div>
    </section>
  );
}
