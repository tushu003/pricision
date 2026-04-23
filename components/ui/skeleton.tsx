import { cn } from "@/lib/utils";

/** Optional loading placeholder (e.g. hero or product grid). */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800/80",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
