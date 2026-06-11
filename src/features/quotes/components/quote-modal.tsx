"use client";

import React, { useRef, useEffect, useState } from "react";
import { X, Download, Copy, MessageCircle } from "lucide-react";
import { useCart } from "@/src/context/cart-context";

export function QuoteModal() {
  const { cartItems, cartSubtotal, isQuoteOpen, setIsQuoteOpen, clearCart } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  // Prevent background window scrolling when QuoteModal is open
  useEffect(() => {
    if (isQuoteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuoteOpen]);

  useEffect(() => {
    if (!isQuoteOpen || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions (high resolution for crisp print/image)
    canvas.width = 800;
    canvas.height = 1000;

    // Draw background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw borders
    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // IA DEVELOPIX Header
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "normal 32px var(--font-saira-condensed), 'Saira Condensed', sans-serif";
    ctx.fillText("IA DEVELOPIX", canvas.width / 2, 70);

    ctx.fillStyle = "#999999";
    ctx.font = "normal 14px var(--font-space-mono), monospace";
    ctx.fillText("QUOTE STATEMENT", canvas.width / 2, 115);

    // Date
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillText(`DATE: ${today.toUpperCase()}`, canvas.width / 2, 140);

    // Hairline Divider
    ctx.strokeStyle = "#262626";
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(canvas.width - 50, 180);
    ctx.stroke();

    // Table Headers
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "normal 12px var(--font-space-mono), monospace";
    ctx.fillText("PRODUCT DESCRIPTION", 60, 210);
    
    ctx.textAlign = "center";
    ctx.fillText("QTY", 480, 210);
    
    ctx.textAlign = "right";
    ctx.fillText("UNIT PRICE", 610, 210);
    ctx.fillText("TOTAL", 740, 210);

    // Table Divider
    ctx.strokeStyle = "#3a3a3a";
    ctx.beginPath();
    ctx.moveTo(50, 235);
    ctx.lineTo(canvas.width - 50, 235);
    ctx.stroke();

    // Render Items
    let currentY = 260;
    ctx.fillStyle = "#cccccc";
    ctx.font = "normal 16px var(--font-garamond), serif";

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

    // Subtotal Divider
    ctx.strokeStyle = "#262626";
    ctx.beginPath();
    ctx.moveTo(50, currentY + 10);
    ctx.lineTo(canvas.width - 50, currentY + 10);
    ctx.stroke();

    // Total Amount
    currentY += 40;
    ctx.textAlign = "left";
    ctx.fillStyle = "#999999";
    ctx.font = "normal 14px var(--font-space-mono), monospace";
    ctx.fillText("SUBTOTAL", 60, currentY);

    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px var(--font-space-mono), monospace";
    ctx.fillText(formatPrice(cartSubtotal), 740, currentY);

    // Terms and info - ENGLISH ONLY
    ctx.textAlign = "center";
    ctx.fillStyle = "#999999";
    ctx.font = "normal 11px var(--font-space-mono), monospace";
    ctx.fillText("PLEASE SEND THIS QUOTE IMAGE TO OUTBOX VIA FACEBOOK PAGE", canvas.width / 2, 870);

    ctx.fillStyle = "#666666";
    ctx.font = "italic 14px var(--font-garamond), serif";
    ctx.fillText("Thank you for choosing IA DEVELOPIX.", canvas.width / 2, 920);

  }, [isQuoteOpen, cartItems, cartSubtotal]);

  if (!isQuoteOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `iadevelopix-quote-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
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
      alert("Quote details copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy quote text", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-canvas/90 backdrop-blur-sm">
      <div 
        className="relative flex flex-col w-full max-w-[550px] md:max-w-[750px] max-h-[95vh] bg-[#000000] border border-hairline p-8 text-primary shadow-2xl rounded-none overflow-y-auto"
      >
        {/* Header - Enlarge labels & pure English */}
        <div className="flex items-center justify-between pb-4 border-b border-hairline mb-6">
          <span className="font-mono text-sm uppercase tracking-[2.5px] text-primary font-bold">QUOTE SHEET</span>
          <button 
            onClick={() => setShowClearConfirm(true)} 
            className="text-muted hover:text-primary transition-colors outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Info text - Enlarge size & English only */}
        <p className="font-serif text-sm text-body mb-6 leading-relaxed">
          Please download this quote image or copy its text details below. You can send this summary to our Facebook page manually to process your order.
        </p>

        {/* Canvas Display Container */}
        <div className="flex justify-center border border-hairline bg-surface-soft p-6 mb-6 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full max-w-[360px] md:max-w-[460px] border border-hairline-strong shadow-lg aspect-[8/10]" 
          />
        </div>

        {/* Action Buttons - Enlarge fonts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2.5px] py-4 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
          >
            <Download size={16} />
            <span>DOWNLOAD IMAGE</span>
          </button>
          
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2.5px] py-4 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
          >
            <Copy size={16} />
            <span>COPY DETAILS</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2.5px] py-4 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>SEND TO FACEBOOK</span>
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-[#000000]/50 backdrop-blur-sm">
          <div className="bg-[#000000] border border-hairline p-8 max-w-[400px] w-full mx-4 rounded-none text-center space-y-6">
            <h3 className="font-display text-lg uppercase tracking-[2px] text-primary">Clear Cart?</h3>
            <p className="font-serif text-xs text-muted leading-relaxed">Do you want to clear your cart?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                  setIsQuoteOpen(false);
                }}
                className="border border-primary bg-primary text-canvas font-mono text-xs uppercase tracking-[2px] py-2.5 px-6 rounded-pill hover:opacity-85 transition-opacity outline-none font-bold"
              >
                Yes
              </button>
              <button 
                onClick={() => {
                  setShowClearConfirm(false);
                  setIsQuoteOpen(false);
                }}
                className="border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-2.5 px-6 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
