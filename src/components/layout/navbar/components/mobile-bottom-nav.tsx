"use client";

import React from "react";
import Link from "next/link";
import { Home, Menu, ShoppingBag, ShoppingCart } from "lucide-react";

interface MobileBottomNavProps {
  scrollDirection: "up" | "down";
  isAtBottom: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleCartClick: () => void;
  cartCount: number;
  isVisible: boolean;
}

export function MobileBottomNav({
  scrollDirection,
  isAtBottom,
  setIsMobileMenuOpen,
  handleCartClick,
  cartCount,
  isVisible,
}: MobileBottomNavProps) {
  return (
    <nav
      className={`flex md:hidden fixed bottom-0 left-0 right-0 w-full max-w-[100%] z-[60] bg-white border-t border-black/10 rounded-t-[20px] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0" : "translate-y-[calc(100%+20px)]"
      }`}
      style={{ height: "60.8px" }}
    >
      <div className="grid grid-cols-4 w-full h-full py-2">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-black hover:opacity-70 transition-opacity w-full h-full"
        >
          <Home size={20} strokeWidth={1.2} />
          <span className="text-[10px] mt-1 font-mono tracking-[1px] whitespace-nowrap text-black uppercase">
            Home
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center text-black hover:opacity-70 transition-opacity w-full h-full"
        >
          <Menu size={20} strokeWidth={1.2} />
          <span className="text-[10px] mt-1 font-mono tracking-[1px] whitespace-nowrap text-black uppercase">
            Menu
          </span>
        </button>
        <Link
          href="/store"
          className="flex flex-col items-center justify-center text-black hover:opacity-70 transition-opacity w-full h-full"
        >
          <ShoppingBag size={20} strokeWidth={1.2} />
          <span className="text-[10px] mt-1 font-mono tracking-[1px] whitespace-nowrap text-black uppercase">
            Store
          </span>
        </Link>
        <button
          onClick={handleCartClick}
          className="flex flex-col items-center justify-center text-black hover:opacity-70 transition-opacity w-full h-full relative outline-none"
        >
          <div className="relative">
            <ShoppingCart size={20} strokeWidth={1.2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[10px] font-mono font-bold text-black leading-none">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-mono tracking-[1px] whitespace-nowrap text-black uppercase">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
}
