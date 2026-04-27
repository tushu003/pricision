"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, Info, Minus, Package, Plus, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn, formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

export interface ProductInfoProps {
  product: Product;
  className?: string;
}

function hashToInt(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function ratingFor(product: Product) {
  const h = hashToInt(product.id ?? product.slug ?? product.name);
  const value = 4.1 + ((h % 90) / 100); // 4.10 - 4.99
  const reviews = 80 + (h % 1400);
  return { value: Math.min(5, value), reviews };
}

function compareAtFor(product: Product) {
  const h = hashToInt(product.slug);
  const discounted = (h % 20) < 9;
  if (!discounted) return null;
  const bump = 1.12 + ((h % 20) / 100); // 1.12 - 1.31
  const compareAt = Math.round(product.price * bump * 100) / 100;
  return compareAt > product.price ? compareAt : null;
}

function brandFor(product: Product) {
  const brands = ["TechGear", "Nova", "Pulse", "Orbit", "Arc", "Zen"] as const;
  const h = hashToInt(product.sku ?? product.slug ?? product.id);
  return brands[h % brands.length];
}

function warrantyFor(product: Product) {
  const h = hashToInt(product.slug);
  return (h % 2) === 0 ? "12-month warranty" : "6-month warranty";
}

function etaFor(product: Product) {
  const h = hashToInt(product.id);
  const days = 2 + (h % 4); // 2-5 days
  return `${days}–${days + 1} days`;
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
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
              <span className="pointer-events-none absolute inset-0 overflow-hidden" style={{ width: "50%" }} aria-hidden="true">
                <Star className="size-4 fill-amber-400 text-amber-400" />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export function ProductInfo({ product, className }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { value: rating, reviews } = React.useMemo(() => ratingFor(product), [product]);
  const compareAt = React.useMemo(() => compareAtFor(product), [product]);
  const brand = React.useMemo(() => brandFor(product), [product]);
  const warranty = React.useMemo(() => warrantyFor(product), [product]);
  const eta = React.useMemo(() => etaFor(product), [product]);
  const discountPct =
    compareAt && compareAt > product.price ? Math.round(((compareAt - product.price) / compareAt) * 100) : 0;

  const [qty, setQty] = React.useState(1);
  const inStock = product.stock > 0;
  const maxQty = Math.max(1, Math.min(10, product.stock || 10));

  const clampQty = React.useCallback(
    (n: number) => Math.max(1, Math.min(maxQty, Number.isFinite(n) ? n : 1)),
    [maxQty],
  );

  const dec = () => setQty((q) => clampQty(q - 1));
  const inc = () => setQty((q) => clampQty(q + 1));
  const onQtyChange = (raw: string) => {
    if (!raw) {
      setQty(1);
      return;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    setQty(clampQty(Math.floor(parsed)));
  };

  const add = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.images[0],
    });
  };

  const buyNow = () => {
    add();
    router.push(ROUTES.checkout);
  };

  const lineTotal = product.price * qty;

  return (
    <div className={cn("space-y-7", className)}>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            Brand: {brand}
          </span>
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            Category: <span className="ml-1 capitalize">{product.category.replace(/-/g, " ")}</span>
          </span>
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            SKU: {product.sku}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Stars value={rating} />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {rating.toFixed(1)} · {reviews.toLocaleString()} reviews
            </span>
          </div>
          <span className="text-sm text-zinc-400 dark:text-zinc-600">•</span>
          <span
            className={cn(
              "text-sm font-medium",
              inStock ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {inStock ? "In stock" : "Out of stock"}
          </span>
          {inStock ? (
            <>
              <span className="text-sm text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Only <span className="font-semibold text-zinc-900 dark:text-white">{product.stock}</span> left
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-bold text-zinc-900 dark:text-white">
          {formatCurrency(product.price, product.currency)}
        </span>
        {compareAt ? (
          <>
            <span className="text-sm text-zinc-500 line-through dark:text-zinc-500">
              {formatCurrency(compareAt, product.currency)}
            </span>
            <span className="inline-flex rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
              -{discountPct}%
            </span>
          </>
        ) : null}
      </div>

      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{product.description}</p>

      <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Quantity</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Total:{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {formatCurrency(lineTotal, product.currency)}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <Button
              variant="ghost"
              size="icon"
              onClick={dec}
              disabled={!inStock || qty <= 1}
              aria-label="Decrease quantity"
            >
            <Minus className="size-4" />
          </Button>
            <Input
              value={String(qty)}
              onChange={(e) => onQtyChange(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label="Quantity"
              className="h-10 w-16 rounded-none border-0 text-center shadow-none focus-visible:ring-0"
              disabled={!inStock}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={inc}
              disabled={!inStock || qty >= maxQty}
              aria-label="Increase quantity"
            >
            <Plus className="size-4" />
          </Button>
        </div>

          <div className="flex flex-1 flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={add} disabled={!inStock} className="flex-1 sm:flex-none">
              Add to Cart
            </Button>
            <Button variant="secondary" size="lg" onClick={buyNow} disabled={!inStock} className="flex-1 sm:flex-none">
              Buy Now
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <Truck className="mt-0.5 size-5 text-zinc-900/70 dark:text-white/70" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Fast delivery</p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">Estimated arrival: {eta}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <ShieldCheck className="mt-0.5 size-5 text-zinc-900/70 dark:text-white/70" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Secure payment</p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">Trusted checkout & protection</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <RefreshCcw className="mt-0.5 size-5 text-zinc-900/70 dark:text-white/70" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Easy returns</p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">7-day hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <BadgeCheck className="mt-0.5 size-5 text-zinc-900/70 dark:text-white/70" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Warranty</p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{warranty}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Description</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description} Designed for everyday carry with a premium finish and reliable performance.
          </p>
        </div>
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Specifications</h2>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-500">Category</dt>
              <dd className="mt-1 font-medium text-zinc-900 capitalize dark:text-white">
                {product.category.replace(/-/g, " ")}
              </dd>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-500">SKU</dt>
              <dd className="mt-1 font-medium text-zinc-900 dark:text-white">{product.sku}</dd>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-500">Brand</dt>
              <dd className="mt-1 font-medium text-zinc-900 dark:text-white">{brand}</dd>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
              <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-500">What’s in the box</dt>
              <dd className="mt-1 font-medium text-zinc-900 dark:text-white">Device · Cable · Guide</dd>
            </div>
          </dl>
        </div>
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Customer reviews</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            See more reviews on the{" "}
            <Link href={ROUTES.home} className="font-medium text-sky-700 hover:underline dark:text-sky-400">
              homepage
            </Link>
            .
          </p>
        </div>
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
            <Info className="size-4 text-zinc-500 dark:text-zinc-400" />
            Store guarantee
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Package className="size-4 text-zinc-500 dark:text-zinc-500" />
              Secure packaging
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-zinc-500 dark:text-zinc-500" />
              Authentic products
            </li>
            <li className="flex items-center gap-2">
              <RefreshCcw className="size-4 text-zinc-500 dark:text-zinc-500" />
              Easy returns policy
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-zinc-500 dark:text-zinc-500" />
              Warranty support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

