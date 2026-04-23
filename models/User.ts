import mongoose, { Schema, type InferSchemaType } from "mongoose";
import type { UserRole } from "@/types";

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"] satisfies UserRole[],
      default: "user",
      index: true,
    },
    cartItems: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const UserModel =
  mongoose.models.User ?? mongoose.model("User", userSchema);
