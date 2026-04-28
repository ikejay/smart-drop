"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Home Decor", href: "/products?niche=home-decor" },
  { label: "Fashion", href: "/products?niche=apparel" },
  { label: "Gadgets", href: "/products?niche=gadgets" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-zinc-900 shrink-0"
        >
          <span className="bg-zinc-900 text-white p-1 rounded-md">
            <Zap className="w-4 h-4" />
          </span>
          SmartDrop
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-500">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 rounded-md hover:bg-zinc-100 transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart className="w-5 h-5 text-zinc-700" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 rounded-md hover:bg-zinc-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200",
          menuOpen ? "max-h-64 border-t border-zinc-100" : "max-h-0"
        )}
      >
        <nav className="bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 hover:text-zinc-900 py-2 px-2 rounded-md hover:bg-zinc-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
