"use client";

import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, hasMultipleSuppliers } =
    useCartStore();

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/products"
          className="text-zinc-600 underline underline-offset-4"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {hasMultipleSuppliers() && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
          Your order contains items from multiple suppliers and will ship in
          separate packages. Delivery times may vary per item.
        </div>
      )}

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="flex gap-4 p-4 border border-zinc-200 rounded-xl"
          >
            {/* TODO: product image */}
            <div className="w-20 h-20 bg-zinc-100 rounded-lg shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-sm text-zinc-500">{item.supplierName}</p>
              {item.shippingFrom && (
                <p className="text-xs text-zinc-400">
                  Ships from {item.shippingFrom}
                </p>
              )}
              {item.isPrintOnDemand && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  Made to order
                </span>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <p className="font-semibold">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity - 1)
                  }
                  className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.variantId, item.quantity + 1)
                  }
                  className="w-7 h-7 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.productId, item.variantId)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 pt-6 flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Subtotal</p>
          <p className="text-2xl font-bold">{formatPrice(subtotal())}</p>
          <p className="text-xs text-zinc-400 mt-1">
            Shipping calculated at checkout
          </p>
        </div>
        <Link
          href="/checkout"
          className="bg-zinc-900 text-white px-10 py-3 rounded-full font-semibold hover:bg-zinc-700 transition-colors"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
