import { Link } from '@tanstack/react-router';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import apiaryImg from '@/assets/Hero/apiary-live.webp';
import productSmall from '@/assets/products/products-500g.webp';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <section className="py-12 md:py-16 bg-amber-50/20 overflow-hidden text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side: Image Collage */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pr-4 md:pr-8 w-full"
          >
            <div className="relative z-10 w-full">
              {/* Main Image Base with clean rounded borders and fixed aspect framework */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white p-1.5 w-full aspect-4/3 sm:aspect-square md:aspect-4/3">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                  src={apiaryImg}
                  alt="Vivaldi Apiary"
                  className="w-full h-full object-cover rounded-xl select-none"
                />
              </div>

              {/* Floating Product Image - Symmetrical 500g bottle badge housing with explicit aspect ratio rules */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-8 -right-4 w-44 md:w-52 aspect-3/4 bg-white shadow-md border-4 border-white rounded-xl overflow-hidden z-20 hidden sm:block p-1"
              >
                <img src={productSmall} alt="Volta Premium Honey" className="w-full h-full object-contain p-2 bg-gray-50/50 rounded-lg select-none" />
              </motion.div>
            </div>

            {/* Background Decorative Frame Line Vector */}
            <div className="absolute -bottom-6 -left-6 w-56 h-56 border-2 border-green-700/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Right Side: Content Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-5"
          >
            {/* Symmetrical Header Eyebrow Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
                About Vivaldi Foods
              </span>
            </motion.div>

            {/* Core Mission Copy Description */}
            <motion.p variants={itemVariants} className="text-gray-600 text-sm md:text-base leading-relaxed antialiased">
              At Vivaldi Foods Ltd, we make clean, healthy, and high-quality food for you and your family.
              We work hard to bring you products you can trust every day. Our main product,
              <span className="text-green-700 font-bold"> Volta Premium Honey,</span> comes straight from the green forests of the Volta Region. We bottle every drop in a clean, safe factory so you get sweet, 100% pure honey every single time.
            </motion.p>

            {/* Symmetrical Features Sub-Grid Directory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Pure Honey', desc: 'Sweet, natural, and rich in good taste' },
                { title: 'Trusted Sourcing', desc: 'Direct from hardworking local beekeepers' },
                { title: 'Clean Handling', desc: 'Bottled with care in a clean factory' },
                { title: 'Ready Supply', desc: 'Available for homes, shops, and bulk buyers' },
              ].map((item) => (
                <motion.div
                  variants={itemVariants}
                  key={item.title}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-50 shadow-xs"
                >
                  <div className="mt-0.5 shrink-0 bg-green-50 p-1 rounded-lg text-green-700">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-bold text-gray-900 tracking-tight leading-tight">
                      {item.title}
                    </h5>
                    <p className="text-gray-500 text-[11px] md:text-xs leading-normal pt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action Navigation Trigger Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm group cursor-pointer"
              >
                Shop Now
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={13} />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
