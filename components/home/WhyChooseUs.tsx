"use client";

import * as React from "react";
import { Package, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhyChooseUsProps {
  className?: string;
}

type Feature = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FEATURES: Feature[] = [
  {
    title: "Fast Delivery",
    description: "Get products delivered quickly",
    Icon: Package,
  },
  {
    title: "Secure Payment",
    description: "Safe and trusted payment methods",
    Icon: ShieldCheck,
  },
  {
    title: "Best Quality",
    description: "Premium electronics accessories",
    Icon: Sparkles,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free return policy",
    Icon: RotateCcw,
  },
];

export function WhyChooseUs({ className }: WhyChooseUsProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Why Choose Us</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            We provide the best service for your needs
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-900 transition group-hover:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:group-hover:bg-zinc-900">
              <Icon className="size-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

