/**
 * @file use-cart.ts
 * @description Custom React hook wrapping Zustand store selectors for Cart feature states and operations.
 */

import { useCartStore, getCartTotals } from "../store/cart-store";

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
