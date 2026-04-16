import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders" };

export default async function CustomerOrdersPage() {
  // TODO: fetch orders for the authenticated user (or guest by email token)
  // const session = await auth();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {/* TODO: <OrderList orders={orders} /> */}
      <p className="text-zinc-500">No orders found.</p>
    </main>
  );
}
