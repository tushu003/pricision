"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

export interface TopCategoriesProps {
  className?: string;
}

type CategoryCard = {
  name: string;
  slug: string;
  label?: "Popular" | "New";
  imageSrc: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    name: "Headphones",
    slug: "earbuds",
    label: "Popular",
    imageSrc:
      "https://images.unsplash.com/photo-1518441902117-f0a608e89c8d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Chargers",
    slug: "chargers",
    label: "Popular",
    imageSrc:
      "https://images.unsplash.com/photo-1583863788434-e58a36330de3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cables",
    slug: "cables",
    imageSrc:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Power Banks",
    slug: "power-banks",
    label: "New",
    imageSrc:
      "https://images.unsplash.com/photo-1612817159623-03970f9137cf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    imageSrc:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Accessories",
    slug: "cases",
    imageSrc:
      "https://images.unsplash.com/photo-1523475496153-3d6cc0f0bfca?auto=format&fit=crop&w=1200&q=80",
  },
];

export function TopCategories({ className }: TopCategoriesProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Top Categories</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Browse products by category</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.slice(0, 6).map((c) => (
          <Link
            key={c.slug}
            href={`${ROUTES.products}?category=${encodeURIComponent(c.slug)}`}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="relative h-36 sm:h-40">
              <Image
                src={c.imageSrc}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-zinc-950/15 to-transparent" />
              {c.label ? (
                <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur dark:bg-zinc-950/80 dark:text-white">
                  {c.label}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{c.name}</p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Explore now</p>
              </div>
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition group-hover:border-zinc-300 group-hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-900">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

