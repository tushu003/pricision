import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ROUTES } from "@/constants";
import { getMockProducts } from "@/lib/mock-products";
import { HeroBanner } from "@/components/home/HeroBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { TopCategories } from "@/components/home/TopCategories";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { FlashSale } from "@/components/home/FlashSale";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  const products = getMockProducts();
  const featured = products.slice(0, 3);
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <HeroBanner />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Popular picks this week.</p>
          </div>
          <Link
            href={ROUTES.products}
            className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-400"
          >
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <BestSellers products={products} />

      <TopCategories />

      <WhyChooseUs />

      <CustomerReviews />

      <FlashSale />

      <Newsletter />

      <section className="border-t border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Categories</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Shop by type of accessory.</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {categories.map((slug) => (
              <li key={slug}>
                <Link
                  href={`${ROUTES.products}?category=${encodeURIComponent(slug)}`}
                  className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-medium capitalize text-zinc-800 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
