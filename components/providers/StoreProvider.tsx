"use client";

import { Provider } from "react-redux";
import * as React from "react";
import { makeStore, type AppStore } from "@/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = React.useState<AppStore>(() => makeStore());
  return <Provider store={store}>{children}</Provider>;
}
