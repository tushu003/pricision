export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  currency: string;
  shippingAddress?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
