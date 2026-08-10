/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';
import Seo from '@/components/ui/Seo';

import apiaryImgWebp from '@/assets/Hero/apiary-live.webp';
import productionHubImgWebp from '@/assets/Hero/production-hub.webp';
import honeyProcessImgWebp from '@/assets/Hero/community-support.webp';
import p330ImgWebp from '@/assets/products/products-330g.webp';
import p500ImgWebp from '@/assets/products/products-500g.webp';
import allProductsImgWebp from '@/assets/products/products.webp';
import fromHiveImgWebp from '@/assets/factory/From-hive.webp';
import filtrationImgWebp from '@/assets/factory/Filtration.webp';
import packagingImgWebp from '@/assets/factory/Packaging1.webp';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
});

const galleryItems = [
  {
    src: apiaryImgWebp,
    webp: apiaryImgWebp,
    title: "Sustainable Harvesting",
    category: "Production",
    desc: "Our carefully handled sourcing channels in the Volta Region of Ghana.",
    accentColor: "text-amber-400"
  },
  {
    src: fromHiveImgWebp,
    webp: fromHiveImgWebp,
    title: "From Hive to Handling",
    category: "Sourcing",
    desc: "Honey handling begins with careful harvesting practices that protect quality from the first step.",
    accentColor: "text-green-400"
  },
  {
    src: filtrationImgWebp,
    webp: filtrationImgWebp,
    title: "Purity Filtration",
    category: "Quality",
    desc: "Our filtration process helps preserve natural character while supporting clean, consistent batches.",
    accentColor: "text-amber-400"
  },
  {
    src: honeyProcessImgWebp,
    webp: honeyProcessImgWebp,
    title: "Pure Extraction",
    category: "Process",
    desc: "Controlled extraction to preserve natural aromas, flavours, and nutritional values.",
    accentColor: "text-amber-400"
  },
  {
    src: packagingImgWebp,
    webp: packagingImgWebp,
    title: "Sealed Packaging",
    category: "Packaging",
    desc: "Finished products are sealed and presented for reliable retail and wholesale distribution.",
    accentColor: "text-green-400"
  },
  {
    src: productionHubImgWebp,
    webp: productionHubImgWebp,
    title: "Packaging Hub",
    category: "Facility",
    desc: "Our processing factory in Adaklu, ensuring strict adherence to highest hygiene standards.",
    accentColor: "text-green-400"
  },
  {
    src: p330ImgWebp,
    webp: p330ImgWebp,
    title: "Volta Premium Honey 330g",
    category: "Product",
    desc: "A compact bottle format for everyday household use and retail shelves.",
    accentColor: "text-amber-400"
  },
  {
    src: p500ImgWebp,
    webp: p500ImgWebp,
    title: "Volta Premium Honey 500g",
    category: "Product",
    desc: "A family-size bottle designed for homes, shops, and repeat use.",
    accentColor: "text-green-400"
  },
  {
    src: allProductsImgWebp,
    webp: allProductsImgWebp,
    title: "Wholesale Product Range",
    category: "Distribution",
    desc: "A broader product view for partners, retailers, and bulk supply conversations.",
    accentColor: "text-amber-400"
  },
];

function GalleryPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      {/* TYPE-SAFE CLIENT INJECTION: Hydrates document meta configurations safely without route conflicts */}
      <Seo
        title="Production Gallery & Visual Journey | Vivaldi Foods Ltd"
        description="Explore the visual journey of Vivaldi Foods Ltd. View high-quality images of our sustainable beekeeping apiaries in the Volta Region, micro-mesh filtration setups, and sterile honey bottling factory."
      />

      <PageBanner
        title="Visual Journey"
        subtitle="Explore the pristine environments where our gold is harvested and processed."
      />

      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative overflow-hidden aspect-3/4 bg-white rounded-2xl border border-gray-100 shadow-sm w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <picture className="w-full h-full">
                <source srcSet={item.webp} type="image/webp" />
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                />
              </picture>

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 p-5 flex flex-col justify-end text-left backdrop-blur-[1px]">
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
