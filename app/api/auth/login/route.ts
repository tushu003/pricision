import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { COOKIE_SESSION } from "@/constants";
import { signSessionToken, sessionCookieOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { toUserPublic } from "@/lib/mappers";
import { loginSchema } from "@/lib/validations";
import { UserModel } from "@/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const user = await UserModel.findOne({ email: parsed.data.email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signSessionToken({
      sub: user._id.toString(),
      role: user.role,
    });

    const res = NextResponse.json({
      data: { user: toUserPublic(user) },
    });
    res.cookies.set(COOKIE_SESSION, token, sessionCookieOptions());
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
