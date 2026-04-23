import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { toOrder } from "@/lib/mappers";
import { getSessionCookie } from "@/lib/session";
import { OrderModel } from "@/models";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const session = await getSessionCookie();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await connectDb();
    const doc = await OrderModel.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (doc.userId.toString() !== session.sub && session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ data: toOrder(doc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load order" }, { status: 500 });
  }
}
