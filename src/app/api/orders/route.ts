import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ApiResponse } from "@/types";

export async function GET(_req: NextRequest): Promise<NextResponse<ApiResponse<unknown[]>>> {
  // TODO: auth check — return orders for the authenticated user (or admin: all orders)
  return NextResponse.json({ data: [], error: null });
}
