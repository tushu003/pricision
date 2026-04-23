import Link from "next/link";
import { PRODUCT_CATEGORIES, ROUTES } from "@/constants";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Browse by accessory type. Product filtering can read the same slugs from the query string.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_CATEGORIES.map((slug) => (
          <li key={slug}>
            <Link
              href={`${ROUTES.products}?category=${encodeURIComponent(slug)}`}
              className="block rounded-2xl border border-zinc-200/80 bg-white px-4 py-6 text-sm font-medium capitalize shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-600"
            >
              {slug.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
