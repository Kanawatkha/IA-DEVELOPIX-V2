'use client';

/**
 * @file product-info-form.tsx
 * @description Right-column product information and purchase form.
 *              Shows product name, category breadcrumb, price, stock status,
 *              description, quantity selector, order/cart buttons, and share icons.
 *
 * Used in:
 *  - products/linefollower/nofan-15/page.tsx
 *  - products/linefollower/nofan-18/page.tsx
 *  - products/mission/go/page.tsx
 *  - products/mission/pro/page.tsx
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { childVariants, parentVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';

interface ProductInfoFormProps {
  /** Full display name, e.g. "NOFAN 15CM" */
  name: string;
  /** Category breadcrumb label, e.g. "LINEFOLLOWER" */
  category: string;
  /** URL to category page, e.g. "/products/linefollower" */
  categoryHref: string;
  /** Price string, e.g. "THB 15,000" */
  price: string;
  /** Product description paragraph */
  description: string;
  /** Whether product is available to purchase */
  inStock?: boolean;
}

export function ProductInfoForm({
  name,
  category,
  categoryHref,
  price,
  description,
  inStock = true,
}: ProductInfoFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={parentVariants}
      className="col-span-1 lg:col-span-5 xl:col-span-4 sticky top-[90px] lg:top-[110px] h-fit flex flex-col justify-start order-2 lg:order-none pt-4 lg:pt-0 w-full pl-0 lg:pl-6"
    >
      {/* Category breadcrumb */}
      <motion.div variants={childVariants} className="w-fit mb-4">
        <Link
          href={categoryHref}
          className="font-mono text-[14px] text-muted uppercase tracking-[1.4px] hover:text-primary transition-colors cursor-pointer"
        >
          {category}
        </Link>
      </motion.div>

      {/* Product name */}
      <motion.h1
        variants={childVariants}
        className="font-display text-[60px] md:text-[80px] xl:text-[100px] font-normal uppercase leading-[1.00] tracking-[4px] mb-4 text-primary whitespace-nowrap"
      >
        {name}
      </motion.h1>

      {/* Price */}
      <motion.span
        variants={childVariants}
        className="font-display text-[36px] md:text-[40px] lg:text-[36px] text-primary font-normal leading-[1.11] uppercase mb-6 tracking-[2px] block"
      >
        {price}
      </motion.span>

      {/* Stock status */}
      {inStock && (
        <motion.div
          variants={childVariants}
          className="flex items-center gap-3 mb-6 w-fit px-[12px] py-[6px] rounded-none border border-hairline"
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-mono text-[11px] text-primary uppercase tracking-[2px]">
            IN STOCK, READY TO SHIP
          </span>
        </motion.div>
      )}

      {/* Description */}
      <motion.p
        variants={childVariants}
        className="font-serif font-normal text-[16px] md:text-[18px] lg:text-[16px] text-body leading-[1.50] mb-8 w-full"
      >
        {description}
      </motion.p>

      {/* Quantity + Buttons */}
      <motion.div variants={childVariants} className="flex flex-col gap-4 mb-12 w-full">
        <div className="flex flex-row flex-nowrap gap-3 md:gap-4 w-full">
          {/* Quantity selector */}
          <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[12px] rounded-full border border-hairline min-w-[100px] md:min-w-[120px] bg-transparent shrink-0">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="text-primary hover:text-muted transition-colors outline-none cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="font-mono text-sm text-primary uppercase tracking-[2.5px]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-primary hover:text-muted transition-colors outline-none cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Add to Cart */}
          <button className={`flex-grow ${ty.ctaButton} py-3 px-8 hover:bg-primary hover:text-canvas whitespace-nowrap overflow-hidden text-ellipsis`}>
            ADD TO CART
          </button>
        </div>

        {/* Order Now */}
        <button className={`w-full ${ty.ctaButton} py-3 px-8 hover:bg-primary hover:text-canvas`}>
          ORDER NOW
        </button>
      </motion.div>

      {/* Share section */}
      <motion.div variants={childVariants} className="flex items-center gap-[24px]">
        <span className="font-mono text-[12px] text-muted uppercase tracking-[1.2px]">SHARE:</span>
        <div className="flex items-center gap-[24px]">
          <button className="text-primary hover:opacity-70 transition-opacity duration-300 outline-none">
            <Facebook className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <button className="text-primary hover:opacity-70 transition-opacity duration-300 outline-none">
            <Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <button className="text-primary hover:opacity-70 transition-opacity duration-300 outline-none">
            <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <button className="text-primary hover:opacity-70 transition-opacity duration-300 outline-none">
            <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
