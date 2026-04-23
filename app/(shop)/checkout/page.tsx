"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, emptyCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const line1 = String(fd.get("line1") ?? "");
    const city = String(fd.get("city") ?? "");
    setLoading(true);
    try {
      await createOrder({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        shippingAddress: {
          line1,
          city,
        },
      });
      emptyCart();
      router.push(ROUTES.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Total: <span className="font-medium">{formatCurrency(total)}</span>
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm" htmlFor="line1">
            Address line 1
          </label>
          <Input id="line1" name="line1" required />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="city">
            City
          </label>
          <Input id="city" name="city" required />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={loading || items.length === 0}>
          {loading ? "Placing order…" : "Place order"}
        </Button>
      </form>
    </div>
  );
}
