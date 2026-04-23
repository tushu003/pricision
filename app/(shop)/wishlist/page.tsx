export default function WishlistPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Saved items will appear here. The heart icon in the navbar shows a count from{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">localStorage</code>{" "}
        key <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">techgear_wishlist_ids</code>.
      </p>
    </div>
  );
}
