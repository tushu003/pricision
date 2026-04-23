import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus-visible:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
