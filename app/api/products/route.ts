import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { toProduct } from "@/lib/mappers";
import { getSessionCookie } from "@/lib/session";
import { createProductSchema } from "@/lib/validations";
import { ProductModel } from "@/models";

export async function GET(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(searchParams.get("pageSize") ?? "12")),
    );
    const category = searchParams.get("category");

    const filter = category ? { category } : {};
    const [total, docs] = await Promise.all([
      ProductModel.countDocuments(filter),
      ProductModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
    ]);

    return NextResponse.json({
      data: {
        items: docs.map(toProduct),
        total,
        page,
        pageSize,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to list products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionCookie();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    await connectDb();
    const doc = await ProductModel.create(parsed.data);
    return NextResponse.json({ data: toProduct(doc) }, { status: 201 });
  } catch (e) {
    if (e instanceof mongoose.mongo.MongoServerError && e.code === 11000) {
      return NextResponse.json({ error: "Duplicate slug or SKU" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
