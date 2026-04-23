"use client";

import * as React from "react";

const STORAGE_KEY = "techgear_wishlist_ids";

function readCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

/** Client-side wishlist count from localStorage (extend when you add wishlist actions). */
export function useWishlistCount() {
  const [count, setCount] = React.useState(() => readCount());

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setCount(readCount());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return count;
}
