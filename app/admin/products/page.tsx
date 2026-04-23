export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">Products</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Manage catalog via{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">
          POST /api/products
        </code>{" "}
        (admin session) or build a form here.
      </p>
    </div>
  );
}
