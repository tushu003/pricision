import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  shippingAddress: z.record(z.string(), z.string()).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
