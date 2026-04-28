import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Truck, ShieldCheck, Package, CheckCircle2, XCircle, Infinity } from "lucide-react";
import { db } from "@/lib/db";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { formatPrice, getShippingEstimate } from "@/lib/utils";
import { AddToCartButton } from "@/components/storefront/add-to-cart-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const product = await db.product.findUnique({
      where: { slug },
      include: { variants: true },
    });
    if (product) return product;
  } catch {
    // DB not connected — fall back to demo data
  }
  const demo = DEMO_PRODUCTS.find((p) => p.slug === slug);
  if (demo) return { ...demo, variants: [] };
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? "Product Not Found" };
}

const SUPPLIER_LABELS: Record<string, string> = {
  ALIEXPRESS: "AliExpress",
  SPOCKET: "Spocket",
  CJ_DROPSHIPPING: "CJ Dropshipping",
  PRINTFUL: "Printful",
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const inStock = product.isPrintOnDemand || product.inventory > 0;
  const hasDiscount =
    product.compareAtPrice &&
    Number(product.compareAtPrice) > Number(product.price);
  const discountPct = hasDiscount
    ? Math.round(
        (1 - Number(product.price) / Number(product.compareAtPrice!)) * 100
      )
    : 0;
  const shippingEstimate = getShippingEstimate(
    product.supplierName,
    product.shippingFrom ?? undefined
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
            <Image
              src={product.images[0] ?? "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.isPrintOnDemand && (
              <span className="absolute top-3 left-3 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Made to Order
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Thumbnail row (future: map product.images) */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border-2 border-zinc-200"
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-5">
          {/* Supplier badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            {SUPPLIER_LABELS[product.supplierName] ?? product.supplierName}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-snug">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-zinc-900">
              {formatPrice(String(product.price))}
            </span>
            {hasDiscount && (
              <span className="text-lg text-zinc-400 line-through">
                {formatPrice(String(product.compareAtPrice!))}
              </span>
            )}
            {hasDiscount && (
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save {discountPct}%
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="text-sm font-medium">
            {product.isPrintOnDemand ? (
              <span className="inline-flex items-center gap-1.5 text-violet-600">
                <Infinity className="w-4 h-4" /> Made to order — always available
              </span>
            ) : product.inventory > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> In stock ({product.inventory} units)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-500">
                <XCircle className="w-4 h-4" /> Out of stock
              </span>
            )}
          </div>

          {/* Add to cart */}
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: String(product.price),
              image: product.images[0] ?? "/placeholder.png",
              supplierName: product.supplierName,
              shippingFrom: product.shippingFrom ?? undefined,
              isPrintOnDemand: product.isPrintOnDemand,
              inventory: product.inventory,
            }}
            disabled={!inStock}
          />

          {/* Shipping & trust */}
          <div className="border border-zinc-100 rounded-xl p-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2.5 text-zinc-600">
              <Truck className="w-4 h-4 shrink-0 text-zinc-400" />
              <span>
                <strong>Estimated delivery:</strong> {shippingEstimate}
              </span>
            </div>
            {product.shippingFrom && (
              <div className="flex items-center gap-2.5 text-zinc-600">
                <Package className="w-4 h-4 shrink-0 text-zinc-400" />
                <span>Ships from {product.shippingFrom}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-zinc-600">
              <ShieldCheck className="w-4 h-4 shrink-0 text-zinc-400" />
              <span>Secure checkout · 30-day return window</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 mb-2">
              About this product
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}