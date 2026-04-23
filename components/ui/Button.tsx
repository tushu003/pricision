import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-900 text-white shadow hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
        secondary:
          "border border-zinc-300 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800",
        ghost:
          "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        {...(!asChild ? { type } : {})}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
