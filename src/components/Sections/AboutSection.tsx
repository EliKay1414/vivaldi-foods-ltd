import { Link } from '@tanstack/react-router';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import apiaryImg from '@/assets/images/apiary-live.jpg';
import productSmall from '@/assets/products/products-500g.png';

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
    // COMPACT SPACING: Standardized vertical paddings matching the clean layout framework (py-12 md:py-16)
    <section className="py-12 md:py-16 bg-amber-50/20 overflow-hidden text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side: Image Collage */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pr-4 md:pr-8"
          >
            <div className="relative z-10">
              {/* Main Image Base with clean rounded borders */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white p-1.5">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                  src={apiaryImg}
                  alt="Vivaldi Apiary"
                  className="w-full h-80 md:h-96 object-cover rounded-xl"
                />
              </div>

              {/* Floating Product Image - Symmetrical 500g bottle badge housing */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-8 -right-4 w-48 md:w-56 bg-white shadow-md border-4 border-white rounded-xl overflow-hidden z-20 hidden sm:block"
              >
                <img src={productSmall} alt="Volta Premium Honey" className="w-full h-auto p-4 bg-gray-50/50 rounded-lg" />
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
              Vivaldi Foods Ltd. is a growing food processing company committed to delivering high
              quality, safe, and responsibly packaged food products to consumers. The company is
              focused on building a trusted brand within the food industry through strict quality
              standards, innovation, and efficient processing practices. Its flagship product,
              <span className="text-green-700 font-bold"> Volta Premium Honey,</span> is carefully sourced from the Volta Region of Ghana and packaged in accordance with the highest food safety and hygiene standards to ensure purity, consistency, and customer satisfaction.
            </motion.p>

            {/* Symmetrical Features Sub-Grid Directory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Premium Foods', desc: 'Carefully crafted for quality and taste' },
                { title: 'Trusted Sourcing', desc: 'Sourced from reliable suppliers' },
                { title: 'Clean Handling', desc: 'Handled with care from source to bottle' },
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
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm group"
              >
                Make an Enquiry
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={13} />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
