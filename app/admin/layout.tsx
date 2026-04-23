import Link from "next/link";
import { APP_NAME, BRAND_NAME, ROUTES } from "@/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="font-semibold tracking-tight">
            {BRAND_NAME} · {APP_NAME} — Admin
          </span>
          <nav className="flex gap-4 text-sm">
            <Link href={ROUTES.admin.products}>Products</Link>
            <Link href={ROUTES.admin.orders}>Orders</Link>
            <Link href={ROUTES.home}>Storefront</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
