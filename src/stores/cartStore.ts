"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SupplierName } from "@/lib/suppliers/types";

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  /** Unit price in USD major units (Prisma Decimal stored as string). */
  price: string;
  quantity: number;
  supplierName: SupplierName;
  shippingFrom?: string;
  isPrintOnDemand: boolean;
  printfulFileUrl?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  hasMultipleSuppliers: () => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId && i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId && i.variantId === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + Number(i.price) * i.quantity,
          0
        ),

      hasMultipleSuppliers: () => {
        const suppliers = new Set(get().items.map((i) => i.supplierName));
        return suppliers.size > 1;
      },
    }),
    { name: "smart-drop-cart" }
  )
);
