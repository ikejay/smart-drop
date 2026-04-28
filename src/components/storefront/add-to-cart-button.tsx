"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";
import type { SupplierName } from "@/lib/suppliers/types";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    supplierName: SupplierName;
    shippingFrom?: string;
    isPrintOnDemand: boolean;
    inventory: number;
  };
  variantId?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  product,
  variantId,
  disabled = false,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      supplierName: product.supplierName,
      shippingFrom: product.shippingFrom,
      isPrintOnDemand: product.isPrintOnDemand,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || added}
      className={cn(
        "flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all",
        disabled
          ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          : added
            ? "bg-emerald-600 text-white"
            : "bg-zinc-900 text-white hover:bg-zinc-700 active:scale-95"
      )}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {disabled ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </button>
  );
}