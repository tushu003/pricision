import mongoose, { Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: "USD" },
    images: { type: [String], default: [] },
    category: { type: String, required: true, index: true },
    sku: { type: String, required: true, unique: true, index: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProductModel =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
