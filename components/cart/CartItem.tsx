"use client";

import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import type { CartLine } from "@/store/cartSlice";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 py-4 dark:border-zinc-800">
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-50">{line.name}</p>
        <p className="text-sm text-zinc-500">
          {formatCurrency(line.price)} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          className="w-16 rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          value={line.quantity}
          onChange={(e) =>
            updateQuantity(line.productId, Number(e.target.value) || 1)
          }
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => removeFromCart(line.productId)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
