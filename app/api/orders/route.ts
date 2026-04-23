import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { toOrder } from "@/lib/mappers";
import { getSessionCookie } from "@/lib/session";
import { createOrderSchema } from "@/lib/validations";
import { OrderModel, ProductModel } from "@/models";

export async function GET() {
  try {
    const session = await getSessionCookie();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const userId = new mongoose.Types.ObjectId(session.sub);
    const docs = await OrderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    return NextResponse.json({ data: { orders: docs.map(toOrder) } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionCookie();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const userId = new mongoose.Types.ObjectId(session.sub);

    const productIds = parsed.data.items.map((i) => i.productId);
    const products = await ProductModel.find({
      _id: { $in: productIds.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    const byId = new Map(products.map((p) => [p._id.toString(), p]));
    let total = 0;
    const lineItems = parsed.data.items.map((line) => {
      const p = byId.get(line.productId);
      if (!p) {
        throw new Error(`Missing product ${line.productId}`);
      }
      if (p.stock < line.quantity) {
        throw new Error(`Insufficient stock for ${p.name}`);
      }
      const unitPrice = p.price;
      total += unitPrice * line.quantity;
      return {
        productId: p._id,
        name: p.name,
        quantity: line.quantity,
        unitPrice,
      };
    });

    for (const line of parsed.data.items) {
      await ProductModel.updateOne(
        { _id: line.productId },
        { $inc: { stock: -line.quantity } },
      );
    }

    const order = await OrderModel.create({
      userId,
      items: lineItems,
      status: "pending",
      total,
      currency: products[0]?.currency ?? "USD",
      shippingAddress: parsed.data.shippingAddress,
    });

    return NextResponse.json({ data: { order: toOrder(order) } }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Order failed";
    if (message.startsWith("Missing product") || message.startsWith("Insufficient")) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
