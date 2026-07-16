"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Undo2, Lock, ChevronLeft, Download, Copy, Check, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/use-cart";
import { cartContent } from "@/src/content";
import { exportQuoteImage, downloadQuoteImage } from "@/src/features/cart/services/quote-export-service";
import { getMessengerUrl } from "@/src/features/cart/services/messenger-service";
import { parentVariants, childVariants } from "@/src/lib/design/variants";
import { drawQuoteToCanvas } from "../services/quote-renderer";
import { AnimatedPrice } from "./animated-price";
import { CartItemRow } from "./cart-item-row";

export function CartView() {
  const { 
    cartItems, 
    cartSubtotal, 
    removeFromCart, 
    updateQuantity, 
    setIsQuoteOpen 
  } = useCart();

  const [view, setView] = useState<"summary" | "checkout">("summary");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [height, setHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;
    
    const handleResize = () => {
      if (contentRef.current && cartItems.length > 0) {
        setHeight(contentRef.current.offsetHeight);
      }
    };

    // Measure initially
    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(contentRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [view, cartItems.length]);

  // Reset checkout view to summary view when the cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setView("summary");
      setHeight("auto");
    }
  }, [cartItems.length]);

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  // Render the Quote statement onto the HTML5 Canvas when the checkout view is active and canvas has mounted.
  useEffect(() => {
    if (view !== "checkout" || !canvasElement) return;
    drawQuoteToCanvas(canvasElement, cartItems, cartSubtotal);
  }, [view, canvasElement, cartItems, cartSubtotal]);

  const handleDownload = async () => {
    if (!canvasElement) return;
    const blob = await exportQuoteImage(canvasElement);
    downloadQuoteImage(blob);
  };

  const handleCopyText = async () => {
    let text = `IA DEVELOPIX QUOTE SUMMARY\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `-------------------------------------------\n`;
    cartItems.forEach((item) => {
      text += `${item.name.toUpperCase()} - Qty: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    text += `-------------------------------------------\n`;
    text += `SUBTOTAL: ${formatPrice(cartSubtotal)}\n`;
    text += `Please send this summary to IA DEVELOPIX to finalize your order.`;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy quote text", err);
    }
  };

  const handleSendFacebook = async () => {
    window.open(getMessengerUrl(), "_blank", "noopener,noreferrer");
  };

  if (!mounted) {
    return (
      <div className="max-w-[3840px] mx-auto px-6 md:px-12 min-[2000px]:px-24 w-full flex flex-col justify-center items-center min-h-[65vh]">
        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[3840px] mx-auto px-6 md:px-12 min-[2000px]:px-24 w-full flex flex-col">
      <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div 
              key="empty-cart"
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center py-20 md:py-32 text-center"
            >
              <motion.h1 
                variants={childVariants}
                className="font-display text-4xl md:text-5xl uppercase tracking-[4px] text-primary mb-6"
              >
                {cartContent.emptyTitle}
              </motion.h1>
              <motion.p 
                variants={childVariants}
                className="font-serif text-sm text-body mb-8 max-w-md mx-auto leading-relaxed"
              >
                {cartContent.emptyDescription}
              </motion.p>
              <motion.div variants={childVariants}>
                <Link
                  href="/store"
                  className="flex items-center gap-2 border border-primary bg-primary text-canvas font-mono text-xs uppercase tracking-[2px] py-3.5 px-8 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none"
                >
                   <span>{cartContent.continueShopping ?? "Continue shopping"}</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="active-cart"
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            {/* Top Page Header */}
            <motion.div 
              variants={childVariants}
              className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between pb-4 md:pb-8 border-b border-hairline mb-4 md:mb-12"
            >
              <h1 className="font-display text-4xl md:text-[60px] uppercase tracking-[4px] text-primary whitespace-nowrap">
                {cartContent.cartTitle}
              </h1>
              <Link
                href="/store"
                className="flex items-center gap-1.5 border border-primary bg-primary text-canvas font-mono text-[10px] md:text-xs uppercase tracking-[1.5px] md:tracking-[2px] py-2.5 px-4 md:py-3.5 md:px-6 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none whitespace-nowrap"
              >
                <Undo2 size={12} className="md:w-3.5 md:h-3.5" />
                <span>{cartContent.continueShopping ?? "Continue shopping"}</span>
              </Link>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:items-start">
              
              {/* Left Column: Cart list items */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col md:space-y-6">
                
                {/* Desktop headers */}
                <motion.div 
                  variants={childVariants}
                  className="hidden md:grid grid-cols-12 pb-3 border-b border-hairline font-mono text-xs text-primary uppercase tracking-[2px]"
                >
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-4 text-right">Total</div>
                </motion.div>

                {/* Items */}
                <div className="divide-y divide-hairline">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  variants={childVariants}
                >
                  <CartItemRow
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                </motion.div>
              ))}
                </div>

              </div>

              {/* Right Column: Checkout side-card */}
              <motion.div 
                variants={childVariants}
                style={{ top: 'calc(var(--navbar-height, 92px) + 20px)' }}
                className="lg:col-span-5 xl:col-span-4 lg:sticky z-10"
              >
                <motion.div 
                  animate={{ height }}
                  className="bg-surface-soft border border-hairline rounded-2xl overflow-hidden w-full relative"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div 
                    ref={contentRef}
                    className="p-6 flex flex-col space-y-6 w-full"
                  >
                    <AnimatePresence mode="wait">
                      {view === "summary" ? (
                        <motion.div
                          key="summary-view"
                          initial={{ opacity: 0, filter: "blur(6px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(6px)" }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col space-y-6"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-display text-2xl tracking-[2px] uppercase text-primary">Subtotal</span>
                            <AnimatedPrice value={cartSubtotal} className="font-mono text-2xl max-[375px]:text-lg uppercase text-primary font-bold whitespace-nowrap" />
                          </div>
                          
                          <p className="font-serif text-xs text-primary leading-tight">
                            Tax included. Shipping calculated at checkout.
                          </p>

                          {/* Note Area */}
                          <div className="flex flex-col space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-primary">Add a note to your order</span>
                            <textarea
                              placeholder="SPECIAL INSTRUCTIONS"
                              className="w-full bg-canvas border border-hairline p-3 font-serif text-xs text-primary outline-none focus:border-hairline-strong h-28 placeholder:text-muted/50 rounded-none uppercase"
                            />
                          </div>

                          {/* Checkout Trigger */}
                          <button
                            onClick={() => setView("checkout")}
                            className="w-full flex items-center justify-center gap-1.5 border border-primary bg-primary text-canvas font-mono text-xs uppercase tracking-[2.5px] py-4 px-6 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none text-center font-bold cursor-pointer"
                          >
                            <Lock size={14} />
                            <span>Check out</span>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="checkout-view"
                          initial={{ opacity: 0, filter: "blur(6px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(6px)" }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col space-y-6"
                        >
                          {/* Header with Back button */}
                          <div className="flex items-center space-x-6 pb-2">
                            <button
                              onClick={() => setView("summary")}
                              className="flex items-center gap-1.5 text-primary uppercase font-mono text-xs tracking-[2px] hover:opacity-70 transition-opacity outline-none cursor-pointer"
                            >
                              <ChevronLeft size={16} strokeWidth={1.5} />
                              <span>BACK</span>
                            </button>
                            <span className="font-display text-2xl tracking-[2px] uppercase text-primary">
                              QUOTE SHEET
                            </span>
                          </div>

                          <p className="font-serif text-xs text-primary leading-relaxed">
                            Please download this quote image or copy its text details below. You can send this summary to our Facebook page manually to process your order.
                          </p>

                          {/* Canvas Wrapper */}
                          <div className="flex justify-center border border-hairline bg-canvas p-4 mb-2 overflow-hidden rounded-xl">
                            <canvas 
                              ref={setCanvasElement}
                              width={800}
                              height={1000}
                              className="w-full max-w-[280px] border border-hairline-strong shadow-lg aspect-[8/10]" 
                            />
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-row gap-2 w-full justify-between items-center shrink-0">
                            <button
                              onClick={handleDownload}
                              className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary font-mono text-[9px] md:text-xs uppercase tracking-[1px] md:tracking-[2px] py-3.5 px-1 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer truncate"
                            >
                              <Download size={12} className="shrink-0" />
                              <span className="truncate">DOWNLOAD</span>
                            </button>
                            
                            <button
                              onClick={handleCopyText}
                              className={`flex-1 flex items-center justify-center gap-1.5 border font-mono text-[9px] md:text-xs uppercase tracking-[1px] md:tracking-[2px] py-3.5 px-1 rounded-pill outline-none cursor-pointer transition-all duration-300 truncate ${
                                isCopied 
                                  ? "border-success text-success bg-success/10" 
                                  : "border-primary text-primary bg-transparent hover:bg-primary hover:text-canvas"
                              }`}
                            >
                              <AnimatePresence mode="wait">
                                {isCopied ? (
                                  <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex items-center gap-1.5 truncate"
                                  >
                                    <Check size={12} className="shrink-0" />
                                    <span className="truncate">COPIED</span>
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="copy"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex items-center gap-1.5 truncate"
                                  >
                                    <Copy size={12} className="shrink-0" />
                                    <span className="truncate">COPY</span>
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </button>

                            <button
                              onClick={handleSendFacebook}
                              className="flex-1 flex items-center justify-center gap-1.5 border border-primary bg-primary text-canvas font-mono text-[9px] md:text-xs uppercase tracking-[1px] md:tracking-[2px] py-3.5 px-1 rounded-pill hover:bg-canvas hover:text-primary transition-colors duration-300 outline-none cursor-pointer truncate"
                            >
                              <MessageCircle size={12} className="shrink-0" />
                              <span className="truncate">FACEBOOK</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
