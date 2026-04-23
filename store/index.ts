import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { userSlice } from "./userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
