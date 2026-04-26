"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bolt, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

export interface FlashSaleProps {
  className?: string;
  /**
   * Duration (ms) for the countdown starting from first client mount.
   * Default: 6 hours.
   */
  durationMs?: number;
}

type Deal = {
  title: string;
  discountLabel: string; // e.g. "-50%"
  imageSrc: string;
};

const DEALS: Deal[] = [
  { title: "Noise-cancel earbuds", discountLabel: "-50%", imageSrc: "/images/flash-sale/deal-1.svg" },
  { title: "Fast USB-C charger", discountLabel: "-30%", imageSrc: "/images/flash-sale/deal-2.svg" },
  { title: "Braided cable bundle", discountLabel: "-40%", imageSrc: "/images/flash-sale/deal-3.svg" },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function msToParts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { hours, minutes, seconds };
}

export function FlashSale({ className, durationMs = 6 * 60 * 60 * 1000 }: FlashSaleProps) {
  const [endAt, setEndAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const key = "techgear_flash_sale_end_at";
    const existing = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    const parsed = existing ? Number(existing) : NaN;
    const nextEnd = Number.isFinite(parsed) && parsed > Date.now() ? parsed : Date.now() + durationMs;
    setEndAt(nextEnd);
    try {
      window.localStorage.setItem(key, String(nextEnd));
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [durationMs]);

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = endAt ? Math.max(0, endAt - now) : durationMs;
  const { hours, minutes, seconds } = msToParts(remaining);

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 p-6 shadow-xl shadow-black/20 dark:border-zinc-800 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 size-120 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-120 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/10" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
              <Bolt className="size-4 text-amber-300" />
              Limited-time offer
              <span className="ml-1 inline-flex items-center rounded-full bg-amber-300/20 px-2 py-0.5 text-[11px] font-bold text-amber-200 animate-pulse">
                Live
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Flash Sale - Up to 50% Off
            </h2>
            <p className="mt-2 text-sm text-white/70 sm:text-base">
              Limited time offer on top electronics accessories
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur">
                <Clock3 className="size-4 text-white/70" />
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="inline-flex min-w-10 justify-center rounded-xl bg-black/20 px-2 py-1">
                    {pad2(hours)}
                  </span>
                  <span className="text-white/60">:</span>
                  <span className="inline-flex min-w-10 justify-center rounded-xl bg-black/20 px-2 py-1">
                    {pad2(minutes)}
                  </span>
                  <span className="text-white/60">:</span>
                  <span className="inline-flex min-w-10 justify-center rounded-xl bg-black/20 px-2 py-1">
                    {pad2(seconds)}
                  </span>
                </div>
              </div>

              <Button asChild size="lg" className="shadow-lg shadow-sky-500/10">
                <Link href={ROUTES.products}>Shop Now</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {DEALS.slice(0, 3).map((d) => (
              <div
                key={d.title}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-md"
              >
                <div className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/90">
                  {d.discountLabel}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative size-14 overflow-hidden rounded-2xl bg-black/20">
                    <Image
                      src={d.imageSrc}
                      alt={d.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{d.title}</p>
                    <p className="mt-1 text-xs text-white/70">Deal ends soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

