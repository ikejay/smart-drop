import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a decimal price string or number for display.
 * Input is a Prisma Decimal (stored as string) or a number in major units.
 */
export function formatPrice(
  amount: string | number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(amount));
}

/**
 * Convert Stripe amount (cents) to display string.
 */
export function formatCents(
  cents: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/**
 * Return a human-readable shipping estimate range based on the supplier
 * and origin country (ISO 3166-1 alpha-2).
 */
export function getShippingEstimate(
  supplierName: string,
  shippingFrom?: string
): string {
  switch (supplierName) {
    case "ALIEXPRESS":
      return "10–45 business days (estimate)";
    case "SPOCKET":
      return shippingFrom === "US" || shippingFrom === "EU"
        ? "3–7 business days (estimate)"
        : "7–14 business days (estimate)";
    case "PRINTFUL":
      return "3–7 business days (estimate)";
    case "CJ_DROPSHIPPING":
      return shippingFrom === "US" || shippingFrom === "DE"
        ? "5–10 business days (estimate)"
        : "10–20 business days (estimate)";
    default:
      return "Delivery estimate unavailable";
  }
}
