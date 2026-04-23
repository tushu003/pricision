import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserPublic } from "@/types";

interface UserState {
  user: UserPublic | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserPublic | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
