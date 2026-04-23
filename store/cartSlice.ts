import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartLine {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartLine[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartLine>) {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    setQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const line = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (!line) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload.productId,
        );
      } else {
        line.quantity = action.payload.quantity;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, setQuantity, removeItem, clearCart } =
  cartSlice.actions;
