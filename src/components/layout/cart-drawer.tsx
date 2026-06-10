"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ArrowRight, ShoppingCart, Info, Globe, ShieldCheck, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/context/cart-context";

// 6 fixed robot models for the Recently Viewed tab
const RECENTLY_VIEWED_ITEMS = [
  { id: "nofan-15", name: "NOFAN 15cm", cat: "LINEFOLLOWER", price: 15000, isComingSoon: false, image: "https://images.unsplash.com/photo-1617814065664-9cbfe0fa3ec6?q=80&w=1000&auto=format&fit=crop", href: "/products/linefollower/nofan-15" },
  { id: "nofan-18", name: "NOFAN 18cm", cat: "LINEFOLLOWER", price: 18000, isComingSoon: false, image: "https://images.unsplash.com/photo-1617814065664-9cbfe0fa3ec6?q=80&w=1000&auto=format&fit=crop", href: "/products/linefollower/nofan-18" },
  { id: "mission-go", name: "MISSION GO", cat: "MISSION", price: 25000, isComingSoon: false, image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop", href: "/products/mission/go" },
  { id: "mission-pro", name: "MISSION PRO", cat: "MISSION", price: 45000, isComingSoon: false, image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop", href: "/products/mission/pro" },
  { id: "fanpull-15", name: "FANPULL 15cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: "https://images.unsplash.com/photo-1617814065664-9cbfe0fa3ec6?q=80&w=1000&auto=format&fit=crop", href: "/products/linefollower/fanpull-15" },
  { id: "fanpull-18", name: "FANPULL 18cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: "https://images.unsplash.com/photo-1617814065664-9cbfe0fa3ec6?q=80&w=1000&auto=format&fit=crop", href: "/products/linefollower/fanpull-18" }
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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  const threshold = 5000;
  const progressPercent = Math.min((cartSubtotal / threshold) * 100, 100);
  const remaining = threshold - cartSubtotal;

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

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-[480px] bg-[#000000] border-l border-hairline shadow-2xl rounded-l-3xl flex flex-col h-full overflow-hidden text-primary"
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-hairline relative">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("cart")}
                  className={`font-display text-2xl tracking-[2px] uppercase pb-2 transition-colors relative outline-none ${
                    activeTab === "cart" ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                >
                  Cart
                  {cartCount > 0 && <span className="text-xs font-mono ml-1">({cartCount})</span>}
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
                    <div className="flex flex-col items-center justify-center h-[55vh] text-center">
                      <p className="font-display text-lg uppercase tracking-[2px] text-primary mb-2">
                        Your cart is currently empty.
                      </p>
                      <p className="font-serif text-xs text-muted mb-8">
                        Not sure where to start? Try these collections:
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="flex items-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3 px-8 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
                      >
                        <span>Continue shopping</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-6">
                      
                      {/* Free Shipping Indicator */}
                      <div className="border border-hairline p-4 bg-surface-soft rounded-lg">
                        <p className="font-mono text-[11px] uppercase tracking-[1px] text-primary mb-2">
                          {remaining > 0 
                            ? `Spend ${formatPrice(remaining)} more to reach free shipping!`
                            : "You qualify for free shipping!"}
                        </p>
                        <div className="w-full h-[3px] bg-hairline rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-hairline">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex py-4 gap-4 items-start">
                            {/* Product Image */}
                            <div className="w-[80px] h-[80px] border border-hairline bg-surface-soft overflow-hidden shrink-0 rounded-md">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-sm tracking-[1.5px] uppercase truncate text-primary">
                                {item.name}
                              </h4>
                              <p className="font-mono text-xs text-muted mt-1">
                                {formatPrice(item.price)}
                              </p>

                              {/* Remove & Adjust */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border border-hairline py-1 px-2.5 space-x-3 rounded-full bg-surface-soft">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-muted hover:text-primary transition-colors text-xs font-mono"
                                  >
                                    -
                                  </button>
                                  <span className="font-mono text-xs text-primary w-4 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-muted hover:text-primary transition-colors text-xs font-mono"
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

                      {/* Accordions */}
                      <div className="border-t border-hairline pt-4 space-y-2">
                        {/* Order Note Accordion */}
                        <div className="border-b border-hairline">
                          <button
                            onClick={() => toggleAccordion("note")}
                            className="flex items-center justify-between w-full py-3 text-left font-mono text-xs uppercase tracking-[1.5px] text-muted hover:text-primary transition-colors"
                          >
                            <span className="flex items-center gap-2"><Info size={14} /> Order note</span>
                            <motion.div animate={{ rotate: openAccordion === "note" ? 180 : 0 }}>
                              <ChevronDown size={14} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openAccordion === "note" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <textarea
                                  placeholder="ADD SPECIAL INSTRUCTIONS FOR YOUR ORDER"
                                  className="w-full bg-surface-soft border border-hairline p-3 font-serif text-xs text-primary outline-none focus:border-hairline-strong mb-4 h-24 placeholder:text-muted/50 rounded-none uppercase"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Shipping Calculator Accordion */}
                        <div className="border-b border-hairline">
                          <button
                            onClick={() => toggleAccordion("shipping")}
                            className="flex items-center justify-between w-full py-3 text-left font-mono text-xs uppercase tracking-[1.5px] text-muted hover:text-primary transition-colors"
                          >
                            <span className="flex items-center gap-2"><Globe size={14} /> Shipping</span>
                            <motion.div animate={{ rotate: openAccordion === "shipping" ? 180 : 0 }}>
                              <ChevronDown size={14} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openAccordion === "shipping" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="font-serif text-xs text-muted pb-4 leading-relaxed">
                                  TAX INCLUDED. SHIPPING CHARGES ARE CALCULATED ON CHECKOUT STATEMENT REPORT. FREE DOMESTIC COURIER SERVICE APPLIES TO ORDERS OVER ฿5,000 THB.
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Discount Accordion */}
                        <div className="border-b border-hairline">
                          <button
                            onClick={() => toggleAccordion("discount")}
                            className="flex items-center justify-between w-full py-3 text-left font-mono text-xs uppercase tracking-[1.5px] text-muted hover:text-primary transition-colors"
                          >
                            <span className="flex items-center gap-2"><Tag size={14} /> Discount</span>
                            <motion.div animate={{ rotate: openAccordion === "discount" ? 180 : 0 }}>
                              <ChevronDown size={14} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openAccordion === "discount" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="flex gap-2 pb-4">
                                  <input
                                    type="text"
                                    placeholder="PROMO CODE"
                                    className="flex-1 bg-surface-soft border border-hairline p-2.5 font-mono text-xs text-primary outline-none focus:border-hairline-strong rounded-none"
                                  />
                                  <button className="border border-primary font-mono text-[10px] px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors">
                                    APPLY
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                    </div>
                  )}
                </>
              )}

              {/* TAB 2: RECENTLY VIEWED */}
              {activeTab === "recent" && (
                <div className="flex flex-col space-y-4">
                  {RECENTLY_VIEWED_ITEMS.map((item) => (
                    <div key={item.id} className="flex p-3 border border-hairline items-center gap-4 bg-surface-soft rounded-xl transition-colors hover:border-hairline-strong">
                      {/* Product Image */}
                      <div className="w-[64px] h-[64px] border border-hairline bg-canvas overflow-hidden shrink-0 rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-xs tracking-[1.5px] uppercase truncate text-primary">
                          {item.name}
                        </h4>
                        <p className="font-mono text-[10px] text-muted mt-0.5">
                          {item.isComingSoon ? "TBA" : formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div>
                        {item.isComingSoon ? (
                          <Link
                            href={item.href}
                            onClick={() => setIsCartOpen(false)}
                            className="inline-block border border-primary text-primary font-mono text-[10px] uppercase tracking-[1.5px] py-1.5 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
                          >
                            + VIEW
                          </Link>
                        ) : (
                          <button
                            onClick={() => addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              href: item.href
                            })}
                            className="border border-primary text-primary font-mono text-[10px] uppercase tracking-[1.5px] py-1.5 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
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
                
                <p className="font-serif text-[11px] text-muted leading-tight">
                  Tax included. Shipping calculated at checkout.
                </p>

                {/* Main Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsQuoteOpen(true);
                    }}
                    className="w-full bg-primary text-canvas font-mono text-xs uppercase tracking-[2.5px] py-3.5 px-6 rounded-pill hover:opacity-80 transition-opacity outline-none text-center font-bold"
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
