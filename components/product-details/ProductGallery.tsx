"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

const FALLBACK_IMAGE = "/images/placeholders/product.svg";

function normalizeImages(images: string[]) {
  const uniq = Array.from(new Set(images.filter(Boolean)));
  return uniq.length ? uniq : [FALLBACK_IMAGE];
}

export function ProductGallery({ images, alt, className }: ProductGalleryProps) {
  const items = React.useMemo(() => normalizeImages(images), [images]);
  const [active, setActive] = React.useState(() => items[0] ?? FALLBACK_IMAGE);
  const safeActive = items.includes(active) ? active : (items[0] ?? FALLBACK_IMAGE);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Image
          src={safeActive}
          alt={alt}
          fill
          priority
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex gap-3 overflow-auto pb-1">
        {items.map((src) => {
          const selected = src === safeActive;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActive(src)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:bg-zinc-950",
                selected
                  ? "border-zinc-900 ring-2 ring-zinc-900/10 dark:border-white dark:ring-white/15"
                  : "border-zinc-200 dark:border-zinc-800",
              )}
              aria-label="Select image"
              aria-pressed={selected}
            >
              <Image src={src} alt={alt} fill className="object-cover" sizes="80px" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

