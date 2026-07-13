// Standard Legacy Fallback Imports
import p330 from "@/assets/products/products-330g.png";
import p500 from "@/assets/products/products-500g.png";
import pAll from "@/assets/products/products.png";

// PERFORMANCE OPTIMIZATION: High-speed Next-Gen WebP Imports
import p330Webp from "@/assets/products/products-330g.webp";
import p500Webp from "@/assets/products/products-500g.webp";
import pAllWebp from "@/assets/products/products.webp";

export interface CatalogProduct {
  id: number;
  name: string;
  size: string;
  image: string;     // Fallback legacy image string URL
  imageWebp: string; // High-performance optimized image string URL
  category: string;
  rating: number;
  description: string;
}

export const productCatalog: CatalogProduct[] = [
  {
    id: 1,
    name: "Volta Premium Honey",
    size: "330g",
    image: p330,
    imageWebp: p330Webp, // Linked directly to the hyper-compressed WebP file
    category: "Retail Selection",
    rating: 5,
    description: "A compact, travel-friendly size of Volta Premium Honey, perfect for personal daily use.",
  },
  {
    id: 2,
    name: "Volta Premium Honey",
    size: "500g",
    image: p500,
    imageWebp: p500Webp, // Linked directly to the hyper-compressed WebP file
    category: "Retail Selection",
    rating: 5,
    description: "A regular-sized bottle of Volta Premium Honey, ideal for everyday use in drinks, cooking, and baking.",
  },
  {
    id: 3,
    name: "Volta Premium Honey",
    size: "Wholesale Bulk",
    image: pAll,
    imageWebp: pAllWebp, // Linked directly to the hyper-compressed WebP file
    category: "Wholesale Selection",
    rating: 5,
    description: "Designed for retailers and distributors. A cost-effective, high-quality supply solution for businesses.",
  },
];
