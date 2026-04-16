/**
 * Spocket adapter.
 *
 * Suppliers are primarily US/EU-based — shorter delivery times for those regions.
 * Always call checkInventory() before forwarding an order (real inventory, no POD).
 *
 * Env vars required: SPOCKET_API_KEY
 */
import type {
  SupplierAdapter,
  SupplierOrderPayload,
  SupplierOrderResult,
  SupplierProduct,
} from "./types";

export const spocketAdapter: SupplierAdapter = {
  name: "SPOCKET",

  async searchProducts(query: string): Promise<SupplierProduct[]> {
    void query;
    return [];
  },

  async getProduct(sku: string): Promise<SupplierProduct | null> {
    void sku;
    return null;
  },

  async checkInventory(sku: string, variantSku?: string): Promise<number> {
    void sku;
    void variantSku;
    return 0;
  },

  async placeOrder(
    payload: SupplierOrderPayload
  ): Promise<SupplierOrderResult> {
    void payload;
    throw new Error("Spocket adapter: placeOrder not yet implemented");
  },

  async getOrderStatus(supplierOrderId: string): Promise<string> {
    void supplierOrderId;
    throw new Error("Spocket adapter: getOrderStatus not yet implemented");
  },
};
