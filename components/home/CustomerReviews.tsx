"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomerReviewsProps {
  className?: string;
}

type Review = {
  name: string;
  avatarSrc: string;
  rating: number; // 1..5
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Ayesha Rahman",
    avatarSrc: "/images/avatars/ayesha.svg",
    rating: 5,
    text: "The charger quality is excellent and the delivery was faster than expected. Packaging was premium too.",
  },
  {
    name: "Nafis Hasan",
    avatarSrc: "/images/avatars/nafis.svg",
    rating: 5,
    text: "Bought braided cables and a power bank — both feel solid and perform great. Clean UI and easy checkout.",
  },
  {
    name: "Farhan Ahmed",
    avatarSrc: "/images/avatars/farhan.svg",
    rating: 4,
    text: "Headphones arrived on time and sound is crisp. Support responded quickly to my questions. Recommended.",
  },
  {
    name: "Sadia Islam",
    avatarSrc: "/images/avatars/sadia.svg",
    rating: 5,
    text: "Amazing deals and the products look exactly like the photos. I’m coming back for more accessories.",
  },
  {
    name: "Tanvir Chowdhury",
    avatarSrc: "/images/avatars/tanvir.svg",
    rating: 4,
    text: "Smooth experience overall. The return policy is clear and reassuring. Great for everyday tech essentials.",
  },
  {
    name: "Raisa Karim",
    avatarSrc: "/images/avatars/raisa.svg",
    rating: 5,
    text: "Premium feel at a fair price. The wishlist and cart flow is seamless — exactly what I wanted.",
  },
] as const;

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            className={cn(
              "size-4",
              filled ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-700",
            )}
          />
        );
      })}
    </div>
  );
}

export function CustomerReviews({ className }: CustomerReviewsProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Customer Reviews</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            What our customers are saying
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.slice(0, 6).map((r) => (
          <article
            key={r.name}
            className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-11 overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src={r.avatarSrc}
                  alt={r.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{r.name}</p>
                <div className="mt-1">
                  <Stars value={r.rating} />
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              “{r.text}”
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

