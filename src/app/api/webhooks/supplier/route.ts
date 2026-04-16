import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse } from "@/types";

/**
 * Generic supplier tracking webhook.
 * Used for AliExpress, Spocket, and CJ Dropshipping shipping updates.
 *
 * Expects the supplier to POST a JSON body with supplierOrderId + trackingNumber.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  const body = await req.json() as {
    supplierOrderId: string;
    trackingNumber?: string;
    trackingUrl?: string;
    status?: string;
  };

  if (!body.supplierOrderId) {
    return NextResponse.json(
      { data: null, error: "Missing supplierOrderId" },
      { status: 400 }
    );
  }

  // TODO: look up Fulfilment by supplierOrderId, update tracking + status
  // TODO: if all fulfilments are SHIPPED → set Order.status = SHIPPED
  // TODO: send shipping notification email via Resend

  return NextResponse.json({ data: null, error: null });
}
