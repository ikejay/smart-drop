import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import type { ApiResponse } from "@/types";

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  costPrice: z.number().positive(),
  supplierName: z.enum(["ALIEXPRESS", "SPOCKET", "CJ_DROPSHIPPING", "PRINTFUL"]),
  supplierId: z.string().min(1),
  supplierSku: z.string().min(1),
  isPrintOnDemand: z.boolean().default(false),
  category: z.string().optional(),
  niche: z.string().optional(),
  tags: z.array(z.string()).default([]),
  shippingFrom: z.string().length(2).optional(),
});

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<unknown[]>>> {
  const { searchParams } = new URL(req.url);
  const niche = searchParams.get("niche");
  const category = searchParams.get("category");

  // TODO: query DB with filters
  void niche;
  void category;

  return NextResponse.json({ data: [], error: null });
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<unknown>>> {
  const body: unknown = await req.json();
  const parsed = createProductSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.message },
      { status: 400 }
    );
  }

  // Enforce margin rule: price must exceed costPrice
  if (parsed.data.price <= parsed.data.costPrice) {
    return NextResponse.json(
      { data: null, error: "Price must be greater than cost price" },
      { status: 400 }
    );
  }

  // TODO: auth check — admin only
  // TODO: db.product.create({ data: parsed.data })

  return NextResponse.json({ data: null, error: null }, { status: 201 });
}
