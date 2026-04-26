"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface NewsletterProps {
  className?: string;
}

function isValidEmail(value: string) {
  // Pragmatic validation (good UX): requires one "@", a dot after it, and no spaces.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const next = email.trim();
      if (!next) {
        setError("Please enter your email.");
        setStatus("idle");
        return;
      }
      if (!isValidEmail(next)) {
        setError("Please enter a valid email address.");
        setStatus("idle");
        return;
      }

      setError(null);
      setStatus("success");
      setEmail("");
    },
    [email],
  );

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-linear-to-b from-zinc-50 to-white p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-950 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
            <Mail className="size-5" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">Stay Updated</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Get the latest deals and updates</p>

          <form onSubmit={onSubmit} className="mt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
              <div className="flex-1">
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                    if (status !== "idle") setStatus("idle");
                  }}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className={cn(
                    "h-11 rounded-xl",
                    error
                      ? "border-red-500 focus-visible:border-red-600 focus-visible:ring-red-500/15 dark:border-red-500 dark:focus-visible:border-red-400 dark:focus-visible:ring-red-400/20"
                      : "",
                  )}
                />
              </div>
              <Button type="submit" size="lg" className="h-11 rounded-xl">
                Subscribe
              </Button>
            </div>

            <div className="mt-3 min-h-5 text-center text-xs">
              {status === "success" ? (
                <p className="text-emerald-700 dark:text-emerald-400">
                  You&apos;re subscribed. Welcome to TechGear updates.
                </p>
              ) : error ? (
                <p className="text-red-600 dark:text-red-400">{error}</p>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-500">We respect your privacy</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

