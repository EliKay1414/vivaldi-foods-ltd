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
  category: string;
  rating: number;
  description: string;
}

export const productCatalog: CatalogProduct[] = [
  {
    id: 1,
    name: "Volta Premium Honey",
    size: "330g",
    image: p330Webp,
    imageWebp: p330Webp,
    category: "Retail Selection",
    rating: 5,
    description: "A compact, travel-friendly size of Volta Premium Honey, perfect for personal daily use.",
  },
  {
    id: 2,
    name: "Volta Premium Honey",
    size: "500g",
    image: p500Webp,
    imageWebp: p500Webp,
    category: "Retail Selection",
    rating: 5,
    description: "A regular-sized bottle of Volta Premium Honey, ideal for everyday use in drinks, cooking, and baking.",
  },
  {
    id: 3,
    name: "Volta Premium Honey",
    size: "Wholesale Bulk",
    image: pAllWebp,
    imageWebp: pAllWebp,
    category: "Wholesale Selection",
    rating: 5,
    description: "Designed for retailers and distributors. A cost-effective, high-quality supply solution for businesses.",
  },
];
