import { cookies } from "next/headers";
import { COOKIE_SESSION } from "@/constants";
import { verifySessionToken } from "./auth";

export async function getSessionCookie() {
  const store = await cookies();
  const token = store.get(COOKIE_SESSION)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
