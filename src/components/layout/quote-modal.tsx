"use client";

import React, { useRef, useEffect } from "react";
import { X, Download, Copy, MessageCircle } from "lucide-react";
import { useCart } from "@/src/context/cart-context";

export function QuoteModal() {
  const { cartItems, cartSubtotal, isQuoteOpen, setIsQuoteOpen } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

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
    ctx.fillText("QUOTE STATEMENT / ใบเสนอราคา", canvas.width / 2, 115);

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
    ctx.fillText("SUBTOTAL / ยอดรวม", 60, currentY);

    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px var(--font-space-mono), monospace";
    ctx.fillText(formatPrice(cartSubtotal), 740, currentY);

    // Terms and info
    ctx.textAlign = "center";
    ctx.fillStyle = "#999999";
    ctx.font = "normal 11px var(--font-space-mono), monospace";
    ctx.fillText("PLEASE SEND THIS QUOTE IMAGE TO OUTBOX VIA FACEBOOK PAGE", canvas.width / 2, 860);
    ctx.fillText("กรุณาส่งภาพใบเสนอราคานี้ไปยังกล่องข้อความ Facebook เพื่อสั่งซื้อสินค้า", canvas.width / 2, 885);

    ctx.fillStyle = "#666666";
    ctx.font = "italic 14px var(--font-garamond), serif";
    ctx.fillText("Thank you for choosing IA DEVELOPIX.", canvas.width / 2, 930);

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
        className="relative flex flex-col w-full max-w-[500px] md:max-w-[700px] max-h-[95vh] bg-[#000000] border border-hairline p-6 text-primary shadow-2xl rounded-none overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-hairline mb-4">
          <span className="font-mono text-xs uppercase tracking-[2px] text-primary">QUOTE SHEET / ใบเสนอราคา</span>
          <button 
            onClick={() => setIsQuoteOpen(false)} 
            className="text-muted hover:text-primary transition-colors outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Info */}
        <p className="font-serif text-xs text-body mb-4 leading-relaxed">
          Please download this quote image or copy its summary to send to our Facebook inbox to manually finalize your order.
          <span className="block mt-1 text-muted text-[11px]">(กรุณาดาวน์โหลดรูปภาพใบเสนอราคาหรือคัดลอกรายละเอียดไปแจ้งทาง Inbox ใน Facebook ของเรา)</span>
        </p>

        {/* Canvas Display Container */}
        <div className="flex justify-center border border-hairline bg-surface-soft p-4 mb-6 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full max-w-[340px] md:max-w-[440px] border border-hairline-strong shadow-lg aspect-[8/10]" 
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
          >
            <Download size={16} />
            <span>DOWNLOAD IMAGE</span>
          </button>
          
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
          >
            <Copy size={16} />
            <span>COPY DETAILS</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 border border-primary text-primary font-mono text-xs uppercase tracking-[2px] py-3 px-4 rounded-pill hover:bg-primary hover:text-canvas transition-colors outline-none"
          >
            <MessageCircle size={16} />
            <span>SEND TO FACEBOOK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
