import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };
export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    niche?: string;
    category?: string;
    sort?: "price_asc" | "price_desc" | "popular";
    q?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { niche, category, sort, q } = await searchParams;

  // TODO: fetch products from DB filtered by niche/category/sort/q
  void niche;
  void category;
  void sort;
  void q;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Filter bar — TODO: extract to <ProductFilters /> client component */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <p className="text-zinc-500 text-sm">
          Filters and sort controls coming soon.
        </p>
      </div>

      {/* Product grid — TODO: replace with real <ProductCard /> components */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <p className="text-zinc-500 col-span-full">
          No products yet. Add some in the admin dashboard.
        </p>
      </div>
    </main>
  );
}
