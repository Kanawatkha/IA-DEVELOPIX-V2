"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/context/cart-context";

// 6 fixed robot models for the Recently Viewed tab using the requested custom image
const RECENTLY_VIEWED_ITEMS = [
  { id: "nofan-15", name: "NOFAN 15cm", cat: "LINEFOLLOWER", price: 15000, isComingSoon: false, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/linefollower/nofan-15" },
  { id: "nofan-18", name: "NOFAN 18cm", cat: "LINEFOLLOWER", price: 18000, isComingSoon: false, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/linefollower/nofan-18" },
  { id: "mission-go", name: "MISSION GO", cat: "MISSION", price: 25000, isComingSoon: false, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/mission/go" },
  { id: "mission-pro", name: "MISSION PRO", cat: "MISSION", price: 45000, isComingSoon: false, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/mission/pro" },
  { id: "fanpull-15", name: "FANPULL 15cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/linefollower/fanpull-15" },
  { id: "fanpull-18", name: "FANPULL 18cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png", href: "/products/linefollower/fanpull-18" }
];

export function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    cartSubtotal, 
    cartCount,
    addToCart, 
    removeFromCart, 
    updateQuantity,
    setIsQuoteOpen
  } = useCart();

  const [activeTab, setActiveTab] = useState<"cart" | "recent">("cart");

  // Lock background window scrolling when CartDrawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      setActiveTab("cart");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  const handleAddFromRecommendations = (item: typeof RECENTLY_VIEWED_ITEMS[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      href: item.href
    }, 1);
    setActiveTab("cart");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-canvas/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Body - Increased max-w to 550px */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-[550px] bg-[#000000] border-l border-hairline shadow-2xl rounded-l-3xl flex flex-col h-full overflow-hidden text-primary"
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-hairline relative shrink-0">
              <div className="flex space-x-8">
                {/* Cart Tab with superscript count and no parentheses */}
                <button
                  onClick={() => setActiveTab("cart")}
                  className={`font-display text-2xl tracking-[2px] uppercase pb-2 transition-colors relative outline-none ${
                    activeTab === "cart" ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  Cart
                  {cartCount > 0 && (
                    <sup className="text-xs font-mono ml-0.5 align-super text-primary">
                      {cartCount}
                    </sup>
                  )}
                  {activeTab === "cart" && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                    />
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`font-display text-2xl tracking-[2px] uppercase pb-2 transition-colors relative outline-none ${
                    activeTab === "recent" ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  Recently viewed
                  {activeTab === "recent" && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                    />
                  )}
                </button>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-muted hover:text-primary transition-colors outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {/* TAB 1: CART DETAILS */}
              {activeTab === "cart" && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[55vh] text-center px-6">
                      <p className="font-display text-xl uppercase tracking-[2px] text-primary mb-3">
                        Your cart is currently empty.
                      </p>
                      <p className="font-serif text-xs text-muted mb-8">
                        Not sure where to start? Try these collections:
                      </p>
                      <Link
                        href="/store"
                        onClick={() => setIsCartOpen(false)}
                        className="flex items-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2.5px] py-3.5 px-8 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
                      >
                        <span>Continue shopping</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-6">
                      {/* Items List - Enlarge elements layout */}
                      <div className="divide-y divide-hairline">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex py-5 gap-5 items-start">
                            {/* Product Image - Increased size to 110px */}
                            <div className="w-[110px] h-[110px] border border-hairline bg-surface-soft overflow-hidden shrink-0 rounded-md">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details - Scaled font sizes */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-base tracking-[2px] uppercase truncate text-primary">
                                {item.name}
                              </h4>
                              <p className="font-mono text-xs text-muted mt-1.5">
                                {formatPrice(item.price)}
                              </p>

                              {/* Remove & Adjust - Scaled controls */}
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center border border-hairline py-1.5 px-3.5 space-x-4 rounded-full bg-surface-soft">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-muted hover:text-primary transition-colors text-sm font-mono"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-xs text-primary w-4 text-center font-bold">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-muted hover:text-primary transition-colors text-sm font-mono"
                                  >
                                    +
                                  </button>
                                </div>
                                
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-mono text-[10px] uppercase text-muted hover:text-primary underline transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: RECENTLY VIEWED */}
              {activeTab === "recent" && (
                <div className="flex flex-col space-y-4">
                  {RECENTLY_VIEWED_ITEMS.map((item) => (
                    <div key={item.id} className="flex p-4 border border-hairline items-center gap-5 bg-surface-soft rounded-xl transition-colors hover:border-hairline-strong">
                      {/* Product Image - Increased size to 110px */}
                      <div className="w-[110px] h-[110px] border border-hairline bg-canvas overflow-hidden shrink-0 rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details - Scaled font sizes */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base tracking-[2px] uppercase truncate text-primary">
                          {item.name}
                        </h4>
                        <p className="font-mono text-xs text-muted mt-1">
                          {item.isComingSoon ? "TBA" : formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div>
                        {item.isComingSoon ? (
                          <Link
                            href={item.href}
                            onClick={() => setIsCartOpen(false)}
                            className="inline-block border border-primary text-primary font-mono text-[11px] uppercase tracking-[2px] py-2 px-5 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
                          >
                            + VIEW
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAddFromRecommendations(item)}
                            className="border border-primary text-primary font-mono text-[11px] uppercase tracking-[2px] py-2 px-5 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
                          >
                            + ADD
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Sticky Footer for Tab 1 (only when cart has items) */}
            {activeTab === "cart" && cartItems.length > 0 && (
              <div className="shrink-0 p-6 border-t border-hairline bg-[#000000] space-y-4 rounded-bl-3xl">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[2px] text-muted">Subtotal</span>
                  <span className="font-mono text-lg uppercase text-primary font-bold">{formatPrice(cartSubtotal)}</span>
                </div>
                
                <p className="font-serif text-xs text-muted leading-tight">
                  Tax included. Shipping calculated at checkout.
                </p>

                {/* Main Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsQuoteOpen(true);
                    }}
                    className="w-full bg-primary text-canvas font-mono text-xs uppercase tracking-[2.5px] py-3.5 px-6 rounded-pill hover:opacity-85 transition-opacity outline-none text-center font-bold"
                  >
                    Check out
                  </button>
                  
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full border border-primary text-primary font-mono text-xs uppercase tracking-[2.5px] py-3.5 px-6 rounded-pill hover:bg-primary hover:text-canvas transition-all outline-none text-center block"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
