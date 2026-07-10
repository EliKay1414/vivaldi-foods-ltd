/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';

// Asset Imports
import apiaryImg from '@/assets/images/apiary-live.jpg';
import productionHubImg from '@/assets/images/production-hub.jpg';
import honeyProcessImg from '@/assets/images/hero-honey.png';
import p330Img from '@/assets/products/products-330g.png';
import p500Img from '@/assets/products/products-500g.png';
import allProductsImg from '@/assets/products/products.png';
import fromHiveImg from '@/assets/factory/From-hive.png';
import filtrationImg from '@/assets/factory/Filtration.png';
import packagingImg from '@/assets/factory/Packaging1.png';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
});

const galleryItems = [
  {
    src: apiaryImg,
    title: "Sustainable Harvesting",
    category: "Production",
    desc: "Our carefully handled sourcing channels in the Volta Region of Ghana.",
    accentColor: "text-amber-400"
  },
  {
    src: fromHiveImg,
    title: "From Hive to Handling",
    category: "Sourcing",
    desc: "Honey handling begins with careful harvesting practices that protect quality from the first step.",
    accentColor: "text-green-400"
  },
  {
    src: filtrationImg,
    title: "Purity Filtration",
    category: "Quality",
    desc: "Our filtration process helps preserve natural character while supporting clean, consistent batches.",
    accentColor: "text-amber-400"
  },
  {
    src: honeyProcessImg,
    title: "Pure Extraction",
    category: "Process",
    desc: "Controlled extraction to preserve natural aromas, flavours, and nutritional values.",
    accentColor: "text-amber-400"
  },
  {
    src: packagingImg,
    title: "Sealed Packaging",
    category: "Packaging",
    desc: "Finished products are sealed and presented for reliable retail and wholesale distribution.",
    accentColor: "text-green-400"
  },
  {
    src: productionHubImg,
    title: "Packaging Hub",
    category: "Facility",
    desc: "Our processing factory in Adaklu, ensuring strict adherence to highest hygiene standards.",
    accentColor: "text-green-400"
  },
  {
    src: p330Img,
    title: "Volta Premium Honey 330g",
    category: "Product",
    desc: "A compact bottle format for everyday household use and retail shelves.",
    accentColor: "text-amber-400"
  },
  {
    src: p500Img,
    title: "Volta Premium Honey 500g",
    category: "Product",
    desc: "A family-size bottle designed for homes, shops, and repeat use.",
    accentColor: "text-green-400"
  },
  {
    src: allProductsImg,
    title: "Wholesale Product Range",
    category: "Distribution",
    desc: "A broader product view for partners, retailers, and bulk supply conversations.",
    accentColor: "text-amber-400"
  },
];

function GalleryPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Visual Journey"
        subtitle="Explore the pristine environments where our gold is harvested and processed."
      />

      {/* COMPACT SECTION: Reduced vertical padding down to py-12/md:py-16 for absolute symmetry */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6">

        {/* SYMMETRICAL CARD DECK: Implemented a fluid wrap layout to keep the data blocks cohesive */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              // SHAPE COMPRESSION FIX: Changed aspect-4/5 to aspect-[3/4] to eliminate long cards
              className="group relative overflow-hidden aspect-3/4 bg-white rounded-2xl border border-gray-100 shadow-sm w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY CONTEXT REFACTOR: Symmetrical font sizes and unified gradient shading */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 p-5 flex flex-col justify-end text-left backdrop-blur-[1px]">
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${item.accentColor}`}>
                  {item.category}
                </span>
                <h3 className="text-white text-base font-display font-bold tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
