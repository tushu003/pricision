"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { BRAND_NAME, ROUTES } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistCount } from "@/hooks/useWishlistCount";

const LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.products, label: "Products" },
  { href: ROUTES.categories, label: "Categories" },
  { href: ROUTES.deals, label: "Deals" },
] as const;

function cartCount(items: { quantity: number }[]) {
  return items.reduce((n, i) => n + i.quantity, 0);
}

function initials(name?: string | null) {
  const safe = (name ?? "").trim();
  if (!safe) return "TG";
  const parts = safe.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "T";
  const second = (parts[1]?.[0] ?? parts[0]?.[1] ?? "G") as string;
  return `${first}${second}`.toUpperCase();
}

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const count = useAppSelector((s) => cartCount(s.cart.items));
  const wishlistCount = useWishlistCount();
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      router.push(q ? `${ROUTES.products}?q=${encodeURIComponent(q)}` : ROUTES.products);
    },
    [query, router],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-black/20",
        className,
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-5">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
                    TG
                  </span>
                  <span className="font-semibold tracking-tight">{BRAND_NAME}</span>
                </SheetTitle>
              </SheetHeader>

              <form onSubmit={onSubmit} className="mt-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search accessories…"
                    className="pl-9"
                    aria-label="Search products"
                  />
                </div>
              </form>

              <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
                {LINKS.map(({ href, label }) => {
                  const active = href === ROUTES.home ? pathname === href : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                          : "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
                <Link
                  href={ROUTES.wishlist}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Wishlist
                </Link>
                <Link
                  href={ROUTES.cart}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Cart
                </Link>
                <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                  {isAuthenticated ? (
                    <Link
                      href={ROUTES.account}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      <Avatar className="size-9">
                        <AvatarFallback>{initials(user?.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate">{user?.name ?? "Account"}</p>
                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          View profile & orders
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={ROUTES.account}>
                        <User className="size-4" />
                        Login
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href={ROUTES.home}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="hidden size-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white shadow-sm shadow-zinc-900/10 dark:bg-white dark:text-zinc-900 sm:inline-flex">
              TG
            </span>
            <span>{BRAND_NAME}</span>
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-7 md:flex">
          <nav className="flex items-center gap-7" aria-label="Main">
            {LINKS.map(({ href, label }) => {
              const active = href === ROUTES.home ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                    active && "text-zinc-900 dark:text-white",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "pointer-events-none absolute -bottom-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-sky-500 transition-opacity dark:bg-sky-400",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <form onSubmit={onSubmit} className="w-[min(26rem,40vw)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chargers, earbuds, cables…"
                className="h-10 pl-9"
                aria-label="Search products"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={ROUTES.wishlist}
            className="relative flex size-10 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Wishlist"
          >
            <Heart className="size-5" />
            {wishlistCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            ) : null}
          </Link>

          <Link
            href={ROUTES.cart}
            className="relative flex size-10 items-center justify-center rounded-xl text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label={`Cart${count ? `, ${count} items` : ""}`}
          >
            <ShoppingCart className="size-5" />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>

          {isAuthenticated ? (
            <Link
              href={ROUTES.account}
              className="ml-1 inline-flex items-center rounded-xl p-1.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Account"
            >
              <Avatar className="size-9">
                <AvatarFallback>{initials(user?.name)}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Button asChild variant="secondary" className="ml-1 hidden sm:inline-flex">
              <Link href={ROUTES.account}>
                <User className="size-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
