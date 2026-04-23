import { getBaseUrl } from "@/lib/getBaseUrl";
import type { Paginated, Product } from "@/types";

export async function fetchProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<Paginated<Product>> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.pageSize) search.set("pageSize", String(params.pageSize));
  if (params?.category) search.set("category", params.category);
  const q = search.toString();
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products${q ? `?${q}` : ""}`, {
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : "Failed to load products",
    );
  }
  return json.data as Paginated<Product>;
}

export async function fetchProductById(id: string): Promise<Product> {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : "Product not found",
    );
  }
  return json.data as Product;
}
