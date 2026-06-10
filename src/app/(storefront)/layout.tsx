"use client";

import React from "react";
import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { useScrollDetection } from "@/src/hooks";
import { CartProvider } from "@/src/context/cart-context";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Track continuous page scaling and scroll offsets for responsive UI positioning
  const { scrollDirection } = useScrollDetection();

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-canvas" style={{ paddingTop: 'var(--navbar-height, 80px)' }}>
        {/* Header element defaults to standard visibility on wide displays, translates smoothly on mobile screens */}
        <Navbar isVisible={true} scrollDirection={scrollDirection} />
        
        <main className="flex-1 flex flex-col">{children}</main>
        
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
}