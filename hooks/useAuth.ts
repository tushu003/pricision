"use client";

import { useCallback } from "react";
import { clearUser, setUser } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { UserPublic } from "@/types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.user);

  const loginClient = useCallback(
    (next: UserPublic) => {
      dispatch(setUser(next));
    },
    [dispatch],
  );

  const logoutClient = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    user,
    isAuthenticated: Boolean(user),
    loginClient,
    logoutClient,
  };
}
