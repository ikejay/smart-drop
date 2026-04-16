/**
 * CJ Dropshipping adapter.
 *
 * Some products ship from US/EU warehouses — check product.shippingFrom.
 * CJ uses its own status codes; map them to the internal OrderStatus enum here.
 *
 * Env vars required: CJ_API_KEY, CJ_EMAIL
 */
import type {
  SupplierAdapter,
  SupplierOrderPayload,
  SupplierOrderResult,
  SupplierProduct,
} from "./types";

/** Map CJ status strings to internal OrderStatus values. */
function mapCjStatus(cjStatus: string): string {
  const map: Record<string, string> = {
    CREATED: "PENDING",
    IN_PRODUCTION: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
  };
  return map[cjStatus] ?? "PENDING";
}

export const cjAdapter: SupplierAdapter = {
  name: "CJ_DROPSHIPPING",

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
    throw new Error("CJ Dropshipping adapter: placeOrder not yet implemented");
  },

  async getOrderStatus(supplierOrderId: string): Promise<string> {
    // TODO: fetch from CJ API and map status
    const rawStatus = "CREATED"; // placeholder
    void supplierOrderId;
    return mapCjStatus(rawStatus);
  },
};
