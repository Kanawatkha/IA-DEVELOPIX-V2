"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Undo2, Lock, ChevronLeft, Download, Copy, Check, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/context/cart-context";
import { ShopCollections } from "@/src/features/store";
import { cartContent } from "@/src/content";
import { exportQuoteImage, downloadQuoteImage } from "@/src/features/cart/services/quote-export-service";
import { getMessengerUrl } from "@/src/features/cart/services/messenger-service";
import { parentVariants, childVariants } from "@/src/lib/design/variants";

export function CartView() {
  const { 
    cartItems, 
    cartSubtotal, 
    removeFromCart, 
    updateQuantity, 
    setIsQuoteOpen 
  } = useCart();

  const [view, setView] = useState<"summary" | "checkout">("summary");
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

  // Helper to query computed style for CSS Variables (resolving font names)
  const getFontFamily = (varName: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const computed = window.getComputedStyle(document.body).getPropertyValue(varName);
    return computed ? computed.trim() : fallback;
  };

  // Render the Quote statement onto the HTML5 Canvas when the checkout view is active and canvas has mounted.
  useEffect(() => {
    if (view !== "checkout" || !canvasElement) return;

    const canvas = canvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high resolution canvas dimensions
    canvas.width = 800;
    canvas.height = 1000;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw luxury double borders
    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Resolve font families from CSS variables
    const sairaCondensed = getFontFamily("--font-saira-condensed", "'Saira Condensed', sans-serif");
    const spaceMono = getFontFamily("--font-space-mono", "monospace");
    const garamond = getFontFamily("--font-garamond", "serif");

    // Render branding header
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = `normal 32px ${sairaCondensed}`;
    ctx.fillText("IA DEVELOPIX", canvas.width / 2, 70);

    ctx.fillStyle = "#999999";
    ctx.font = `normal 14px ${spaceMono}`;
    ctx.fillText("QUOTE STATEMENT", canvas.width / 2, 115);

    // Date
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillText(`DATE: ${today.toUpperCase()}`, canvas.width / 2, 140);

    // Separator line
    ctx.strokeStyle = "#262626";
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(canvas.width - 50, 180);
    ctx.stroke();

    // Table column headers
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `normal 12px ${spaceMono}`;
    ctx.fillText("PRODUCT DESCRIPTION", 60, 210);
    
    ctx.textAlign = "center";
    ctx.fillText("QTY", 480, 210);
    
    ctx.textAlign = "right";
    ctx.fillText("UNIT PRICE", 610, 210);
    ctx.fillText("TOTAL", 740, 210);

    // Table divider line
    ctx.strokeStyle = "#3a3a3a";
    ctx.beginPath();
    ctx.moveTo(50, 235);
    ctx.lineTo(canvas.width - 50, 235);
    ctx.stroke();

    // Render quote products list
    let currentY = 260;
    ctx.fillStyle = "#cccccc";
    ctx.font = `normal 16px ${garamond}`;

    cartItems.forEach((item) => {
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(item.name.toUpperCase(), 60, currentY);

      ctx.textAlign = "center";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(item.quantity.toString(), 480, currentY);

      ctx.textAlign = "right";
      ctx.fillText(formatPrice(item.price), 610, currentY);
      ctx.fillText(formatPrice(item.price * item.quantity), 740, currentY);

      currentY += 45;
    });

    // Subtotal divider line
    ctx.strokeStyle = "#262626";
    ctx.beginPath();
    ctx.moveTo(50, currentY + 10);
    ctx.lineTo(canvas.width - 50, currentY + 10);
    ctx.stroke();

    // Subtotal layout summary
    currentY += 40;
    ctx.textAlign = "left";
    ctx.fillStyle = "#999999";
    ctx.font = `normal 14px ${spaceMono}`;
    ctx.fillText("SUBTOTAL", 60, currentY);

    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 22px ${spaceMono}`;
    ctx.fillText(formatPrice(cartSubtotal), 740, currentY);

    // Outbox instruction info
    ctx.textAlign = "center";
    ctx.fillStyle = "#999999";
    ctx.font = `normal 11px ${spaceMono}`;
    ctx.fillText("PLEASE SEND THIS QUOTE IMAGE TO OUTBOX VIA FACEBOOK PAGE", canvas.width / 2, 870);

    ctx.fillStyle = "#666666";
    ctx.font = `italic 14px ${garamond}`;
    ctx.fillText("Thank you for choosing IA DEVELOPIX.", canvas.width / 2, 920);
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

  const renderAnimatedPrice = (value: number, className = "font-mono text-lg uppercase text-primary font-bold") => {
    const formatPriceString = (amount: number) => {
      return `฿${amount.toLocaleString()} THB`;
    };

    const priceStr = formatPriceString(value);
    const chars = priceStr.split("");

    return (
      <span className={`${className} inline-flex items-center h-[1.5em] overflow-hidden`}>
        {chars.map((char, index) => {
          const isDigit = /\d/.test(char);
          if (!isDigit) {
            return (
              <span key={index} className="inline-block whitespace-pre">
                {char}
              </span>
            );
          }

          const digit = parseInt(char, 10);

          return (
            <span
              key={index}
              className="relative inline-block w-[0.62em] h-[1.5em] overflow-hidden"
              style={{ verticalAlign: "bottom" }}
            >
              <motion.span
                initial={{ y: 0 }}
                animate={{ y: `-${digit * 10}%` }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 14,
                  mass: 0.8,
                }}
                className="absolute left-0 top-0 flex flex-col w-full h-[1000%]"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <span
                    key={num}
                    className="h-[10%] flex items-center justify-center font-mono"
                    style={{ height: "1.5em", lineHeight: "1.5em" }}
                  >
                    {num}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="w-full bg-canvas text-primary pt-8 md:pt-16 pb-0">
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
                      className="py-6 w-full"
                    >
                      {/* Desktop & Tablet Layout */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center w-full">
                        {/* Product Detail Card */}
                        <div className="col-span-6 flex gap-4 items-center">
                          <Link 
                            href={item.href || "#"} 
                            className="relative w-[120px] h-[120px] border border-hairline bg-white shrink-0 rounded-md overflow-hidden block group"
                          >
                            <Image
                              src={item.image} 
                              alt={item.name} 
                              fill
                              sizes="120px"
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          </Link>
                          <div className="min-w-0 max-w-[calc(100%-136px)]">
                            <h4 className="font-display text-lg tracking-[2px] uppercase text-primary break-words">
                              <Link 
                                href={item.href || "#"} 
                                className="hover-underline-expand inline-block max-w-full pb-0.5"
                              >
                                {item.name}
                              </Link>
                            </h4>
                            <p className="font-mono text-sm text-primary mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove Action */}
                        <div className="col-span-2 flex items-center justify-center gap-4">
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
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="font-mono text-[10px] uppercase text-primary whitespace-nowrap cursor-pointer hover-underline-collapse leading-none outline-none"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Total price for this item */}
                        <div className="col-span-4 text-right">
                          {renderAnimatedPrice(item.price * item.quantity, "font-mono text-base text-primary font-bold")}
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="flex md:hidden w-full gap-4 items-start">
                        {/* Left: Product Image */}
                        <Link 
                          href={item.href || "#"} 
                          className="relative w-[90px] h-[90px] border border-hairline bg-white shrink-0 rounded-md overflow-hidden block"
                        >
                          <Image
                            src={item.image} 
                            alt={item.name} 
                            fill
                            sizes="90px"
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Right: Info & Actions Grid */}
                        <div className="flex-1 flex flex-col justify-center gap-2.5 min-h-[90px]">
                          {/* Row 1: Name (Left) and Quantity Selector (Right) */}
                          <div className="flex items-start justify-between w-full">
                            <h4 className="font-display text-sm tracking-[1px] uppercase text-primary break-words pr-2 max-w-[60%]">
                              <Link href={item.href || "#"} className="inline-block max-w-full">
                                {item.name}
                              </Link>
                            </h4>
                            
                            {/* Quantity box inline with name */}
                            <div className="flex items-center border border-hairline py-1 px-2.5 space-x-2.5 rounded-full bg-surface-soft shrink-0">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-muted hover:text-primary transition-colors text-[10px] font-mono"
                              >
                                -
                              </button>
                              <span className="font-mono text-[10px] text-primary w-3 text-center font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-muted hover:text-primary transition-colors text-[10px] font-mono"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Row 2: Price (Left) and Remove Button (Right) */}
                          <div className="flex items-center justify-between w-full">
                            <p className="font-mono text-xs text-primary font-bold">
                              {formatPrice(item.price)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="font-mono text-[9px] uppercase text-primary underline underline-offset-2 hover:text-muted transition-colors outline-none cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
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
                            {renderAnimatedPrice(cartSubtotal, "font-mono text-2xl max-[375px]:text-lg uppercase text-primary font-bold whitespace-nowrap")}
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

      {/* Section 2: Recommendation Carousel - Tightened vertical spacing */}
      <div className="mt-8 md:mt-12">
        <ShopCollections title="You may also like" defaultFilter="ALL" isCartPage={true} />
      </div>

    </div>
  );
}
