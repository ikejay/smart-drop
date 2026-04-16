import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import type { ApiResponse } from "@/types";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().int().positive(),
    })
  ),
  shippingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    country: z.string().length(2),
    zip: z.string(),
    phone: z.string(),
  }),
  guestEmail: z.string().email().optional(),
});

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<{ url: string }>>> {
  const body: unknown = await req.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.message },
      { status: 400 }
    );
  }

  // TODO:
  // 1. Fetch products from DB to get current prices (never trust client prices)
  // 2. Check inventory for non-POD items
  // 3. Create Stripe Checkout Session

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "usd",
    line_items: [
      // TODO: map items to Stripe line_items using DB prices
    ],
    shipping_address_collection: {
      allowed_countries: ["US", "GB", "AU", "CA", "DE", "FR"],
    },
    success_url: `${process.env.NEXTAUTH_URL}/orders?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    metadata: {
      // Store serialised shipping address + guest email so the webhook can create the Order
      shippingAddress: JSON.stringify(parsed.data.shippingAddress),
      guestEmail: parsed.data.guestEmail ?? "",
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { data: null, error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: { url: session.url }, error: null });
}
