import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";
import { APP_NAME, BRAND_NAME, ROUTES } from "@/constants";

const footerLinks = {
  shop: [
    { href: ROUTES.products, label: "All products" },
    { href: ROUTES.categories, label: "Categories" },
    { href: ROUTES.cart, label: "Cart" },
  ],
  company: [
    { href: ROUTES.account, label: "Account" },
    { href: ROUTES.orders, label: "Orders" },
  ],
} as const;

const social = [
  { href: "https://example.com", label: "Website", Icon: Globe },
  { href: "mailto:support@example.com", label: "Email", Icon: Mail },
  { href: "https://example.com/share", label: "Social", Icon: Share2 },
] as const;

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`mt-auto border-t border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/40 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">{BRAND_NAME}</p>
            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Electronics accessories — earbuds, chargers, and smart gadgets. Part of {APP_NAME}.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ href, label, Icon }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex size-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-300 dark:hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Shop
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-zinc-200 pt-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          © {new Date().getFullYear()} {BRAND_NAME} · {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
