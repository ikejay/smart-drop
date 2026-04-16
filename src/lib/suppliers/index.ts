import { aliexpressAdapter } from "./aliexpress";
import { spocketAdapter } from "./spocket";
import { cjAdapter } from "./cjdropshipping";
import { printfulAdapter } from "./printful";
import type { SupplierName, SupplierAdapter } from "./types";

const adapters: Record<SupplierName, SupplierAdapter> = {
  ALIEXPRESS: aliexpressAdapter,
  SPOCKET: spocketAdapter,
  CJ_DROPSHIPPING: cjAdapter,
  PRINTFUL: printfulAdapter,
};

export function getSupplierAdapter(name: SupplierName): SupplierAdapter {
  const adapter = adapters[name];
  if (!adapter) throw new Error(`No adapter registered for supplier: ${name}`);
  return adapter;
}

export type { SupplierName, SupplierAdapter } from "./types";
