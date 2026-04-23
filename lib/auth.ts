import * as jose from "jose";
import type { UserRole } from "@/types";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is required in production");
    }
    return new TextEncoder().encode(
      "dev-only-secret-change-me-32chars-minimum!!",
    );
  }
  return new TextEncoder().encode(secret);
};

export interface SessionPayload {
  sub: string;
  role: UserRole;
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return await new jose.SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    const sub = typeof payload.sub === "string" ? payload.sub : null;
    const role = payload.role;
    if (!sub || (role !== "user" && role !== "admin")) {
      return null;
    }
    return { sub, role };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
