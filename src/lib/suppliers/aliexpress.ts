/**
 * AliExpress / DSers adapter.
 *
 * Order placement uses the DSers API (not AliExpress directly).
 * Prefer ePacket or AliExpress Standard Shipping for international orders.
 * Delivery estimates: 10–45 business days standard.
 *
 * Env vars required: ALIEXPRESS_APP_KEY, ALIEXPRESS_APP_SECRET, ALIEXPRESS_ACCESS_TOKEN
 */
import type {
  SupplierAdapter,
  SupplierOrderPayload,
  SupplierOrderResult,
  SupplierProduct,
} from "./types";

export const aliexpressAdapter: SupplierAdapter = {
  name: "ALIEXPRESS",

  async searchProducts(query: string): Promise<SupplierProduct[]> {
    // TODO: Implement DSers/AliExpress product search API
    void query;
    return [];
  },

  async getProduct(sku: string): Promise<SupplierProduct | null> {
    // TODO: Implement product fetch by SKU
    void sku;
    return null;
  },

  async checkInventory(sku: string, variantSku?: string): Promise<number> {
    // TODO: Implement inventory check
    void sku;
    void variantSku;
    return 0;
  },

  async placeOrder(
    payload: SupplierOrderPayload
  ): Promise<SupplierOrderResult> {
    // TODO: Implement order placement via DSers API
    void payload;
    throw new Error("AliExpress adapter: placeOrder not yet implemented");
  },

  async getOrderStatus(supplierOrderId: string): Promise<string> {
    // TODO: Map AliExpress status codes to internal OrderStatus
    void supplierOrderId;
    throw new Error("AliExpress adapter: getOrderStatus not yet implemented");
  },
};
