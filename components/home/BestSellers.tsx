"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

export interface BestSellersProps {
  products: Product[];
  className?: string;
  /**
   * Optional override for how many products to show.
   * Defaults to 6 (and clamps to [4..8]).
   */
  limit?: number;
}

type BestSellerMeta = {
  rating: number; // 0..5
  reviews: number;
  /** Optional "compare at" price for discount presentation. */
  compareAtPrice?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hashToInt(input: string) {
  // Deterministic, lightweight hash for mock "popularity" metadata.
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function metaForProduct(p: Product): BestSellerMeta {
  const h = hashToInt(p.id ?? p.slug ?? p.name);
  const rating = 4.1 + ((h % 90) / 100); // 4.10 - 4.99
  const reviews = 120 + (h % 1600);

  // ~45% of products show a compare-at price.
  const discounted = (h % 20) < 9;
  const bump = 1.1 + ((h % 25) / 100); // 1.10 - 1.34
  const compareAtPrice = discounted ? Math.round(p.price * bump * 100) / 100 : undefined;

  return { rating: Math.min(5, rating), reviews, compareAtPrice };
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full;
        const halfFilled = !filled && half && i === full;
        return (
          <span key={i} className="relative inline-flex">
            <Star
              className={cn(
                "size-4",
                filled || halfFilled ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-700",
              )}
            />
            {halfFilled ? (
              <span
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
                aria-hidden="true"
              >
                <Star className="size-4 fill-amber-400 text-amber-400" />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function BestSellerCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const src = product.images[0];
  const { rating, reviews, compareAtPrice } = React.useMemo(() => metaForProduct(product), [product]);
  const isDiscounted = typeof compareAtPrice === "number" && compareAtPrice > product.price;
  const discountPct = isDiscounted
    ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link
        href={ROUTES.product(product.id)}
        className="relative aspect-square bg-zinc-100 dark:bg-zinc-900"
        aria-label={product.name}
      >
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : null}

        {isDiscounted ? (
          <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-zinc-900/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur dark:bg-white/90 dark:text-zinc-900">
            {discountPct}% OFF
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <Link href={ROUTES.product(product.id)} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 transition group-hover:text-zinc-950 dark:text-white">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2">
            <Stars value={rating} />
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {rating.toFixed(1)} · {reviews.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-zinc-900 dark:text-white">
              {formatCurrency(product.price, product.currency)}
            </span>
            {isDiscounted ? (
              <span className="text-sm text-zinc-500 line-through dark:text-zinc-500">
                {formatCurrency(compareAtPrice!, product.currency)}
              </span>
            ) : null}
          </div>

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

export function BestSellers({ products, className, limit }: BestSellersProps) {
  const clamped = clamp(limit ?? 6, 4, 8);
  const items = React.useMemo(() => products.slice(0, clamped), [products, clamped]);

  if (items.length === 0) return null;

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Best Sellers</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Most popular products right now
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <BestSellerCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

