"use client";

import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleCart: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));
