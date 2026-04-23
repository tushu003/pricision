"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { items, total } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
      {items.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your cart is empty.{" "}
          <Link href={ROUTES.products} className="font-medium text-zinc-900 underline dark:text-zinc-100">
            Continue shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">
            {items.map((line) => (
              <CartItem key={line.productId} line={line} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <p className="text-lg font-semibold">Total {formatCurrency(total)}</p>
            <Button
              type="button"
              onClick={() => router.push(ROUTES.checkout)}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
