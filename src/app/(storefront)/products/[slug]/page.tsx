import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: fetch product name from DB for metadata
  return { title: slug };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: fetch product from DB by slug
  // const product = await db.product.findUnique({ where: { slug } });
  // if (!product) notFound();
  void slug;
  void notFound;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image gallery — TODO: <ProductGallery images={product.images} /> */}
        <div className="bg-zinc-100 rounded-xl aspect-square flex items-center justify-center">
          <p className="text-zinc-400">Product images</p>
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Product Name</h1>
          <p className="text-2xl font-semibold">$0.00</p>

          {/* Shipping estimate */}
          <p className="text-sm text-zinc-500">
            Estimated delivery: see product details
          </p>

          {/* Variant selector — TODO: <VariantSelector /> client component */}

          {/* Add to cart — TODO: <AddToCartButton /> client component */}
          <button
            disabled
            className="bg-zinc-900 text-white px-8 py-3 rounded-full font-semibold opacity-50 cursor-not-allowed"
          >
            Add to Cart
          </button>

          <p className="text-zinc-600 text-sm">Product description here.</p>
        </div>
      </div>
    </main>
  );
}
