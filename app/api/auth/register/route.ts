import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { COOKIE_SESSION } from "@/constants";
import { signSessionToken, sessionCookieOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { toUserPublic } from "@/lib/mappers";
import { registerSchema } from "@/lib/validations";
import { UserModel } from "@/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const existing = await UserModel.findOne({ email: parsed.data.email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await UserModel.create({
      email: parsed.data.email,
      passwordHash,
      name: parsed.data.name,
      role: "user",
    });

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
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
