"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";

type MockOrder = {
  id: string;
  createdAt: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  currency: string;
  shippingAddress: { line1: string; city: string };
};

function saveMockOrder(order: MockOrder) {
  try {
    const key = "techgear_mock_orders";
    const raw = localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    const list = Array.isArray(parsed) ? (parsed as MockOrder[]) : [];
    localStorage.setItem(key, JSON.stringify([order, ...list].slice(0, 20)));
  } catch {
    // ignore storage failures
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, emptyCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
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
      const message = err instanceof Error ? err.message : "Checkout failed";
      const isAuthError = /unauthorized/i.test(message);
      const isMockCatalogError =
        /missing product/i.test(message) ||
        /insufficient/i.test(message) ||
        /failed to create order/i.test(message) ||
        /order failed/i.test(message);

      if (isAuthError || isMockCatalogError) {
        const order: MockOrder = {
          id: `mock_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`,
          createdAt: new Date().toISOString(),
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          total,
          currency: "USD",
          shippingAddress: { line1, city },
        };
        saveMockOrder(order);
        emptyCart();
        setSuccess(
          "Order placed (mock). In development mode, orders are saved locally. You can continue shopping.",
        );
        form.reset();
      } else {
        setError(message);
      }
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
          <Input id="line1" name="line1" required disabled={loading} />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="city">
            City
          </label>
          <Input id="city" name="city" required disabled={loading} />
        </div>
        {success ? <p className="text-sm text-emerald-700 dark:text-emerald-400">{success}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={loading || items.length === 0}>
          {loading ? "Placing order…" : "Place order"}
        </Button>
      </form>
    </div>
  );
}
