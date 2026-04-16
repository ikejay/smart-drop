import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse } from "@/types";

/**
 * Printful webhook handler.
 *
 * Relevant events:
 *   - package_shipped → update Fulfilment.trackingNumber + status: SHIPPED
 *
 * Printful signs webhooks with a header — validate before processing.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  // TODO: validate Printful webhook signature
  const body = await req.json() as { type: string; data: unknown };

  switch (body.type) {
    case "package_shipped": {
      // TODO: extract supplierOrderId + trackingNumber from body.data
      // Update Fulfilment record, check if all fulfilments are SHIPPED → update Order
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ data: null, error: null });
}
