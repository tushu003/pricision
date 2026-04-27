import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product-details/ProductGallery";
import { ProductInfo } from "@/components/product-details/ProductInfo";
import { getMockProducts } from "@/lib/mock-products";
import type { Product } from "@/types";

type Props = {
  params: Promise<{ slug: string }>;
};

const FALLBACK_IMAGES = [
  "/images/categories/headphones.svg",
  "/images/categories/chargers.svg",
  "/images/categories/cables.svg",
] as const;

function withSafeImages(p: Product): Product {
  // Unsplash URLs in mock data may 404 in some environments; use local fallbacks for the detail gallery.
  const images = p.images?.length ? FALLBACK_IMAGES.slice(0, Math.min(3, FALLBACK_IMAGES.length)) : FALLBACK_IMAGES;
  return { ...p, images: [...images] };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const products = getMockProducts();
  const found = products.find((p) => p.slug === slug);
  if (!found) notFound();

  const product = withSafeImages(found);
  const related = products
    .filter((p) => p.id !== found.id && p.category === found.category)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <ProductGallery images={product.images} alt={product.name} />
        <ProductInfo product={product} />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Related Products</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Similar picks you might like.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

