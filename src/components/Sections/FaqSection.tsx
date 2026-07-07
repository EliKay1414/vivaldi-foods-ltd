import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import FiltrationImg from '@/assets/factory/Filtration.png';
import Packaging1Img from '@/assets/factory/Packaging1.png';
import Packaging2Img from '@/assets/factory/Packaging2.png';
import HeatingImg from '@/assets/factory/Pre-heating.png';
import ApiaryImg from '@/assets/images/apiary-live.jpg';
import HeroImg from '@/assets/images/hero-honey.png';

const faqImages = [FiltrationImg, Packaging1Img, Packaging2Img, HeatingImg, ApiaryImg, HeroImg];

const faqs = [
  {
    q: 'Is your honey 100% pure, no additives?',
    a: 'Yes. We never add sugar, water, or preservatives. Every batch comes straight from our apiaries and goes through filtration only, nothing else is added before it reaches you.',
  },
  {
    q: 'Where does your honey come from?',
    a: 'Our bees are kept at our own apiaries in Adaaklu, Volta Region. We manage the hives ourselves, which means we control quality right from the source.',
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
    a: 'Yes, we welcome visits by arrangement. Our main factory and apiaries are located in Adaaklu, Volta Region. Reach out through our contact page to schedule a visit.',
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
    <div className="relative w-full h-64 overflow-hidden rounded-sm shadow-lg border border-brand-brown/10">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-spacing bg-brand-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column — same as before */}
          <div>
            <span className="text-label block mb-3">FAQ's</span>
            <h2 className="text-brand-brown mb-6">Frequently Asked Questions</h2>
            <p className="text-body text-brand-brown/70 leading-relaxed mb-8">
              Everything you need to know about Vivaldi Foods Ltd, our premium products, and our quality standards.
            </p>
            <a href="/contact" className="btn-corporate">Get a Quote</a>

            <div className="mt-8">
              <ImageSlider images={faqImages} />
            </div>
          </div>

          {/* Right column — WhatsApp-style accordion */}
          <div className="divide-y divide-brand-brown/10">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-0 py-5 text-left gap-4 group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[15px] font-semibold leading-snug transition-colors ${
                        isOpen ? 'text-brand-green' : 'text-brand-brown group-hover:text-brand-green'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-green' : 'text-brand-brown/40 group-hover:text-brand-green'
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
                        <p className="pb-5 pr-8 text-[14px] text-brand-brown/65 leading-relaxed">
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
