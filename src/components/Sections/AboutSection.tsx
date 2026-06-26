import { Link } from '@tanstack/react-router';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import apiaryImg from '@/assets/images/apiary-live.jpg';
import productSmall from '@/assets/products/products-500g.png';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

   return (
    <section className="section-spacing bg-brand-cream overflow-hidden selection-corporate">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left Side: Image Collage */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="overflow-hidden shadow-2xl border border-brand-brown/10">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2 }}
                  src={apiaryImg}
                  alt="Vivaldi Apiary"
                  className="w-full h-125 object-cover"
                />
              </div>

              {/* Floating Product Image - 500g bottle */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-12 -right-8 w-64 bg-brand-cream shadow-2xl border-12 border-brand-cream z-20 hidden md:block"
              >
                <img src={productSmall} alt="Volta Premium Honey" className="w-full h-auto" />
              </motion.div>
            </div>

            {/* Background Decorative Frame */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 border-2 border-brand-green/20 -z-10" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-brand-green"></span>
              <span className="text-label">About Vivaldi Foods</span>
            </motion.div>

            {/* Added responsive bottom margin to push grid down */}
           <motion.p variants={itemVariants} className="text-body text-brand-brown leading-relaxed mb-10 lg:mb-12">
              Vivaldi Foods Ltd. is a growing food processing company committed to delivering high
              quality, safe, and responsibly packaged food products to consumers. The company is
              focused on building a trusted brand within the food industry through strict quality
               standards, innovation, and efficient processing practices. Its flagship product,
               <span className="text-brand-green font-bold"> Volta Premium Honey, </span>
               is carefully sourced from the Volta Region of Ghana and packaged in accordance with the
                highest food safety and hygiene standards to ensure purity, consistency, and customer satisfaction.
              </motion.p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: 'Premium Foods', desc: 'Carefully crafted for quality and taste' },
                { title: 'Trusted Sourcing', desc: 'Sourced from reliable suppliers' },
                { title: 'Clean Handling', desc: 'Handled with care from source to bottle' },
                { title: 'Ready Supply', desc: 'Available for homes, shops, and bulk buyers' },
              ].map((item) => (
                <motion.div variants={itemVariants} key={item.title} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle2 size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h5 className="text-brand-brown">{item.title}</h5>
                    <p className="text-caption text-brand-brown/60 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Link to="/contact" className="btn-corporate group">
                Make an Enquiry
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
