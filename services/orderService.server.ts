import { cookies } from "next/headers";
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { Order } from "@/types";

export async function fetchMyOrdersFromServer(): Promise<{ orders: Order[] }> {
  const base = getBaseUrl();
  const jar = await cookies();
  const cookieHeader = jar.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${base}/api/orders`, {
    cache: "no-store",
    headers: { cookie: cookieHeader },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : "Failed to load orders",
    );
  }
  return json.data as { orders: Order[] };
}
