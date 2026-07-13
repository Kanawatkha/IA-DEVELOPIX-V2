import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItemsSchema, type CartItem } from "../schemas/cart-schema";

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isQuoteOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsQuoteOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,
      isQuoteOpen: false,
      addToCart: (item, quantity = 1) =>
        set((state) => {
          const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
          const nextItems = existingItem
            ? state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem,
              )
            : [{ ...item, quantity }, ...state.cartItems];

          return { cartItems: CartItemsSchema.parse(nextItems) };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: quantity <= 0
            ? state.cartItems.filter((item) => item.id !== id)
            : state.cartItems.map((item) => item.id === id ? { ...item, quantity } : item),
        })),
      clearCart: () => set({ cartItems: [] }),
      setIsCartOpen: (isCartOpen) => set({ isCartOpen }),
      setIsQuoteOpen: (isQuoteOpen) => set({ isQuoteOpen }),
    }),
    {
      name: "ia-developix-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
      merge: (persistedState, currentState) => {
        const parsedItems = CartItemsSchema.safeParse(
          (persistedState as { cartItems?: unknown } | undefined)?.cartItems,
        );
        return {
          ...currentState,
          cartItems: parsedItems.success ? parsedItems.data : [],
        };
      },
    },
  ),
);

export function getCartTotals(items: readonly CartItem[]) {
  return {
    cartCount: items.reduce((total, item) => total + item.quantity, 0),
    cartSubtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
  };
}
