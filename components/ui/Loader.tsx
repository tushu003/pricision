import { cn } from "@/lib/utils";

export interface LoaderProps {
  className?: string;
  label?: string;
}

export function Loader({ className, label = "Loading" }: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block size-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100",
        className,
      )}
    />
  );
}
