export type SupplierName =
  | "ALIEXPRESS"
  | "SPOCKET"
  | "CJ_DROPSHIPPING"
  | "PRINTFUL";

export interface SupplierProduct {
  supplierName: SupplierName;
  supplierId: string;
  sku: string;
  name: string;
  costPrice: number; // USD cents
  images: string[];
  shippingFrom?: string; // ISO 3166-1 alpha-2
  isPrintOnDemand: boolean;
  variants: {
    name: string;
    sku: string;
    costPrice: number;
  }[];
}

export interface SupplierOrderPayload {
  items: {
    sku: string;
    quantity: number;
    variantSku?: string;
    printfulFileUrl?: string; // Printful POD only
  }[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string; // ISO 3166-1 alpha-2
    zip: string;
    phone: string;
  };
}

export interface SupplierOrderResult {
  supplierOrderId: string;
  estimatedDeliveryDays?: number;
  trackingUrl?: string;
}

export interface SupplierAdapter {
  name: SupplierName;
  searchProducts(query: string): Promise<SupplierProduct[]>;
  getProduct(sku: string): Promise<SupplierProduct | null>;
  /** Returns stock count. -1 means unlimited (print-on-demand). */
  checkInventory(sku: string, variantSku?: string): Promise<number>;
  placeOrder(payload: SupplierOrderPayload): Promise<SupplierOrderResult>;
  getOrderStatus(supplierOrderId: string): Promise<string>;
}
