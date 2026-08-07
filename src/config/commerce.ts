// PERFORMANCE OPTIMIZATION: High-speed Next-Gen WebP Imports
import p330Webp from "@/assets/products/products-330g.webp";
import p500Webp from "@/assets/products/products-500g.webp";
import pAllWebp from "@/assets/products/products.webp";

export interface CatalogProduct {
  id: number;
  name: string;
  size: string;
  image: string;
  imageWebp: string;
  category: string; // The dynamic categorization axis that powers your front-end layout tab filters
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

  // /* ==========================================
  //    BRAND LINE 2: PREMIUM SPICES & SEASONINGS
  //    ========================================== */
  // {
  //   id: 4,
  //   name: "Premium Spices Blend",
  //   size: "150g Pack",
  //   image: "", // LEFT EMPTY: Prevents old honey photography reuse bugs
  //   imageWebp: "",
  //   category: "Spices & Seasonings",
  //   rating: 5,
  //   description: "Hygienically milled local spices packaged under strict compliance protocols for premium flavor retention and kitchen utility.",
  // },

  // /* ==========================================
  //    BRAND LINE 3: PREMIUM SUGARS
  //    ========================================== */
  // {
  //   id: 5,
  //   name: "Premium Refined Sugars",
  //   size: "150g Pack",
  //   image: "", // LEFT EMPTY: Prevents old honey photography reuse bugs
  //   imageWebp: "",
  //   category: "Premium Sugars",
  //   rating: 5,
  //   description: "Pure, clean-processed refined sweetening grains packed under safe sanitary environments for household and industrial beverage uses.",
  // },

  // /* ==========================================
  //    BRAND LINE 4: BOTTLED WATER
  //    ========================================== */
  // {
  //   id: 6,
  //   name: "Vivaldi Pure Minerals Water",
  //   size: "0.5 L",
  //   image: "", // LEFT EMPTY: Prevents old honey photography reuse bugs
  //   imageWebp: "",
  //   category: "Bottled Water",
  //   rating: 5,
  //   description: "Pure, refreshingly filtered drinking water packaged in modern lightweight bottles for absolute mobile convenience and hydration.",
  // },
  // {
  //   id: 7,
  //   name: "Vivaldi Pure Minerals Drink",
  //   size: "750 ML",
  //   image: "", // LEFT EMPTY: Prevents old honey photography reuse bugs
  //   imageWebp: "",
  //   category: "Bottled Water",
  //   rating: 5,
  //   description: "Family-size hydration option meticulously processed through advanced multi-stage hygienic micro-filtration layers.",
  // }
];
