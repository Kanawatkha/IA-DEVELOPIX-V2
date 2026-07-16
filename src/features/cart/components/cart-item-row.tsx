/**
 * @file cart-item-row.tsx
 * @description Shared single cart item row component for desktop, tablet, and mobile layouts.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '../schemas/cart-schema';
import { AnimatedPrice } from './animated-price';
import { cartContent } from '@/src/content';

interface CartItemRowProps {
  item: CartItem;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  onItemClick?: () => void;
}

export function CartItemRow({ item, updateQuantity, removeFromCart, onItemClick }: CartItemRowProps) {
  const formatPrice = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  return (
    <div className="py-6 w-full">
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center w-full">
        {/* Product Detail Card */}
        <div className="col-span-6 flex gap-4 items-center">
          <Link 
            href={item.href || "#"} 
            onClick={onItemClick}
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
                onClick={onItemClick}
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
            {cartContent.remove}
          </button>
        </div>

        {/* Total price for this item */}
        <div className="col-span-4 text-right">
          <AnimatedPrice value={item.price * item.quantity} className="font-mono text-base text-primary font-bold" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden w-full gap-4 items-start">
        {/* Left: Product Image */}
        <Link 
          href={item.href || "#"} 
          onClick={onItemClick}
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
              <Link href={item.href || "#"} onClick={onItemClick} className="inline-block max-w-full">
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
              {cartContent.remove}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
