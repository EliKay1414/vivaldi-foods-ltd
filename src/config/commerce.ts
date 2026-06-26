import p330 from "@/assets/products/products-330g.png";
import p500 from "@/assets/products/products-500g.png";
import pAll from "@/assets/products/products.png";

export interface CatalogProduct {
  id: number;
  name: string;
  size: string;
  image: string;
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
    category: "Retail Selection",
    rating: 5,
    description: "A compact, travel-friendly size of Volta Premium Honey, perfect for personal daily use.",
  },
  {
    id: 2,
    name: "Volta Premium Honey",
    size: "500g",
    image: p500,
    category: "Retail Selection",
    rating: 5,
    description: "A regular-sized bottle of Volta Premium Honey, ideal for everyday use in drinks, cooking, and baking.",
  },
  {
    id: 3,
    name: "Volta Premium Honey",
    size: "Wholesale Bulk",
    image: pAll,
    category: "Wholesale Selection",
    rating: 5,
    description: "Designed for retailers and distributors. A cost-effective, high-quality supply solution for businesses.",
  },
];
