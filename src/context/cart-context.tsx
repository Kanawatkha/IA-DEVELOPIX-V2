"use client";

import React from "react";
import { useCartStore, getCartTotals } from "@/src/features/cart/store/cart-store";
export type { CartItem } from "@/src/features/cart/schemas/cart-schema";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totals = getCartTotals(cartItems);

  return {
    cartItems,
    ...totals,
    isCartOpen: useCartStore((state) => state.isCartOpen),
    setIsCartOpen: useCartStore((state) => state.setIsCartOpen),
    isQuoteOpen: useCartStore((state) => state.isQuoteOpen),
    setIsQuoteOpen: useCartStore((state) => state.setIsQuoteOpen),
    addToCart: useCartStore((state) => state.addToCart),
    removeFromCart: useCartStore((state) => state.removeFromCart),
    updateQuantity: useCartStore((state) => state.updateQuantity),
    clearCart: useCartStore((state) => state.clearCart),
  };
}
