import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import apiaryLive from '@/assets/images/apiary-live.jpg';
import productionHub from '@/assets/images/production-hub.jpg';
import heroHoney from '@/assets/images/hero-honey.png';
import packagingProduct1 from '@/assets/factory/Packaging1.png';
import PackageProduct2 from '@/assets/factory/Packaging2.png';

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

/**
 * ImageSlider Component
 * Handles auto-cycling through arrays of images
 */
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
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="section-spacing bg-brand-cream relative overflow-hidden">
      <div className="container-custom">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-(--space-md) mb-16">
          <div className="sec-title mb-0">
            <span className="sub-title">Our Expertise</span>
            <h2 className="text-brand-brown">
              Simple, Clean Food Processing
            </h2>
          </div>
          <Link to="/products" className="btn-corporate shrink-0">
            View Products <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>

        {/* Services List */}
        <div className="border-t border-brand-brown/10">
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
                className="group border-b border-brand-brown/10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-10 hover:bg-white/50 transition-all duration-500"
              >
                {/* Number */}
                <span className="font-display font-bold text-5xl md:text-6xl text-brand-brown/10 group-hover:text-brand-green transition-colors w-20 shrink-0">
                  {svc.num}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <span className="inline-block text-[10px] font-bold text-brand-green uppercase tracking-[0.3em] mb-3">
                    {svc.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-brand-brown group-hover:text-brand-green transition-colors mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-slate-body text-base max-w-2xl leading-relaxed opacity-80">
                    {svc.desc}
                  </p>
                </div>

                {/* Responsive Slider/Image Container */}
                <div className="w-full md:w-64 h-48 md:h-32 overflow-hidden shadow-lg rounded-sm bg-brand-brown/5">
                  <ImageSlider images={svc.images} />
                </div>

                {/* Action Arrow */}
                <div className="w-12 h-12 bg-brand-brown text-white flex items-center justify-center shrink-0 group-hover:bg-brand-green transition-colors">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
