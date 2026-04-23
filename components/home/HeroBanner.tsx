"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

export interface HeroBannerProps {
  className?: string;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518441902117-f0a608e89c8d?auto=format&fit=crop&w=1600&q=80";

export function HeroBanner({ className }: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-zinc-200 bg-linear-to-b from-white via-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 size-112 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute -bottom-24 -right-24 size-120 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
        <div className="absolute left-1/2 top-10 h-px w-[min(68rem,92vw)] -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div className="relative">
          <div className="animate-hero-enter">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-200 dark:shadow-black/20">
              <Sparkles className="size-4 text-sky-600 dark:text-sky-400" />
              New arrivals every week
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              Upgrade Your Tech Accessories
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
              Top-quality gadgets at unbeatable prices
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href={ROUTES.products}>
                  Shop Now <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href={ROUTES.deals}>Explore Deals</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-500">
              <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
                Fast shipping
              </span>
              <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
                Secure checkout
              </span>
              <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
                Premium support
              </span>
            </div>
          </div>
        </div>

        <div className="relative animate-hero-enter-delay">
          <div className="absolute -inset-6 rounded-4xl bg-linear-to-tr from-sky-500/15 via-transparent to-indigo-500/15 blur-2xl dark:from-sky-400/10 dark:to-indigo-400/10" />
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30">
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/0 to-white/20 dark:to-white/5" />
            <Image
              src={HERO_IMAGE}
              alt="Electronics accessories — headphones, charger, cables"
              width={1200}
              height={900}
              priority
              className="h-72 w-full object-cover sm:h-88 md:h-104"
            />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-500">
            Curated essentials for work, travel, and everyday carry.
          </p>
        </div>
      </div>
    </section>
  );
}

