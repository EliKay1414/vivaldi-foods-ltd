// High-speed WebP image imports
import p330Webp from "@/assets/products/products-330g.webp";
import p500Webp from "@/assets/products/products-500g.webp";
import wholesaleBox from "@/assets/products/wholesale-box.webp";

export interface CatalogProduct {
  id: number;
  sku: string;
  name: string;
  size: string;
  image: string;
  imageWebp: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  stockLabel: string;
  description: string;
  highlights: string[];
  bestFor: string;
}

export const productCatalog: CatalogProduct[] = [
  {
    id: 1,
    sku: "VF-RET-330G",
    name: "330g easy to carry Bottle",
    size: "330g plastic Bottle",
    image: p330Webp,
    imageWebp: p330Webp,
    category: "Retail",
    price: 60.00,
    rating: 5,
    reviewCount: 42,
    badge: "330g Plastic Bottle",
    inStock: true,
    stockLabel: "In Stock • Ships Fast in Accra",
    description: "Real, sweet honey in a handy size. Easy to carry to work, school, or travel. Perfect for your morning tea, porridge, and bread. Doorstep delivery is GH₵ 25 across Accra (FREE on orders over GH₵ 350).",
    highlights: [
      "100% real pure honey",
      "No added sugar or fake syrup",
      "Fresh from bees in Volta Region",
      "GH₵ 25 delivery in Accra • FREE over GH₵ 350",
    ],
    bestFor: "Tea, bread, personal use, and gifts",
  },
  {
    id: 2,
    sku: "VF-RET-500G",
    name: "500g Family Bottle",
    size: "500g plastic bottle",
    image: p500Webp,
    imageWebp: p500Webp,
    category: "Retail",
    price: 80.00,
    rating: 5,
    reviewCount: 89,
    badge: "500g Family Bottle",
    inStock: true,
    stockLabel: "In Stock • Most Popular Choice",
    description: "Our most popular family bottle! Big enough for the whole family to enjoy every day. Great for drinks, cooking, baking, and staying healthy. Doorstep delivery is GH₵ 25 in Accra (FREE on orders over GH₵ 350).",
    highlights: [
      "100% pure honey for the whole home",
      "Zero chemicals, zero added sugar",
      "FDA Ghana approved for safe eating",
      "GH₵ 25 delivery in Accra • FREE over GH₵ 350",
    ],
    bestFor: "Family breakfast, cooking, baking, and daily health",
  },
  {
    id: 3,
    sku: "VF-WHO-330G",
    name: "330g Wholesale Box",
    size: "330g",
    image: wholesaleBox,
    imageWebp: wholesaleBox,
    category: "Wholesale",
    price: 50.00,
    rating: 5,
    reviewCount: 28,
    badge: "330g Wholesale Box",
    inStock: true,
    stockLabel: "In Stock • Ready for Wholesale Dispatch",
    description: "Wholesale box of 330g bottles. Packed safely in sturdy factory cartons with divider cells for shops, marts, and retailers. Fast dispatch across Accra and nationwide.",
    highlights: [
      "Factory-packed wholesale box with protective cells",
      "Great wholesale price for shops and resellers",
      "FDA certified for retail sale",
      "GH₵ 25 delivery in Accra • FREE over GH₵ 350",
    ],
    bestFor: "Shops, supermarkets, marts, and resellers",
  },
  {
    id: 4,
    sku: "VF-WHO-500G",
    name: "500g Wholesale Box",
    size: "500g",
    image: wholesaleBox,
    imageWebp: wholesaleBox,
    category: "Wholesale",
    price: 70.00,
    rating: 5,
    reviewCount: 34,
    badge: "500g Wholesale Box",
    inStock: true,
    stockLabel: "In Stock • Ready for Wholesale Dispatch",
    description: "Wholesale box of 500g bottles for supermarkets, bakeries, pharmacies, and wholesale distributors. High family demand bottle size for steady sales.",
    highlights: [
      "Factory-packed wholesale box of 500g bottles",
      "Guaranteed 100% pure Volta honey",
      "Direct factory dispatch across Ghana",
      "GH₵ 25 delivery in Accra • FREE over GH₵ 350",
    ],
    bestFor: "Distributors, bakeries, supermarkets, and pharmacies",
  },
];
