import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { getSessionCookie } from "@/lib/session";
import { ProductModel, UserModel } from "@/models";
import { z } from "zod";

const cartBodySchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
    }),
  ),
});

export async function GET() {
  try {
    const session = await getSessionCookie();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const user = await UserModel.findById(session.sub).lean();
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    type CartLine = {
      productId: mongoose.Types.ObjectId;
      quantity: number;
    };
    const items = (user.cartItems ?? []) as CartLine[];
    const productIds = items.map((i) => i.productId);
    const products = await ProductModel.find({ _id: { $in: productIds } }).lean();
    const byId = new Map(products.map((p) => [p._id.toString(), p]));

    const lines = items
      .map((line) => {
        const p = byId.get(line.productId.toString());
        if (!p) return null;
        return {
          productId: p._id.toString(),
          name: p.name,
          price: p.price,
          quantity: line.quantity,
          image: p.images?.[0],
        };
      })
      .filter(Boolean);

    return NextResponse.json({ data: { items: lines } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionCookie();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = cartBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const cartItems = parsed.data.items.map((i) => ({
      productId: new mongoose.Types.ObjectId(i.productId),
      quantity: i.quantity,
    }));

    await UserModel.findByIdAndUpdate(session.sub, { cartItems });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
