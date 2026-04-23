import { NextResponse } from "next/server";
import { COOKIE_SESSION } from "@/constants";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_SESSION, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
