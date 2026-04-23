import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-600",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-100",
        outline: "text-zinc-950 dark:text-zinc-50",
        destructive: "border-transparent bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
