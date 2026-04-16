import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  // TODO: fetch products from DB (paginated)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-zinc-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
          Import Product
        </button>
      </div>

      {/* TODO: <ProductTable products={products} /> */}
      <div className="bg-white border border-zinc-200 rounded-xl">
        <p className="p-6 text-zinc-500 text-sm">No products yet.</p>
      </div>
    </div>
  );
}
