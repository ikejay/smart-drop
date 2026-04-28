import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Globe } from "lucide-react";
import type { Metadata } from "next";
import { ProductCard } from "@/components/storefront/product-card";
import { db } from "@/lib/db";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "SmartDrop — Global Dropshipping Store",
};

export const revalidate = 60;

const TRUST_BADGES = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "SSL encrypted payments",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "30-day return window",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We're here to help",
  },
];

async function getFeaturedProducts() {
  try {
    const products = await db.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    if (products.length > 0) return products;
  } catch {
    // DB not connected — fall back to demo data
  }
  return DEMO_PRODUCTS;
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5" /> Ships to 180+ countries
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Everything you need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">
              delivered worldwide.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Thousands of products sourced from top global suppliers. Fast
            US &amp; EU shipping available on select items.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-7 py-3 rounded-full hover:bg-zinc-100 transition-colors text-sm"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-medium px-7 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-8 text-sm text-zinc-400 border-t border-white/10 pt-8 w-full max-w-sm justify-center">
            <div className="text-center">
              <p className="text-white font-bold text-2xl">5k+</p>
              <p className="text-xs">Products</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-white font-bold text-2xl">180+</p>
              <p className="text-xs">Countries</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-white font-bold text-2xl">4</p>
              <p className="text-xs">Suppliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="shrink-0 bg-zinc-100 rounded-xl p-2.5">
                <Icon className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{title}</p>
                <p className="text-xs text-zinc-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="bg-zinc-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Browse
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.niche}
                href={`/products?niche=${cat.niche}`}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl hover:scale-105 transition-transform cursor-pointer"
                style={{ backgroundColor: cat.bg }}
              >
                <cat.icon className="w-7 h-7" style={{ color: cat.iconColor }} />
                <span className="text-sm font-semibold text-zinc-800">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Trending
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={String(product.price)}
                compareAtPrice={
                  product.compareAtPrice ? String(product.compareAtPrice) : null
                }
                image={product.images[0] ?? "/placeholder.png"}
                supplierName={product.supplierName}
                shippingFrom={product.shippingFrom}
                isPrintOnDemand={product.isPrintOnDemand}
                inventory={product.inventory}
              />
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-zinc-700 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Multi-supplier callout */}
      <section className="bg-zinc-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Powered by the best
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Multiple Suppliers. One Checkout.
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              We source from AliExpress, Spocket, CJ Dropshipping, and
              Printful — so you get access to millions of products at
              competitive prices, shipped from warehouses closest to you.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["AliExpress", "Spocket", "CJ Dropshipping", "Printful"].map(
                (s) => (
                  <span
                    key={s}
                    className="bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Global Suppliers", value: "4" },
              { label: "Ship-from Countries", value: "12+" },
              { label: "Products Listed", value: "5,000+" },
              { label: "Avg Delivery", value: "7–14 days" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
            Start shopping today
          </h2>
          <p className="text-zinc-500 mb-7">
            No account required. Browse thousands of products and check out
            as a guest.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-700 transition-colors"
          >
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}