import type { OrderDocument, ProductDocument, UserDocument } from "@/models";
import type { Order, Product, UserPublic } from "@/types";

export function toUserPublic(doc: UserDocument): UserPublic {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
  };
}

export function toProduct(doc: ProductDocument): Product {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    currency: doc.currency,
    images: doc.images ?? [],
    category: doc.category,
    sku: doc.sku,
    stock: doc.stock,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export function toOrder(doc: OrderDocument): Order {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    items: (doc.items ?? []).map((i) => ({
      productId: i.productId.toString(),
      name: i.name,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
    status: doc.status,
    total: doc.total,
    currency: doc.currency,
    shippingAddress:
      doc.shippingAddress && typeof doc.shippingAddress === "object"
        ? (doc.shippingAddress as Record<string, string>)
        : undefined,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}
