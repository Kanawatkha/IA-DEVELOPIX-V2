import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  image: z.string().url(),
  quantity: z.number().int().positive(),
  href: z.string().min(1),
});

export const CartItemsSchema = z.array(CartItemSchema);

export type CartItem = z.infer<typeof CartItemSchema>;
