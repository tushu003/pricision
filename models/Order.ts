import mongoose, { Schema, type InferSchemaType } from "mongoose";
import type { OrderStatus } from "@/types";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: { type: [orderItemSchema], required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ] satisfies OrderStatus[],
      default: "pending",
      index: true,
    },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "USD" },
    shippingAddress: { type: Schema.Types.Mixed, default: undefined },
  },
  { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const OrderModel =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
