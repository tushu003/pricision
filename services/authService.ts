import type { UserPublic } from "@/types";

const jsonHeaders = { "Content-Type": "application/json" };

export async function registerUser(body: {
  email: string;
  password: string;
  name: string;
}): Promise<{ user: UserPublic }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof json.error === "string" ? json.error : "Register failed");
  }
  return json.data as { user: UserPublic };
}

export async function loginUser(body: {
  email: string;
  password: string;
}): Promise<{ user: UserPublic }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof json.error === "string" ? json.error : "Login failed");
  }
  return json.data as { user: UserPublic };
}

export async function logoutUser(): Promise<void> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
}
