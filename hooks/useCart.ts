"use client";

import { useCallback } from "react";
import {
  addItem,
  clearCart,
  removeItem,
  setQuantity,
  type CartLine,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const addToCart = useCallback(
    (line: CartLine) => {
      dispatch(addItem(line));
    },
    [dispatch],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch(setQuantity({ productId, quantity }));
    },
    [dispatch],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      dispatch(removeItem(productId));
    },
    [dispatch],
  );

  const emptyCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  return {
    items,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
  };
}
