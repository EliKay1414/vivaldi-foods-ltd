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
  // Real bottle label specifications
  ingredients: string;
  origin: string;
  packagedBy: string;
  factoryAddress: string;
  contactTel: string;
  contactWhatsApp: string;
  storage: string;
  batchInfo: string;
  barcode: string;
  naturalNote: string;
  childNotice: string;
}

export const productCatalog: CatalogProduct[] = [
  {
    id: 1,
    sku: "VF-RET-330G",
    name: "330g Easy-to-Carry Bottle",
    size: "330g Squeeze Bottle",
    image: p330Webp,
    imageWebp: p330Webp,
    category: "Retail",
    price: 60.00,
    rating: 4.8,
    reviewCount: 42,
    badge: "330g Plastic Bottle",
    inStock: true,
    stockLabel: "In Stock • Ships Fast in Accra",
    description: "100% pure Volta honey in a clean squeeze bottle. Easy to carry to work, school, or travel. Perfect for your morning tea, porridge, and bread. Doorstep delivery is GH₵ 25 across Accra.",
    highlights: [
      "Single ingredient: 100% pure honey",
      "No added sugar or fake syrup",
      "Sourced from the Volta region of Ghana",
      "Fast GH₵ 25 doorstep delivery across Accra",
    ],
    bestFor: "Tea, bread, personal use, breakfast, and gifts",
    ingredients: "Honey (100% Pure Honey, single ingredient)",
    origin: "Volta Region, Ghana",
    packagedBy: "Vivaldi Foods Ltd",
    factoryAddress: "Community 18/ Sakumono 381 (053-361-8042)",
    contactTel: "0243264003 / 053-361-8042",
    contactWhatsApp: "0268114601",
    storage: "Store in a cool, dry place.",
    batchInfo: "Batch No., Manufacturing Date, and Best Before printed on the lid.",
    barcode: "6036000227011",
    naturalNote: "Crystallization is natural. Place bottle in warm water if it occurs.",
    childNotice: "Not recommended for children under 12 months.",
  },
  {
    id: 2,
    sku: "VF-RET-500G",
    name: "500g Family Bottle",
    size: "500g Family Bottle",
    image: p500Webp,
    imageWebp: p500Webp,
    category: "Retail",
    price: 80.00,
    rating: 4.8,
    reviewCount: 89,
    badge: "500g Family Bottle",
    inStock: true,
    stockLabel: "In Stock • Most Popular Choice",
    description: "Our most popular family bottle! Big enough for the whole family to enjoy every day. Great for drinks, cooking, baking, and staying healthy. Doorstep delivery is GH₵ 25 across Accra.",
    highlights: [
      "100% pure honey for the whole home",
      "Zero chemicals, zero added sugar",
      "Packaged in accordance with highest food safety standards",
      "Fast GH₵ 25 doorstep delivery across Accra",
    ],
    bestFor: "Family breakfast, cooking, baking, and daily health",
    ingredients: "Honey (100% Pure Honey, single ingredient)",
    origin: "Volta Region, Ghana",
    packagedBy: "Vivaldi Foods Ltd",
    factoryAddress: "Community 18/ Sakumono 381 (053-361-8042)",
    contactTel: "0243264003 / 053-361-8042",
    contactWhatsApp: "0268114601",
    storage: "Store in a cool, dry place.",
    batchInfo: "Batch No., Manufacturing Date, and Best Before printed on the lid.",
    barcode: "6036000227011",
    naturalNote: "Crystallization is natural. Place bottle in warm water if it occurs.",
    childNotice: "Not recommended for children under 12 months.",
  },
  {
    id: 3,
    sku: "VF-WHO-330G",
    name: "330g Wholesale Box",
    size: "330g Carton Box",
    image: wholesaleBox,
    imageWebp: wholesaleBox,
    category: "Wholesale",
    price: 50.00,
    rating: 4.7,
    reviewCount: 28,
    badge: "330g Wholesale Box",
    inStock: true,
    stockLabel: "In Stock • Ready for Wholesale Dispatch",
    description: "Wholesale box of 330g bottles. Packed safely in sturdy factory cartons with divider cells for shops, marts, and retailers. Fast dispatch across Accra and nationwide.",
    highlights: [
      "Factory-packed wholesale box with protective cells",
      "Great wholesale price for shops and resellers",
      "Highest food safety standards & FDA certified",
      "Doorstep delivery in Accra and nationwide dispatch",
    ],
    bestFor: "Shops, supermarkets, grocery marts, and resellers",
    ingredients: "Honey (100% Pure Honey, single ingredient)",
    origin: "Volta Region, Ghana",
    packagedBy: "Vivaldi Foods Ltd",
    factoryAddress: "Community 18/ Sakumono 381 (053-361-8042)",
    contactTel: "0243264003 / 053-361-8042",
    contactWhatsApp: "0268114601",
    storage: "Store in a cool, dry place.",
    batchInfo: "Batch No., Manufacturing Date, and Best Before printed on the lid.",
    barcode: "6036000227011",
    naturalNote: "Crystallization is natural. Place bottle in warm water if it occurs.",
    childNotice: "Not recommended for children under 12 months.",
  },
  {
    id: 4,
    sku: "VF-WHO-500G",
    name: "500g Wholesale Box",
    size: "500g Carton Box",
    image: wholesaleBox,
    imageWebp: wholesaleBox,
    category: "Wholesale",
    price: 70.00,
    rating: 4.7,
    reviewCount: 34,
    badge: "500g Wholesale Box",
    inStock: true,
    stockLabel: "In Stock • Ready for Wholesale Dispatch",
    description: "Wholesale box of 500g bottles for supermarkets, bakeries, pharmacies, and wholesale distributors. High family demand bottle size for steady sales.",
    highlights: [
      "Factory-packed wholesale box of 500g bottles",
      "Guaranteed 100% pure Volta honey",
      "Direct factory dispatch across Ghana",
      "Doorstep delivery in Accra and nationwide dispatch",
    ],
    bestFor: "Distributors, bakeries, supermarkets, and pharmacies",
    ingredients: "Honey (100% Pure Honey, single ingredient)",
    origin: "Volta Region, Ghana",
    packagedBy: "Vivaldi Foods Ltd",
    factoryAddress: "Community 18/ Sakumono 381 (053-361-8042)",
    contactTel: "0243264003 / 053-361-8042",
    contactWhatsApp: "0268114601",
    storage: "Store in a cool, dry place.",
    batchInfo: "Batch No., Manufacturing Date, and Best Before printed on the lid.",
    barcode: "6036000227011",
    naturalNote: "Crystallization is natural. Place bottle in warm water if it occurs.",
    childNotice: "Not recommended for children under 12 months.",
  },
];
