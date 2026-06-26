/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';

// Import assets directly to ensure Vite processes the paths correctly
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
    // Tailored variations depending on the tone of the underlying photograph asset
    themeColors: {
      category: "text-amber-400",
      title: "text-white",
      desc: "text-slate-200"
    }
  },
  {
    src: fromHiveImg,
    title: "From Hive to Handling",
    category: "Sourcing",
    desc: "Honey handling begins with careful harvesting practices that protect quality from the first step.",
    themeColors: {
      category: "text-brand-green",
      title: "text-white",
      desc: "text-brand-cream/85"
    }
  },
  {
    src: filtrationImg,
    title: "Purity Filtration",
    category: "Quality",
    desc: "Our filtration process helps preserve natural character while supporting clean, consistent batches.",
    themeColors: {
      category: "text-amber-300",
      title: "text-white",
      desc: "text-slate-200"
    }
  },
  {
    src: honeyProcessImg,
    title: "Pure Extraction",
    category: "Process",
    desc: "Controlled extraction to preserve natural aromas, flavours, and nutritional values.",
    themeColors: {
      category: "text-yellow-400",
      title: "text-amber-100",
      desc: "text-amber-200/80"
    }
  },
  {
    src: packagingImg,
    title: "Sealed Packaging",
    category: "Packaging",
    desc: "Finished products are sealed and presented for reliable retail and wholesale distribution.",
    themeColors: {
      category: "text-brand-green",
      title: "text-brand-cream",
      desc: "text-white/80"
    }
  },
  {
    src: productionHubImg,
    title: "Packaging Hub",
    category: "Facility",
    desc: "Our processing factory in Adaklu, ensuring strict adherence to highest hygiene standards.",
    themeColors: {
      category: "text-emerald-400",
      title: "text-neutral-50",
      desc: "text-neutral-300"
    }
  },
  {
    src: p330Img,
    title: "Volta Premium Honey 330g",
    category: "Product",
    desc: "A compact bottle format for everyday household use and retail shelves.",
    themeColors: {
      category: "text-amber-300",
      title: "text-white",
      desc: "text-brand-cream/80"
    }
  },
  {
    src: p500Img,
    title: "Volta Premium Honey 500g",
    category: "Product",
    desc: "A family-size bottle designed for homes, shops, and repeat use.",
    themeColors: {
      category: "text-brand-green",
      title: "text-white",
      desc: "text-slate-200"
    }
  },
  {
    src: allProductsImg,
    title: "Wholesale Product Range",
    category: "Distribution",
    desc: "A broader product view for partners, retailers, and bulk supply conversations.",
    themeColors: {
      category: "text-amber-300",
      title: "text-white",
      desc: "text-brand-cream/85"
    }
  },
];

function GalleryPage() {
  return (
    <div className="animate-fade-in">
      <PageBanner
        title="Visual Journey"
        subtitle="Explore the pristine environments where our gold is harvested and processed."
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-4/5 bg-slate-100"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay - Shadows removed completely, typography sized down */}
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/95 via-forest-950/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end">
                  <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.themeColors.category}`}>
                    {item.category}
                  </span>
                  <h3 className={`font-display text-lg font-bold mb-1.5 ${item.themeColors.title}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ${item.themeColors.desc}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
