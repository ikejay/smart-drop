import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartDrop — Global Dropshipping Store",
};

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-24 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Everything, shipped worldwide.
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Thousands of products. Multiple warehouses. Delivered to your door.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-zinc-900 font-semibold px-8 py-3 rounded-full hover:bg-zinc-100 transition-colors"
        >
          Shop Now
        </a>
      </section>

      {/* Featured products — TODO: fetch from DB with server component */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
        <p className="text-zinc-500">Products will appear here once the database is seeded.</p>
      </section>

      {/* Niche category grid — TODO */}
      <section className="bg-zinc-50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
          <p className="text-zinc-500">Categories coming soon.</p>
        </div>
      </section>
    </main>
  );
}
