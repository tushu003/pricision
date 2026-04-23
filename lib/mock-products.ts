import { MOCK_PRODUCTS } from "@/data/mock-products";
import type { Product } from "@/types";

export function getMockProducts(): Product[] {
  return [...MOCK_PRODUCTS];
}

export function getMockProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getMockProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}
