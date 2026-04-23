import { fetchMyOrdersFromServer } from "@/services/orderService.server";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  let orders: Awaited<ReturnType<typeof fetchMyOrdersFromServer>>["orders"];
  try {
    orders = (await fetchMyOrdersFromServer()).orders;
  } catch {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your orders</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">No orders yet.</p>
      ) : (
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {orders.map((o) => (
            <li key={o.id} className="py-4">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                Order {o.id.slice(-8)}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {o.status} · {formatCurrency(o.total, o.currency)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
