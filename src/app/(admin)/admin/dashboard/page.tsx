import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  // TODO: fetch KPI data
  // const [todayRevenue, weekRevenue, pendingOrders] = await Promise.all([...]);

  const kpis = [
    { label: "Revenue today", value: "$0" },
    { label: "Revenue this week", value: "$0" },
    { label: "Revenue this month", value: "$0" },
    { label: "Orders (pending)", value: "0" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-zinc-200 rounded-xl p-5"
          >
            <p className="text-sm text-zinc-500 mb-1">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Fulfilment breakdown by supplier — TODO: Recharts bar chart */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="font-semibold mb-4">Fulfilments by Supplier</h2>
        <p className="text-zinc-400 text-sm">Chart coming soon.</p>
      </div>
    </div>
  );
}
