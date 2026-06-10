"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Undo2 } from "lucide-react";
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

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  return (
    <div className="w-full bg-canvas text-primary pt-8 md:pt-16 pb-0">
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
                <div className="hidden md:grid grid-cols-12 pb-3 border-b border-hairline font-mono text-xs text-muted uppercase tracking-[2px]">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-4 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-hairline">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 py-6 gap-4 items-center">
                      
                      {/* Product Detail Card */}
                      <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                        <div className="w-[120px] h-[120px] border border-hairline bg-surface-soft shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display text-lg tracking-[2px] uppercase truncate text-primary">
                            {item.name}
                          </h4>
                          <p className="font-mono text-sm text-muted mt-1">
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

                      {/* Quantity Controls */}
                      <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                        <div className="flex items-center border border-hairline py-1.5 px-3.5 space-x-4 rounded-full bg-surface-soft">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-muted hover:text-primary transition-colors text-xs font-mono"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs text-primary w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-muted hover:text-primary transition-colors text-xs font-mono"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total price for this item */}
                      <div className="col-span-1 md:col-span-4 text-left md:text-right">
                        <span className="font-mono text-base text-primary font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Checkout side-card */}
              <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-[100px] bg-surface-soft border border-hairline p-6 rounded-2xl flex flex-col space-y-6">
                
                <div className="flex items-center justify-between">
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

      {/* Section 2: Recommendation Carousel - Tightened vertical spacing */}
      <div className="mt-8 md:mt-12">
        <ShopCollections title="You may also like" defaultFilter="ALL" />
      </div>

    </div>
  );
}
