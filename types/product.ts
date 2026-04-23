export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  sku: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}
