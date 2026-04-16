import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type { ApiResponse } from "@/types";

/**
 * Stripe webhook handler.
 *
 * Flow triggered by checkout.session.completed:
 *   1. Verify Stripe signature
 *   2. Create Order + OrderItems + Fulfilment records in a DB transaction
 *   3. For each supplier group → call getSupplierAdapter(name).placeOrder()
 *      (run concurrently with Promise.allSettled)
 *   4. Send customer confirmation email via Resend
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { data: null, error: "Missing stripe-signature header" },
      { status: 401 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature verification failed";
    return NextResponse.json({ data: null, error: message }, { status: 401 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // TODO: implement order creation flow
      // const session = event.data.object as Stripe.Checkout.Session;
      break;
    }
    default:
      // Ignore unhandled events
      break;
  }

  return NextResponse.json({ data: null, error: null });
}
