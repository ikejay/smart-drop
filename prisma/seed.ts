import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing products
  await prisma.product.deleteMany();
  console.log("  ✓ Cleared existing products");

  const products = await prisma.product.createMany({
    data: [
      {
        slug: "minimalist-led-desk-lamp",
        name: "Minimalist LED Desk Lamp",
        description:
          "Sleek, touch-dimmable LED lamp perfect for home offices and bedside tables. Three color temperatures, USB charging port built in.",
        images: [
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
        ],
        price: 34.99,
        compareAtPrice: 54.99,
        costPrice: 12.5,
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
      },
      {
        slug: "wireless-magsafe-charger",
        name: "15W Wireless MagSafe Charger",
        description:
          "Fast wireless charging pad compatible with iPhone 12+ and Android devices. Slim profile, LED indicator, braided cable included.",
        images: [
          "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&q=80",
        ],
        price: 27.99,
        compareAtPrice: 44.99,
        costPrice: 9.8,
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
      },
      {
        slug: "boho-macrame-wall-hanging",
        name: "Boho Macramé Wall Hanging",
        description:
          "Handcrafted macramé wall décor made from 100% natural cotton rope. Includes driftwood rod. Perfect for living rooms and bedrooms.",
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        ],
        price: 42.0,
        compareAtPrice: null,
        costPrice: 15.0,
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
      },
      {
        slug: "premium-wireless-earbuds",
        name: "Premium Noise-Cancelling Earbuds",
        description:
          "Active noise cancellation, 30-hour battery life with charging case. IPX5 water-resistant. Compatible with iOS and Android.",
        images: [
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
        ],
        price: 69.99,
        compareAtPrice: 99.99,
        costPrice: 28.0,
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
      },
      {
        slug: "jade-gua-sha-face-tool",
        name: "Jade Gua Sha Face Sculpting Tool",
        description:
          "Premium natural jade stone for facial massage, lymphatic drainage, and reducing puffiness. Includes velvet pouch.",
        images: [
          "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600&q=80",
        ],
        price: 18.99,
        compareAtPrice: 29.99,
        costPrice: 5.5,
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
      },
      {
        slug: "custom-sunset-graphic-tee",
        name: "Custom Sunset Graphic Tee",
        description:
          "Premium 100% ring-spun cotton tee with a vibrant sunset print. Available in S–3XL. Print-on-demand — no minimums.",
        images: [
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
        ],
        price: 29.99,
        compareAtPrice: null,
        costPrice: 14.0,
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
      },
      {
        slug: "smart-watch-sport-band",
        name: "Sport Watch Band for Apple Watch",
        description:
          "Breathable silicone sport band compatible with Apple Watch Series 1–9 and Ultra. Available in 38/40/41mm and 42/44/45mm.",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
        ],
        price: 14.99,
        compareAtPrice: 24.99,
        costPrice: 3.8,
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
      },
      {
        slug: "velvet-accent-throw-pillow",
        name: "Velvet Accent Throw Pillow Cover",
        description:
          "Luxurious velvet pillow cover in a range of rich tones. 18×18 inches, hidden zipper closure. Cover only — insert not included.",
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
        ],
        price: 22.0,
        compareAtPrice: null,
        costPrice: 7.2,
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
      },
      {
        slug: "stainless-steel-water-bottle",
        name: "32oz Insulated Stainless Steel Bottle",
        description:
          "Triple-wall vacuum insulation keeps drinks cold 48hrs or hot 24hrs. BPA-free, leak-proof lid, powder-coated finish.",
        images: [
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
        ],
        price: 32.0,
        compareAtPrice: 45.0,
        costPrice: 11.5,
        inventory: 350,
        status: "ACTIVE",
        supplierName: "SPOCKET",
        supplierId: "spk_bottle_009",
        supplierSku: "SPRT-BTL-SS32",
        isPrintOnDemand: false,
        category: "Sports & Outdoors",
        niche: "sports",
        tags: ["water-bottle", "insulated", "stainless-steel", "gym"],
        shippingFrom: "US",
      },
      {
        slug: "bamboo-cutting-board-set",
        name: "Bamboo Cutting Board Set (3-Piece)",
        description:
          "Eco-friendly bamboo cutting boards in three sizes. Juice grooves, handle holes, and anti-slip rubber feet. Dishwasher safe.",
        images: [
          "https://images.unsplash.com/photo-1594489428504-5a9f7c8ba95f?w=600&q=80",
        ],
        price: 38.0,
        compareAtPrice: 55.0,
        costPrice: 14.0,
        inventory: 160,
        status: "ACTIVE",
        supplierName: "CJ_DROPSHIPPING",
        supplierId: "cj_board_010",
        supplierSku: "KTCH-CUT-BMB3",
        isPrintOnDemand: false,
        category: "Kitchen",
        niche: "kitchen",
        tags: ["cutting-board", "bamboo", "kitchen", "eco-friendly"],
        shippingFrom: "CN",
      },
      {
        slug: "custom-embroidered-hoodie",
        name: "Custom Embroidered Logo Hoodie",
        description:
          "Premium 80/20 cotton-poly blend pullover hoodie with custom embroidery placement. Unisex fit, sizes XS–3XL.",
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
        ],
        price: 54.99,
        compareAtPrice: null,
        costPrice: 28.0,
        inventory: 0,
        status: "ACTIVE",
        supplierName: "PRINTFUL",
        supplierId: "pf_hoodie_011",
        supplierSku: "APP-HOOD-EMB",
        isPrintOnDemand: true,
        category: "Hoodies",
        niche: "apparel",
        tags: ["hoodie", "embroidered", "custom", "print-on-demand"],
        shippingFrom: "US",
      },
      {
        slug: "rose-quartz-roller-set",
        name: "Rose Quartz Facial Roller & Gua Sha Set",
        description:
          "Dual-ended rose quartz roller plus gua sha tool. Reduces puffiness, boosts circulation, and improves product absorption.",
        images: [
          "https://images.unsplash.com/photo-1631390047578-b50b5b3c8dc0?w=600&q=80",
        ],
        price: 24.99,
        compareAtPrice: 39.99,
        costPrice: 8.0,
        inventory: 320,
        status: "ACTIVE",
        supplierName: "ALIEXPRESS",
        supplierId: "ali_roller_012",
        supplierSku: "BEAU-RQ-SET",
        isPrintOnDemand: false,
        category: "Skincare Tools",
        niche: "beauty",
        tags: ["rose-quartz", "roller", "gua-sha", "skincare"],
        shippingFrom: "CN",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`  ✓ Created ${products.count} products`);

  // Seed admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@smartdrop.com" },
    update: {},
    create: {
      email: "admin@smartdrop.com",
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log(`  ✓ Admin user: ${admin.email}`);

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
