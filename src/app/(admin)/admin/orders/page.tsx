import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders" };

const STATUS_OPTIONS = [
  "All",
  "PENDING",
  "PROCESSING",
  "FORWARDED_TO_SUPPLIER",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  // TODO: fetch orders from DB filtered by status, with fulfilment sub-records

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_OPTIONS.map((s) => (
          <a
            key={s}
            href={s === "All" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              (s === "All" && !status) || s === status
                ? "bg-zinc-900 text-white border-zinc-900"
                : "border-zinc-300 hover:bg-zinc-100"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      {/* TODO: <OrderTable orders={orders} /> with fulfilment rows per supplier */}
      <div className="bg-white border border-zinc-200 rounded-xl">
        <p className="p-6 text-zinc-500 text-sm">No orders found.</p>
      </div>
    </div>
  );
}
