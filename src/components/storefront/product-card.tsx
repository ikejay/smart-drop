import Link from "next/link";
import Image from "next/image";
import { getShippingEstimate, formatPrice } from "@/lib/utils";
import type { SupplierName } from "@/lib/suppliers/types";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: string;
  compareAtPrice?: string | null;
  image: string;
  supplierName: SupplierName;
  shippingFrom?: string | null;
  isPrintOnDemand: boolean;
  inventory: number;
}

const SUPPLIER_LABELS: Record<SupplierName, string> = {
  ALIEXPRESS: "AliExpress",
  SPOCKET: "Spocket",
  CJ_DROPSHIPPING: "CJ",
  PRINTFUL: "Printful",
};

export function ProductCard({
  slug,
  name,
  price,
  compareAtPrice,
  image,
  supplierName,
  shippingFrom,
  isPrintOnDemand,
  inventory,
}: ProductCardProps) {
  const inStock = isPrintOnDemand || inventory > 0;
  const hasDiscount =
    compareAtPrice && Number(compareAtPrice) > Number(price);
  const discountPct = hasDiscount
    ? Math.round((1 - Number(price) / Number(compareAtPrice!)) * 100)
    : 0;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-zinc-50 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discountPct}%
            </span>
          )}
          {isPrintOnDemand && (
            <span className="bg-violet-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Made to Order
            </span>
          )}
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-zinc-500 bg-white px-3 py-1 rounded-full border border-zinc-200">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wide">
          {SUPPLIER_LABELS[supplierName]}
        </p>
        <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-zinc-700 transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-zinc-900">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-zinc-400 line-through">
              {formatPrice(compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Shipping */}
        <p className="text-[11px] text-zinc-400">
          {getShippingEstimate(supplierName, shippingFrom ?? undefined)}
        </p>
      </div>
    </Link>
  );
}
