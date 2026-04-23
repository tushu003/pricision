"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

export interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const src = product.images[0];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{product.category}</p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{product.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{product.description}</p>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">
          {formatCurrency(product.price, product.currency)}
        </p>
        <p className="text-sm text-zinc-500">SKU: {product.sku}</p>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="mt-2 w-full max-w-xs sm:w-auto"
          onClick={() =>
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.images[0],
            })
          }
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Out of stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
