import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import apiaryLive from '@/assets/images/apiary-live.webp';
import productionHub from '@/assets/images/production-hub.webp';
import heroHoney from '@/assets/images/hero-honey.webp';
import packagingProduct1 from '@/assets/factory/Packaging1.webp';
import PackageProduct2 from '@/assets/factory/Packaging2.webp';

const services = [
  {
    num: '01',
    title: 'Premium Honey Production',
    desc: 'Pure honey sourced for homes, shops, and bulk buyers.',
    images: [apiaryLive],
    tag: 'Honey Supply',
  },
  {
    num: '02',
    title: 'Processing & Packaging',
    desc: 'Clean handling and packaging that keeps the product ready for customers.',
    images: [productionHub, packagingProduct1, PackageProduct2],
    tag: 'Clean Packaging',
  },
  {
    num: '03',
    title: 'Product Categories',
    desc: 'Supply support for retailers, distributors, and households.',
    images: [heroHoney],
    tag: 'Retail & Wholesale',
  },
];

function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover rounded-xl"
        />
      </AnimatePresence>
    </div>
  );
}

export default function ServicesSection() {
  return (
    /* COMPACT SPACING PARADIGM: Synchronized spacing tokens across all homepage view section decks (py-12 md:py-16) */
    <section className="py-12 md:py-16 bg-white border-t border-gray-100 relative overflow-hidden text-gray-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER SECTION REFACTOR */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-1.5 flex flex-col items-start text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
              Our Expertise
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
              Simple, Clean Food Processing
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm shrink-0 w-full sm:w-auto cursor-pointer"
          >
            View Products <ArrowRight size={14} />
          </Link>
        </div>

        {/* Services List Loop Directory */}
        <div className="border-t border-gray-100 max-w-5xl mx-auto">
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to="/contact"
                search={{ subject: svc.title }}
                className="group border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-8 md:py-10 px-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* List Structural Counter */}
                <span className="font-display font-bold text-5xl md:text-6xl text-gray-200/80 group-hover:text-green-700 transition-colors w-20 shrink-0">
                  {svc.num}
                </span>

                {/* Main Copy Context */}
                <div className="flex-1 space-y-1">
                  <span className="inline-block text-[10px] font-bold text-green-700 uppercase tracking-widest">
                    {svc.tag}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                    {svc.desc}
                  </p>
                </div>

                {/* SLIDER CONTROLLER REFACTOR: Explicit strict dual-aspect ratios assigned for layout stability */}
                <div className="w-full md:w-56 aspect-4/3 md:aspect-2/1 overflow-hidden shadow-sm rounded-xl border border-gray-100 bg-gray-50 shrink-0 p-1">
                  <ImageSlider images={svc.images} />
                </div>

                {/* Symmetrical Interactive Vector Action Arrow Housing */}
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center shrink-0 group-hover:bg-green-700 group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
