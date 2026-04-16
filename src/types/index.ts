/** Shared TypeScript types used across the application. */

export type Role = "CUSTOMER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "FORWARDED_TO_SUPPLIER"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type SupplierName =
  | "ALIEXPRESS"
  | "SPOCKET"
  | "CJ_DROPSHIPPING"
  | "PRINTFUL";

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string; // ISO 3166-1 alpha-2
  zip: string;
  phone: string;
}

/** Standard API response envelope used by all route handlers. */
export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };
