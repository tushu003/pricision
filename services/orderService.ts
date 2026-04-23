import { getBaseUrl } from "@/lib/getBaseUrl";
import type { Order } from "@/types";

export async function fetchMyOrders(): Promise<{ orders: Order[] }> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/orders`, {
    cache: "no-store",
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : "Failed to load orders",
    );
  }
  return json.data as { orders: Order[] };
}

export async function createOrder(body: {
  items: { productId: string; quantity: number }[];
  shippingAddress?: Record<string, string>;
}): Promise<{ order: Order }> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof json.error === "string" ? json.error : "Order failed");
  }
  return json.data as { order: Order };
}
