"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const src = product.images[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={ROUTES.product(product.id)} className="relative aspect-square bg-zinc-100 dark:bg-zinc-900">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={ROUTES.product(product.id)}>
          <h2 className="font-semibold text-zinc-900 hover:underline dark:text-white">
            {product.name}
          </h2>
        </Link>
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-base font-bold text-zinc-900 dark:text-white">
            {formatCurrency(product.price, product.currency)}
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={product.stock <= 0}
            onClick={() =>
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
              })
            }
          >
            {product.stock <= 0 ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
