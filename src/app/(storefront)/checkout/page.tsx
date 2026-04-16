import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {/*
       * TODO: ShippingAddressForm (client component / Server Action)
       * On submit → POST /api/orders/checkout → get Stripe Checkout URL → redirect
       */}
      <p className="text-zinc-500">Checkout form coming soon.</p>
    </main>
  );
}
