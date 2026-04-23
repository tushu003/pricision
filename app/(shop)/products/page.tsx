import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ROUTES } from "@/constants";
import { getMockProducts, getMockProductsByCategory } from "@/lib/mock-products";

type Props = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const items = sp.category ? getMockProductsByCategory(sp.category) : getMockProducts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Products</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Earbuds, chargers, smart gadgets — mock catalog for local development.
        </p>
        {sp.category ? (
          <p className="mt-2 text-sm text-sky-700 dark:text-sky-400">
            Filter: <span className="capitalize">{sp.category.replace(/-/g, " ")}</span> ·{" "}
            <Link href={ROUTES.products} className="font-medium underline">
              Clear
            </Link>
          </p>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">No products in this category.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
