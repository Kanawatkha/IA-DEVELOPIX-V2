"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number; // numeric value for calculations (e.g. 15000)
  image: string;
  quantity: number;
  href: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isQuoteOpen: boolean;
  setIsQuoteOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ia-developix-cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart items from localStorage", e);
    }
  }, []);

  // Save cart to localStorage when updated
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem("ia-developix-cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart items to localStorage", e);
    }
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const existingIndex = cartItems.findIndex((i) => i.id === item.id);
    let newItems = [...cartItems];
    if (existingIndex > -1) {
      const updatedItem = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + quantity
      };
      newItems.splice(existingIndex, 1);
      newItems.unshift(updatedItem);
    } else {
      newItems.unshift({ ...item, quantity });
    }
    saveCart(newItems);
  };

  const removeFromCart = (id: string) => {
    const newItems = cartItems.filter((i) => i.id !== id);
    saveCart(newItems);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newItems = cartItems.map((i) => (i.id === id ? { ...i, quantity } : i));
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isQuoteOpen,
        setIsQuoteOpen,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
