"use client";

import React from "react";
import { CartView } from "@/src/features/cart";
import { ShopCollections } from "@/src/features/store";

export default function CartPage() {
  return (
    <div className="w-full bg-canvas text-primary pt-8 md:pt-16 pb-0 min-h-[65vh] flex flex-col">
      {/* Section 1: Cart Main View */}
      <CartView />
      
      {/* Section 2: Recommendation Carousel - Tightened vertical spacing */}
      <div className="mt-8 md:mt-12">
        <ShopCollections title="You may also like" defaultFilter="ALL" isCartPage={true} />
      </div>
    </div>
  );
}
