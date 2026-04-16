import type { Metadata } from "next";

export const metadata: Metadata = { title: "Suppliers" };

const SUPPLIERS = [
  {
    name: "ALIEXPRESS",
    label: "AliExpress / DSers",
    description: "General merchandise. 10–45 day shipping.",
  },
  {
    name: "SPOCKET",
    label: "Spocket",
    description: "US/EU warehouse suppliers. 3–7 day shipping.",
  },
  {
    name: "CJ_DROPSHIPPING",
    label: "CJ Dropshipping",
    description: "Wide catalogue with US/EU warehouse options.",
  },
  {
    name: "PRINTFUL",
    label: "Printful",
    description: "Print-on-demand. Ships from US/EU.",
  },
] as const;

export default function AdminSuppliersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Suppliers</h1>

      <div className="grid gap-4">
        {SUPPLIERS.map((supplier) => (
          <div
            key={supplier.name}
            className="bg-white border border-zinc-200 rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{supplier.label}</p>
              <p className="text-sm text-zinc-500 mt-0.5">
                {supplier.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* TODO: show real connection status */}
              <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-500">
                Not configured
              </span>
              <button className="text-sm text-zinc-600 underline underline-offset-4">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
