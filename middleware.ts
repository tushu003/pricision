import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_SESSION } from "@/constants";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_SESSION)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (
    pathname.startsWith("/account") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/checkout")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
  ],
};
