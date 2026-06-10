"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe, Info, Tag, ArrowRight, CornerDownLeft, Undo2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/context/cart-context";
import { ShopCollections } from "@/src/features/products/components/shop-collections";

export default function CartPage() {
  const { 
    cartItems, 
    cartSubtotal, 
    removeFromCart, 
    updateQuantity, 
    setIsQuoteOpen 
  } = useCart();

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
    <div className="w-full bg-canvas text-primary pt-8 md:pt-16 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full flex flex-col">
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-[4px] text-primary mb-6">
              Your cart is empty
            </h1>
            <p className="font-serif text-sm text-body mb-8 max-w-md mx-auto leading-relaxed">
              Before you proceed to checkout, you must add some products to your shopping cart. You will find a lot of interesting robotics products on our store.
            </p>
            <Link
              href="/store"
              className="flex items-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3.5 px-8 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
            >
              <span>Continue shopping</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            {/* Top Page Header */}
            <div className="flex items-center justify-between pb-8 border-b border-hairline mb-8 md:mb-12">
              <h1 className="font-display text-4xl md:text-[60px] uppercase tracking-[4px] text-primary">
                Your cart
              </h1>
              <Link
                href="/store"
                className="flex items-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3.5 px-6 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none whitespace-nowrap"
              >
                <Undo2 size={14} />
                <span>Continue shopping</span>
              </Link>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              
              {/* Left Column: Cart list items */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
                
                {/* Desktop headers */}
                <div className="hidden md:grid grid-cols-12 pb-3 border-b border-hairline font-mono text-[10px] text-muted uppercase tracking-[2px]">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-4 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-hairline">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 py-6 gap-4 items-center">
                      
                      {/* Product Detail Card (6 cols on desktop) */}
                      <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                        <div className="w-[90px] h-[90px] border border-hairline bg-surface-soft shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display text-sm tracking-[2px] uppercase truncate text-primary">
                            {item.name}
                          </h4>
                          <p className="font-mono text-xs text-muted mt-1">
                            {formatPrice(item.price)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="font-mono text-[10px] uppercase text-muted hover:text-primary underline transition-colors mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls (2 cols on desktop) */}
                      <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                        <div className="flex items-center border border-hairline py-1 px-3 space-x-4 rounded-full bg-surface-soft">
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
                      </div>

                      {/* Total price for this item (4 cols on desktop) */}
                      <div className="col-span-1 md:col-span-4 text-left md:text-right">
                        <span className="font-mono text-sm text-primary md:font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Left Column Accordions */}
                <div className="border-t border-hairline pt-6 space-y-3">
                  
                  {/* Estimate Shipping */}
                  <div className="border-b border-hairline">
                    <button
                      onClick={() => toggleAccordion("ship")}
                      className="flex items-center justify-between w-full py-4 text-left font-mono text-xs uppercase tracking-[2px] text-muted hover:text-primary transition-colors outline-none"
                    >
                      <span className="flex items-center gap-2"><Globe size={14} /> Estimate shipping</span>
                      <motion.div animate={{ rotate: openAccordion === "ship" ? 180 : 0 }}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openAccordion === "ship" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col space-y-4 pb-6">
                            <p className="font-serif text-xs text-muted leading-relaxed">
                              SHIPPING CHARGES ARE ESTIMATED BASED ON THE DOMESTIC THAILAND STANDARD POSTAGE OR COURIER SERVICES. TAX IS INCLUDED IN PRODUCTS.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Discount Collapsible */}
                  <div className="border-b border-hairline">
                    <button
                      onClick={() => toggleAccordion("discount")}
                      className="flex items-center justify-between w-full py-4 text-left font-mono text-xs uppercase tracking-[2px] text-muted hover:text-primary transition-colors outline-none"
                    >
                      <span className="flex items-center gap-2"><Tag size={14} /> Discount code</span>
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
                          <div className="flex gap-3 pb-6 max-w-md">
                            <input
                              type="text"
                              placeholder="ENTER PROMO CODE"
                              className="flex-1 bg-surface-soft border border-hairline p-3 font-mono text-xs text-primary outline-none focus:border-hairline-strong rounded-none"
                            />
                            <button className="border border-primary font-mono text-xs px-6 rounded-pill hover:bg-primary hover:text-canvas transition-colors">
                              APPLY
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

              {/* Right Column: Checkout side-card */}
              <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-[100px] bg-surface-soft border border-hairline p-6 rounded-2xl flex flex-col space-y-6">
                
                {/* Free Shipping Progress */}
                <div>
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

                <div className="border-t border-hairline pt-6 flex items-center justify-between">
                  <span className="font-mono text-sm uppercase tracking-[2px] text-muted">Subtotal</span>
                  <span className="font-mono text-xl uppercase text-primary font-bold">{formatPrice(cartSubtotal)}</span>
                </div>
                
                <p className="font-serif text-xs text-muted leading-tight">
                  Tax included. Shipping calculated at checkout.
                </p>

                {/* Note Area */}
                <div className="flex flex-col space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted">Add a note to your order</span>
                  <textarea
                    placeholder="SPECIAL INSTRUCTIONS"
                    className="w-full bg-canvas border border-hairline p-3 font-serif text-xs text-primary outline-none focus:border-hairline-strong h-28 placeholder:text-muted/50 rounded-none uppercase"
                  />
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full bg-primary text-canvas font-mono text-xs uppercase tracking-[2.5px] py-4 px-6 rounded-pill hover:opacity-85 transition-opacity outline-none text-center font-bold"
                >
                  Check out
                </button>

              </div>

            </div>
          </>
        )}

      </div>

      {/* Section 2: Recommendation Carousel */}
      <div className="mt-16 md:mt-24">
        <ShopCollections title="You may also like" defaultFilter="ALL" />
      </div>

    </div>
  );
}
