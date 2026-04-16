/**
 * Printful adapter — print-on-demand (POD).
 *
 * - checkInventory() always returns -1 (unlimited). Never block add-to-cart.
 * - placeOrder() requires printfulFileUrl on each item.
 * - Printful fires webhooks on `package_shipped` — handled in /api/webhooks/printful.
 * - Ships from US/EU — faster for those destinations.
 *
 * Env vars required: PRINTFUL_API_KEY
 */
import type {
  SupplierAdapter,
  SupplierOrderPayload,
  SupplierOrderResult,
  SupplierProduct,
} from "./types";

export const printfulAdapter: SupplierAdapter = {
  name: "PRINTFUL",

  async searchProducts(query: string): Promise<SupplierProduct[]> {
    void query;
    return [];
  },

  async getProduct(sku: string): Promise<SupplierProduct | null> {
    void sku;
    return null;
  },

  /** POD — always unlimited. */
  async checkInventory(_sku: string, _variantSku?: string): Promise<number> {
    return -1;
  },

  async placeOrder(
    payload: SupplierOrderPayload
  ): Promise<SupplierOrderResult> {
    // Validate that every item carries a printfulFileUrl before sending to API
    for (const item of payload.items) {
      if (!item.printfulFileUrl) {
        throw new Error(
          `Printful: item SKU ${item.sku} is missing printfulFileUrl`
        );
      }
    }
    // TODO: POST to Printful Orders API
    void payload;
    throw new Error("Printful adapter: placeOrder not yet implemented");
  },

  async getOrderStatus(supplierOrderId: string): Promise<string> {
    void supplierOrderId;
    throw new Error("Printful adapter: getOrderStatus not yet implemented");
  },
};
