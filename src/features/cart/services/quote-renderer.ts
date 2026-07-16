/**
 * @file quote-renderer.ts
 * @description Shared canvas drawing service for quote statement receipts.
 */

import { CartItem } from "../schemas/cart-schema";

/**
 * Resolves font families from CSS variables or falls back to system defaults.
 */
const getFontFamily = (varName: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const computed = window.getComputedStyle(document.body).getPropertyValue(varName);
  return computed ? computed.trim() : fallback;
};

/**
 * Draws the quote statement receipt onto the provided HTML5 Canvas.
 */
export function drawQuoteToCanvas(
  canvas: HTMLCanvasElement,
  items: CartItem[],
  subtotal: number
): void {
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

  items.forEach((item) => {
    // Name
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `normal 16px ${sairaCondensed}`;
    ctx.fillText(item.name.toUpperCase(), 60, currentY);

    // Qty
    ctx.textAlign = "center";
    ctx.fillStyle = "#cccccc";
    ctx.font = `normal 14px ${spaceMono}`;
    ctx.fillText(item.quantity.toString(), 480, currentY);

    // Unit Price
    ctx.textAlign = "right";
    ctx.fillText(`฿${item.price.toLocaleString()} THB`, 610, currentY);

    // Total Price
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`฿${(item.price * item.quantity).toLocaleString()} THB`, 740, currentY);

    currentY += 45;
  });

  // Divider after items list
  ctx.strokeStyle = "#262626";
  ctx.beginPath();
  ctx.moveTo(50, currentY + 10);
  ctx.lineTo(canvas.width - 50, currentY + 10);
  ctx.stroke();

  // Summary lines
  currentY += 40;

  // Subtotal Label & Value
  ctx.textAlign = "left";
  ctx.fillStyle = "#999999";
  ctx.font = `normal 14px ${spaceMono}`;
  ctx.fillText("SUBTOTAL", 60, currentY);

  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 22px ${spaceMono}`;
  ctx.fillText(`฿${subtotal.toLocaleString()} THB`, 740, currentY);

  // Outbox instruction info
  ctx.textAlign = "center";
  ctx.fillStyle = "#999999";
  ctx.font = `normal 11px ${spaceMono}`;
  ctx.fillText("PLEASE SEND THIS QUOTE IMAGE TO OUTBOX VIA FACEBOOK PAGE", canvas.width / 2, 870);

  ctx.fillStyle = "#666666";
  ctx.font = `italic 14px ${garamond}`;
  ctx.fillText("Thank you for choosing IA DEVELOPIX.", canvas.width / 2, 920);
}
