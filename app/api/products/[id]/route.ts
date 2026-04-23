import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { toProduct } from "@/lib/mappers";
import { getSessionCookie } from "@/lib/session";
import { createProductSchema } from "@/lib/validations";
import { ProductModel } from "@/models";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    await connectDb();
    const doc = await ProductModel.findById(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: toProduct(doc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getSessionCookie();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = createProductSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const doc = await ProductModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: toProduct(doc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await getSessionCookie();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await connectDb();
    const existing = await ProductModel.findByIdAndDelete(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
