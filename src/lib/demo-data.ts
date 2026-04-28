import {
  Home,
  Zap,
  Shirt,
  Sparkles,
  Dumbbell,
  ChefHat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SupplierName } from "@/lib/suppliers/types";

export interface DemoProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  price: string;
  compareAtPrice: string | null;
  costPrice: string;
  inventory: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  supplierName: SupplierName;
  supplierId: string;
  supplierSku: string;
  isPrintOnDemand: boolean;
  category: string;
  niche: string;
  tags: string[];
  shippingFrom: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "demo_1",
    slug: "minimalist-led-desk-lamp",
    name: "Minimalist LED Desk Lamp",
    description:
      "Sleek, touch-dimmable LED lamp perfect for home offices and bedside tables. Three color temperatures, USB charging port built in.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    ],
    price: "34.99",
    compareAtPrice: "54.99",
    costPrice: "12.50",
    inventory: 230,
    status: "ACTIVE",
    supplierName: "ALIEXPRESS",
    supplierId: "ali_lamp_001",
    supplierSku: "LAMP-LED-MIN",
    isPrintOnDemand: false,
    category: "Lighting",
    niche: "home-decor",
    tags: ["lamp", "desk", "LED", "minimalist"],
    shippingFrom: "CN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_2",
    slug: "wireless-magsafe-charger",
    name: "15W Wireless MagSafe Charger",
    description:
      "Fast wireless charging pad compatible with iPhone 12+ and Android devices. Slim profile, LED indicator, braided cable included.",
    images: [
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80",
    ],
    price: "27.99",
    compareAtPrice: "44.99",
    costPrice: "9.80",
    inventory: 180,
    status: "ACTIVE",
    supplierName: "CJ_DROPSHIPPING",
    supplierId: "cj_charger_002",
    supplierSku: "CHRG-WL-15W",
    isPrintOnDemand: false,
    category: "Electronics",
    niche: "gadgets",
    tags: ["charger", "wireless", "MagSafe", "iPhone"],
    shippingFrom: "CN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_3",
    slug: "boho-macrame-wall-hanging",
    name: "Boho Macramé Wall Hanging",
    description:
      "Handcrafted macramé wall décor made from 100% natural cotton rope. Includes driftwood rod. Perfect for living rooms and bedrooms.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ],
    price: "42.00",
    compareAtPrice: null,
    costPrice: "15.00",
    inventory: 75,
    status: "ACTIVE",
    supplierName: "SPOCKET",
    supplierId: "spk_macrame_003",
    supplierSku: "DCOR-MACRO-BH",
    isPrintOnDemand: false,
    category: "Wall Decor",
    niche: "home-decor",
    tags: ["macrame", "boho", "wall-decor", "handmade"],
    shippingFrom: "US",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_4",
    slug: "premium-wireless-earbuds",
    name: "Premium Noise-Cancelling Earbuds",
    description:
      "Active noise cancellation, 30-hour battery life with charging case. IPX5 water-resistant. Compatible with iOS and Android.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    ],
    price: "69.99",
    compareAtPrice: "99.99",
    costPrice: "28.00",
    inventory: 120,
    status: "ACTIVE",
    supplierName: "ALIEXPRESS",
    supplierId: "ali_earbuds_004",
    supplierSku: "EARB-ANC-PRO",
    isPrintOnDemand: false,
    category: "Audio",
    niche: "gadgets",
    tags: ["earbuds", "wireless", "ANC", "audio"],
    shippingFrom: "CN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_5",
    slug: "jade-gua-sha-face-tool",
    name: "Jade Gua Sha Face Sculpting Tool",
    description:
      "Premium natural jade stone for facial massage, lymphatic drainage, and reducing puffiness. Includes velvet pouch.",
    images: [
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&q=80",
    ],
    price: "18.99",
    compareAtPrice: "29.99",
    costPrice: "5.50",
    inventory: 400,
    status: "ACTIVE",
    supplierName: "SPOCKET",
    supplierId: "spk_jade_005",
    supplierSku: "BEAU-JADE-GS",
    isPrintOnDemand: false,
    category: "Skincare",
    niche: "beauty",
    tags: ["gua-sha", "jade", "skincare", "massage"],
    shippingFrom: "US",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_6",
    slug: "custom-sunset-graphic-tee",
    name: "Custom Sunset Graphic Tee",
    description:
      "Premium 100% ring-spun cotton tee with a vibrant sunset print. Available in S–3XL. Print-on-demand — no minimums.",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    ],
    price: "29.99",
    compareAtPrice: null,
    costPrice: "14.00",
    inventory: 0,
    status: "ACTIVE",
    supplierName: "PRINTFUL",
    supplierId: "pf_tee_006",
    supplierSku: "APP-TEE-SUNS",
    isPrintOnDemand: true,
    category: "T-Shirts",
    niche: "apparel",
    tags: ["tee", "print-on-demand", "graphic", "unisex"],
    shippingFrom: "US",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_7",
    slug: "smart-watch-sport-band",
    name: "Sport Watch Band for Apple Watch",
    description:
      "Breathable silicone sport band compatible with Apple Watch Series 1–9 and Ultra. Available in 38/40/41mm and 42/44/45mm.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ],
    price: "14.99",
    compareAtPrice: "24.99",
    costPrice: "3.80",
    inventory: 500,
    status: "ACTIVE",
    supplierName: "CJ_DROPSHIPPING",
    supplierId: "cj_band_007",
    supplierSku: "WTCH-BAND-SPT",
    isPrintOnDemand: false,
    category: "Watch Accessories",
    niche: "gadgets",
    tags: ["apple-watch", "band", "sport", "silicone"],
    shippingFrom: "CN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo_8",
    slug: "velvet-accent-throw-pillow",
    name: "Velvet Accent Throw Pillow Cover",
    description:
      "Luxurious velvet pillow cover in a range of rich tones. 18×18 inches, hidden zipper closure. Cover only — insert not included.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    ],
    price: "22.00",
    compareAtPrice: null,
    costPrice: "7.20",
    inventory: 290,
    status: "ACTIVE",
    supplierName: "ALIEXPRESS",
    supplierId: "ali_pillow_008",
    supplierSku: "HOME-PIL-VLV",
    isPrintOnDemand: false,
    category: "Soft Furnishings",
    niche: "home-decor",
    tags: ["pillow", "velvet", "home-decor", "cushion"],
    shippingFrom: "CN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export interface Category {
  niche: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  bg: string;
}

export const CATEGORIES: Category[] = [
  { niche: "home-decor", label: "Home Decor",  icon: Home,     iconColor: "#92400e", bg: "#FEF9EE" },
  { niche: "gadgets",    label: "Gadgets",      icon: Zap,      iconColor: "#1d4ed8", bg: "#EFF6FF" },
  { niche: "apparel",    label: "Fashion",      icon: Shirt,    iconColor: "#7e22ce", bg: "#FDF4FF" },
  { niche: "beauty",     label: "Beauty",       icon: Sparkles, iconColor: "#be123c", bg: "#FFF1F2" },
  { niche: "sports",     label: "Sports",       icon: Dumbbell, iconColor: "#15803d", bg: "#F0FDF4" },
  { niche: "kitchen",    label: "Kitchen",      icon: ChefHat,  iconColor: "#a16207", bg: "#FFFBEB" },
];