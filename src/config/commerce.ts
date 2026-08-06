// PERFORMANCE OPTIMIZATION: High-speed Next-Gen WebP Imports
import p330Webp from "@/assets/products/products-330g.webp";
import p500Webp from "@/assets/products/products-500g.webp";
import pAllWebp from "@/assets/products/products.webp";

// Future Product Placeholders (Uncomment and update paths when your new food lines arrive)
// import spiceBlendWebp from "@/assets/products/spices-chili.webp";
// import organicOilWebp from "@/assets/products/oil-coconut.webp";

export interface CatalogProduct {
  id: number;
  name: string;
  size: string;
  image: string;
  imageWebp: string;
  category: string;
  rating: number;
  description: string;
}

export const productCatalog: CatalogProduct[] = [
  /* ==========================================
     BRAND LINE 1: PREMIUM HONEY SELECTION
     ========================================== */
  {
    id: 1,
    name: "Volta Premium Honey (Retail Bottle)",
    size: "330g",
    image: p330Webp,
    imageWebp: p330Webp,
    category: "Premium Honey",
    rating: 5,
    description: "A compact, travel-friendly size of Volta Premium Honey, perfect for personal daily use and retail display counters.",
  },
  {
    id: 2,
    name: "Volta Premium Honey (Family Size)",
    size: "500g",
    image: p500Webp,
    imageWebp: p500Webp,
    category: "Premium Honey",
    rating: 5,
    description: "A regular-sized bottle of Volta Premium Honey, ideal for everyday use in drinks, cooking, baking, and healthy households.",
  },
  {
    id: 3,
    name: "Volta Premium Honey (Wholesale Bulk)",
    size: "Wholesale Bulk",
    image: pAllWebp,
    imageWebp: pAllWebp,
    category: "Premium Honey",
    rating: 5,
    description: "Designed for retailers, manufacturing laboratories, and distributors. A cost-effective, certified high-quality honey supply solution.",
  },

  /* ==========================================
     BRAND LINE 2: FUTURE FOOD EXPANSION TEMPLATE
     (Simply uncomment and fill this section out when new food items launch!)
     ========================================== */
  /*
  {
    id: 4,
    name: "Premium Spices",
    size: "150g ",
    image: spiceBlendWebp,
    imageWebp: spiceBlendWebp,
    category: "Spices & Seasonings", // A new tab button will form on your page automatically!
    rating: 5,
    description: "Hygienically milled local spices packaged under strict compliance protocols for premium flavor retention.",
  },
  {
    id: 5,
    name: "Pure Coconut Oil",
    size: "1 Litre",
    image: organicOilWebp,
    imageWebp: organicOilWebp,
    category: "Organic Oils",
    rating: 5,
    description: "100% pure, additive-free organic coconut oil processed to international retail standards.",
  },

   /* ==========================================
     BRAND LINE 3: FUTURE FOOD EXPANSION TEMPLATE
     (Simply uncomment and fill this section out when new food items launch!)
     ========================================== */
  /*
 {
    id: 6,
    name: "Premium Sugurs",
    size: "150g ",
    image: spiceBlendWebp,
    imageWebp: spiceBlendWebp,
    category: "Spices & Seasonings", // A new tab button will form on your page automatically!
    rating: 5,
    description: "Hygienically milled local spices packaged under strict compliance protocols for premium flavor retention.",
  },
  {
    id: 7,
    name: "Bottled water",
    size: "o.5 ml",
    image: organicOilWebp,
    imageWebp: organicOilWebp,
    category: "Organic Oils",
    rating: 5,
    description: "100% pure, additive-free organic coconut oil processed to international retail standards.",
  },
   {
    id: 8,
    name: "Bottled water",
    size: "1 Litre",
    image: organicOilWebp,
    imageWebp: organicOilWebp,
    category: "Organic Oils",
    rating: 5,
    description: "100% pure, additive-free organic coconut oil processed to international retail standards.",
    },
  */
];
