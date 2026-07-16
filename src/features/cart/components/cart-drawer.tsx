"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, ChevronLeft, Download, Copy, MessageCircle, Lock, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useCart } from "@/src/context/cart-context";
import { useWindowSize } from "@/src/hooks";
import { drawerOpenTransition, drawerCloseTransition, EASE, DURATION, drawerGlowClass, drawerSurfaceClass } from "@/src/lib/design/variants";
import { exportQuoteImage, downloadQuoteImage } from "@/src/features/cart/services/quote-export-service";
import { getMessengerUrl } from "@/src/features/cart/services/messenger-service";
import { externalImages } from "@/src/lib/media";

const RECENTLY_VIEWED_IMAGE = externalImages.catalog.productBlueprint;

// 6 fixed robot models for the Recently Viewed tab using the requested custom image
const RECENTLY_VIEWED_ITEMS = [
  { id: "nofan-15", name: "NOFAN 15cm", cat: "LINEFOLLOWER", price: 15000, isComingSoon: false, image: RECENTLY_VIEWED_IMAGE, href: "/products/linefollower/nofan-15" },
  { id: "nofan-18", name: "NOFAN 18cm", cat: "LINEFOLLOWER", price: 18000, isComingSoon: false, image: RECENTLY_VIEWED_IMAGE, href: "/products/linefollower/nofan-18" },
  { id: "mission-go", name: "MISSION GO", cat: "MISSION", price: 25000, isComingSoon: false, image: RECENTLY_VIEWED_IMAGE, href: "/products/mission/go" },
  { id: "mission-pro", name: "MISSION PRO", cat: "MISSION", price: 45000, isComingSoon: false, image: RECENTLY_VIEWED_IMAGE, href: "/products/mission/pro" },
  { id: "fanpull-15", name: "FANPULL 15cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: RECENTLY_VIEWED_IMAGE, href: "/products/linefollower/fanpull-15" },
  { id: "fanpull-18", name: "FANPULL 18cm", cat: "LINEFOLLOWER", price: 0, isComingSoon: true, image: RECENTLY_VIEWED_IMAGE, href: "/products/linefollower/fanpull-18" }
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
    clearCart
  } = useCart();

  const { isMobile } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [activeTab, setActiveTab] = useState<"cart" | "recent">("cart");
  const [showCartFooter, setShowCartFooter] = useState(activeTab === "cart");
  useEffect(() => {
    if (activeTab === "cart") {
      const timer = setTimeout(() => {
        setShowCartFooter(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowCartFooter(false);
    }
  }, [activeTab]);
  const [view, setView] = useState<"tabs" | "checkout">("tabs");
  const [isCopied, setIsCopied] = useState(false);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const dragControls = useDragControls();

  const drawerVariants = {
    open: {
      x: 0,
      y: 0,
      transition: drawerOpenTransition,
    },
    closedRight: {
      x: "100%",
      y: 0,
      transition: drawerCloseTransition,
    },
    closedBottom: {
      x: 0,
      y: "100%",
      transition: drawerCloseTransition,
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const footerContainerVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: EASE.luxury,
        staggerChildren: 0.05,
        delayChildren: 0.1,
        delay: 0.05,
      },
    },
  };

  const cartItemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.3,
        ease: "easeIn" as const,
      },
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: DURATION.fast,
        ease: EASE.luxury,
      },
    },
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
  };

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  // Component to render price counts with smooth rolling numeric animation (money flow / slot machine style).
  const renderAnimatedPrice = (value: number) => {
    const formatPriceString = (amount: number) => {
      return `฿${amount.toLocaleString()} THB`;
    };

    const priceStr = formatPriceString(value);
    const chars = priceStr.split("");

    return (
      <span className="font-mono text-lg uppercase text-primary font-bold inline-flex items-center h-7 overflow-hidden">
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

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-canvas/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>

      {/* Drawer Body - Always mounted to support nested exit transitions */}
      <motion.div
        variants={drawerVariants}
        initial={isMobile ? "closedBottom" : "closedRight"}
        animate={isCartOpen ? "open" : isMobile ? "closedBottom" : "closedRight"}
        drag={isMobile ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        dragMomentum={true}
        onDragEnd={(e, info) => {
          const projectedY = info.offset.y + info.velocity.y * 0.2;
          if (info.offset.y > 250 || projectedY > 250) {
            closeDrawer();
          }
        }}
        onAnimationComplete={(variant) => {
          if (variant === "closedRight" || variant === "closedBottom") {
            setActiveTab("cart");
            setView("tabs");
          }
        }}
        className={`fixed z-[160] flex flex-col bg-canvas overflow-visible text-primary ${drawerSurfaceClass} md:right-0 md:left-auto md:rounded-l-[2rem] md:rounded-r-none md:border-l md:border-r-0`}
      >
            {/* Subtle White Glow Shadow Layer (Fade-In) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isCartOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={drawerGlowClass}
            />
            <div className="w-full h-full flex flex-col relative overflow-hidden rounded-[inherit] bg-canvas">
              {/* Drawer Handle for Mobile Swipe-down */}
              <div 
                className="shrink-0 w-full block md:hidden pt-4 pb-2 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
                style={{ touchAction: "none" }}
              >
                <div className="w-12 h-1.5 bg-primary/30 rounded-full mx-auto" />
              </div>

              {/* Header Drawer */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-hairline relative shrink-0">
                <AnimatePresence mode="wait">
                  {view === "tabs" ? (
                    <motion.div
                      key="tabs-header"
                      variants={containerVariants}
                      initial="hidden"
                      animate={isCartOpen ? "visible" : "hidden"}
                      exit="hidden"
                      className="flex space-x-8"
                    >
                      <motion.button
                        variants={cartItemVariants}
                        onClick={() => setActiveTab("cart")}
                        className={`font-display text-2xl tracking-[2px] uppercase pb-2 transition-colors relative outline-none w-14 md:w-16 text-left cursor-pointer ${
                          activeTab === "cart" ? "text-primary" : "text-muted hover:text-primary"
                        }`}
                      >
                        <span className="relative inline-flex items-baseline">
                          <span>Cart</span>
                          <AnimatePresence>
                            {cartCount > 0 && (
                              <motion.sup 
                                initial={{ opacity: 0, scale: 0.8, x: -5 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -5 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs font-mono ml-0.5 align-super text-primary inline-block"
                              >
                                {cartCount}
                              </motion.sup>
                            )}
                          </AnimatePresence>
                          {activeTab === "cart" && (
                            <motion.div 
                              layoutId="activeTabUnderline" 
                              layout
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                            />
                          )}
                        </span>
                      </motion.button>
                      
                      <motion.button
                        variants={cartItemVariants}
                        onClick={() => setActiveTab("recent")}
                        className={`font-display text-2xl tracking-[2px] uppercase pb-2 transition-colors relative outline-none cursor-pointer ${
                          activeTab === "recent" ? "text-primary" : "text-muted hover:text-primary"
                        }`}
                      >
                        <span className="relative inline-flex items-baseline">
                          <span>Recently viewed</span>
                          {activeTab === "recent" && (
                            <motion.div 
                              layoutId="activeTabUnderline" 
                              layout
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                            />
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="checkout-header"
                      variants={cartItemVariants}
                      initial="hidden"
                      animate={isCartOpen ? "visible" : "hidden"}
                      exit="hidden"
                      className="flex items-center space-x-6 pb-2"
                    >
                      <button
                        onClick={() => setView("tabs")}
                        className="flex items-center gap-1.5 text-primary uppercase font-mono text-xs tracking-[2px] hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        <ChevronLeft size={16} strokeWidth={1.5} />
                        <span>BACK</span>
                      </button>
                      <span className="font-display text-2xl tracking-[2px] uppercase text-primary">
                        QUOTE SHEET
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  variants={cartItemVariants}
                  initial="hidden"
                  animate={isCartOpen ? "visible" : "hidden"}
                  onClick={closeDrawer}
                  className="absolute top-6 right-6 z-50 flex items-center justify-center h-9 w-9 text-primary hover:bg-primary hover:text-canvas transition-all duration-300 ease-in-out rounded-full cursor-pointer"
                  aria-label="Close Cart"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </motion.button>
              </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full">
              <AnimatePresence mode="wait">
                {view === "tabs" ? (
                  <motion.div
                    key="tabs-view"
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <AnimatePresence mode="wait">
                      {/* TAB 1: CART DETAILS */}
                      {activeTab === "cart" && (
                        <motion.div
                          key="cart"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isCartOpen ? "visible" : "hidden"}
                          exit="hidden"
                          className="w-full"
                        >
                          {cartItems.length === 0 ? (
                            <motion.div variants={cartItemVariants} className="flex flex-col items-center justify-center h-[55vh] text-center px-6">
                              <p className="font-display text-xl uppercase tracking-[2px] text-primary mb-3">
                                Your cart is currently empty.
                              </p>
                              <p className="font-serif text-xs text-muted mb-8">
                                Not sure where to start? Try these collections:
                              </p>
                              <Link
                                href="/store"
                                onClick={closeDrawer}
                                className="flex items-center gap-2 border border-primary bg-primary text-canvas font-mono text-xs uppercase tracking-[2.5px] py-3.5 px-8 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none cursor-pointer"
                              >
                                <span>Continue shopping</span>
                                <ArrowRight size={14} />
                              </Link>
                            </motion.div>
                          ) : (
                            <div className="flex flex-col space-y-4">
                              {/* Header details with Remove All action */}
                              <motion.div 
                                variants={cartItemVariants}
                                className="flex justify-between items-center pb-2 border-b border-hairline shrink-0"
                              >
                                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[2px] text-primary">{cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}</span>
                                <button
                                  onClick={clearCart}
                                  className="font-mono text-[10px] md:text-xs uppercase tracking-[2.5px] text-primary hover:opacity-70 transition-colors cursor-pointer flex items-center gap-1.5 outline-none"
                                >
                                  <Trash2 size={12} strokeWidth={1.5} />
                                  <span>Remove All</span>
                                </button>
                              </motion.div>
                              {/* Items List - Enlarge elements layout */}
                              <div className="divide-y divide-hairline">
                                {cartItems.map((item) => (
                                  <motion.div key={item.id} variants={cartItemVariants} className="flex py-4 md:py-5 gap-3 md:gap-5 items-start">
                                    {/* Product Image - Responsive scaling */}
                                    <Link 
                                      href={item.href || "#"} 
                                      onClick={closeDrawer}
                                      className="relative w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-hairline bg-primary overflow-hidden shrink-0 rounded-xl block group"
                                    >
                                      <Image
                                        src={item.image} 
                                        alt={item.name} 
                                        fill
                                        sizes="(min-width: 768px) 110px, 80px"
                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                      />
                                    </Link>

                                    {/* Details - Scaled font sizes */}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-display text-sm md:text-base tracking-[2px] uppercase text-primary break-words">
                                        <Link 
                                          href={item.href || "#"} 
                                          onClick={closeDrawer}
                                          className="hover-underline-expand inline-block"
                                        >
                                          {item.name}
                                        </Link>
                                      </h4>
                                      <p className="font-mono text-[11px] md:text-xs text-primary mt-1.5">
                                        {formatPrice(item.price)}
                                      </p>

                                      {/* Remove & Adjust - Responsive controls */}
                                      <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-hairline py-1 px-2.5 space-x-3 md:py-1.5 md:px-3.5 md:space-x-4 rounded-full bg-surface-soft">
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="text-muted hover:text-primary transition-colors text-sm font-mono cursor-pointer"
                                          >
                                            -
                                          </button>
                                          <span className="font-mono text-xs text-primary w-4 text-center font-bold">{item.quantity}</span>
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-muted hover:text-primary transition-colors text-sm font-mono cursor-pointer"
                                          >
                                            +
                                          </button>
                                        </div>
                                        
                                        <button
                                          onClick={() => removeFromCart(item.id)}
                                          className="group font-mono text-[10px] uppercase text-primary cursor-pointer flex items-center gap-1.5 outline-none"
                                        >
                                          <Trash2 size={11} strokeWidth={1.5} />
                                          <span className="hover-underline-collapse leading-none">Remove</span>
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* TAB 2: RECENTLY VIEWED */}
                      {activeTab === "recent" && (
                        <motion.div
                          key="recent"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isCartOpen ? "visible" : "hidden"}
                          exit="hidden"
                          className="flex flex-col space-y-4"
                        >
                          {RECENTLY_VIEWED_ITEMS.map((item) => (
                            <motion.div key={item.id} variants={cartItemVariants} className="flex p-3 md:p-4 border border-hairline items-center gap-3 md:gap-5 bg-surface-soft rounded-xl transition-colors hover:border-hairline-strong">
                              {/* Product Image - Responsive scaling */}
                              <Link 
                                href={item.href} 
                                onClick={closeDrawer}
                                className="relative w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-hairline bg-primary overflow-hidden shrink-0 rounded-xl block group"
                              >
                                <Image
                                  src={item.image} 
                                  alt={item.name} 
                                  fill
                                  sizes="(min-width: 768px) 110px, 80px"
                                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                              </Link>

                              {/* Details - Scaled font sizes with clickable title hover effect */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-sm md:text-base tracking-[2px] uppercase text-primary break-words">
                                  <Link 
                                    href={item.href} 
                                    onClick={closeDrawer}
                                    className="hover-underline-expand inline-block"
                                  >
                                    {item.name}
                                  </Link>
                                </h4>
                                <p className="font-mono text-[11px] md:text-xs text-primary mt-1">
                                  {item.isComingSoon ? "TBA" : formatPrice(item.price)}
                                </p>
                              </div>

                              {/* Action Button */}
                              <div>
                                {item.isComingSoon ? (
                                  <Link
                                    href={item.href}
                                    onClick={closeDrawer}
                                    className="inline-block border border-primary bg-primary text-canvas font-mono text-[10px] md:text-[11px] uppercase tracking-[1px] md:tracking-[2px] py-1.5 px-3 md:py-2 md:px-5 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none"
                                  >
                                    + VIEW
                                  </Link>
                                ) : (
                                  <button
                                    onClick={() => handleAddFromRecommendations(item)}
                                    className="border border-primary bg-primary text-canvas font-mono text-[10px] md:text-[11px] uppercase tracking-[1px] md:tracking-[2px] py-1.5 px-3 md:py-2 md:px-5 rounded-pill hover:bg-transparent hover:text-primary transition-colors outline-none cursor-pointer"
                                  >
                                    + ADD
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout-view"
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col space-y-6"
                  >
                    <p className="font-serif text-base text-primary leading-relaxed">
                      Please download this quote image or copy its text details below. You can send this summary to our Facebook page manually to process your order.
                    </p>

                    <div className="flex justify-center border border-hairline bg-surface-soft p-4 md:p-6 mb-2 overflow-hidden rounded-xl">
                      <canvas 
                        ref={setCanvasElement}
                        width={800}
                        height={1000}
                        className="w-full max-w-[280px] md:max-w-[340px] border border-hairline-strong shadow-lg aspect-[8/10]" 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Footers (conditional on active view) */}
            <AnimatePresence mode="wait">
              {view === "tabs" && showCartFooter && cartItems.length > 0 ? (
                <motion.div
                  key="cart-footer"
                  variants={footerContainerVariants}
                  initial="hidden"
                  animate={isCartOpen ? "visible" : "hidden"}
                  exit="hidden"
                  className="shrink-0 p-6 border-t border-hairline bg-canvas space-y-4"
                >
                  {/* Total */}
                  <motion.div 
                    variants={cartItemVariants}
                    className="flex items-center justify-between"
                  >
                    <span className="font-mono text-sm uppercase tracking-[2px] text-primary">Subtotal</span>
                    {renderAnimatedPrice(cartSubtotal)}
                  </motion.div>
                  
                  <motion.p 
                    variants={cartItemVariants}
                    className="font-serif text-base text-primary leading-tight"
                  >
                    Tax included. Shipping calculated at checkout.
                  </motion.p>

                  {/* Main Action Buttons - Inline Row layout */}
                  <motion.div 
                    variants={cartItemVariants}
                    className="flex flex-row gap-3 w-full"
                  >
                    <button
                      onClick={() => setView("checkout")}
                      className="w-[50%] md:w-[60%] min-h-11 border border-primary bg-primary text-canvas font-mono text-xs uppercase tracking-[2px] py-3.5 px-4 rounded-pill hover:bg-canvas hover:text-primary transition-colors duration-300 outline-none text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Lock size={14} />
                      <span>Check out</span>
                    </button>
                    
                    <Link
                      href="/cart"
                      onClick={closeDrawer}
                      className="w-[50%] md:w-[40%] border border-primary text-primary bg-transparent font-mono text-xs uppercase tracking-[2px] py-3.5 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-all duration-300 outline-none text-center block cursor-pointer"
                    >
                      View cart
                    </Link>
                  </motion.div>
                </motion.div>
              ) : view === "checkout" ? (
                <motion.div
                  key="checkout-footer"
                  variants={footerContainerVariants}
                  initial="hidden"
                  animate={isCartOpen ? "visible" : "hidden"}
                  exit="hidden"
                  className="shrink-0 p-6 border-t border-hairline bg-canvas"
                >
                  <motion.div 
                    variants={cartItemVariants}
                    className="flex flex-row gap-2 w-full justify-between items-center shrink-0"
                  >
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
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            </div>
          </motion.div>
    </>
  );
}
