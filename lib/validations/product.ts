import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().min(1).max(8000),
  price: z.number().positive(),
  currency: z.string().length(3).default("USD"),
  images: z.array(z.string().min(1)).default([]),
  category: z.string().min(1).max(80),
  sku: z.string().min(1).max(80),
  stock: z.number().int().min(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
