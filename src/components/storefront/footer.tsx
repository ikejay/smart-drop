import Link from "next/link";
import { Zap, Lock, CreditCard, Globe } from "lucide-react";

const SHOP_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Home Decor", href: "/products?niche=home-decor" },
  { label: "Fashion & Apparel", href: "/products?niche=apparel" },
  { label: "Tech & Gadgets", href: "/products?niche=gadgets" },
  { label: "Beauty & Wellness", href: "/products?niche=beauty" },
];

const SUPPORT_LINKS = [
  { label: "Track Your Order", href: "/orders" },
  { label: "Shipping Policy", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About SmartDrop", href: "#" },
  { label: "Our Suppliers", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-white mb-4"
            >
              <span className="bg-white text-zinc-900 p-1 rounded-md">
                <Zap className="w-4 h-4" />
              </span>
              SmartDrop
            </Link>
            <p className="text-sm leading-relaxed">
              Thousands of products from trusted global suppliers, shipped
              directly to your door.
            </p>
            <p className="text-xs mt-6 text-zinc-600">
              Powered by AliExpress, Spocket, CJ Dropshipping & Printful.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} SmartDrop. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> SSL Secured
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" /> Stripe Payments
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Ships Worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}