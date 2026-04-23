import Link from "next/link";
import { ROUTES } from "@/constants";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Deals</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Promotional SKUs and bundles will live here. For now, jump into the catalog and add items to your cart.
      </p>
      <Link
        href={ROUTES.products}
        className="inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        View all products
      </Link>
    </div>
  );
}
