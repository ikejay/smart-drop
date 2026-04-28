import type { Metadata } from "next";
import { ProductCard } from "@/components/storefront/product-card";
import { db } from "@/lib/db";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/demo-data";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Products" };
export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    niche?: string;
    category?: string;
    sort?: "price_asc" | "price_desc" | "popular";
    q?: string;
  }>;
}

async function getProducts(filters: {
  niche?: string;
  category?: string;
  sort?: string;
  q?: string;
}) {
  try {
    const orderBy =
      filters.sort === "price_asc"
        ? { price: "asc" as const }
        : filters.sort === "price_desc"
          ? { price: "desc" as const }
          : { createdAt: "desc" as const };

    const products = await db.product.findMany({
      where: {
        status: "ACTIVE",
        ...(filters.niche && { niche: filters.niche }),
        ...(filters.category && { category: filters.category }),
        ...(filters.q && {
          name: { contains: filters.q, mode: "insensitive" as const },
        }),
      },
      orderBy,
    });
    if (products.length > 0) return products;
  } catch {
    // DB not connected — fall back to demo data
  }

  let results = DEMO_PRODUCTS.filter((p) => p.status === "ACTIVE");
  if (filters.niche) results = results.filter((p) => p.niche === filters.niche);
  if (filters.q)
    results = results.filter((p) =>
      p.name.toLowerCase().includes(filters.q!.toLowerCase())
    );
  if (filters.sort === "price_asc")
    results.sort((a, b) => Number(a.price) - Number(b.price));
  if (filters.sort === "price_desc")
    results.sort((a, b) => Number(b.price) - Number(a.price));
  return results;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { niche, category, sort, q } = await searchParams;
  const products = await getProducts({ niche, category, sort, q });

  const activeCategory = CATEGORIES.find((c) => c.niche === niche);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          {activeCategory ? (
            <span className="flex items-center gap-2">
              <activeCategory.icon
                className="w-7 h-7"
                style={{ color: activeCategory.iconColor }}
              />
              {activeCategory.label}
            </span>
          ) : (
            "All Products"
          )}
        </h1>
        <p className="text-zinc-500 mt-1 text-sm">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/products"
          className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
            !niche
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
          )}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.niche}
            href={`/products?niche=${cat.niche}${sort ? `&sort=${sort}` : ""}`}
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
              niche === cat.niche
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Sort:</span>
          {(
            [
              { label: "Newest", value: "" },
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
            ] as const
          ).map((opt) => (
            <Link
              key={opt.value}
              href={`/products?${niche ? `niche=${niche}&` : ""}${opt.value ? `sort=${opt.value}` : ""}`}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                sort === opt.value || (!sort && !opt.value)
                  ? "text-zinc-900 font-semibold"
                  : "hover:text-zinc-700"
              )}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
          <p className="font-semibold text-zinc-600">No products found</p>
          <p className="text-sm mt-1">Try a different category or search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
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
      )}
    </main>
  );
}