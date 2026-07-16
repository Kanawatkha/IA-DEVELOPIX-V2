/**
 * @file collection-card.tsx
 * @description Individual product card component with hover actions, details viewer, and dynamic media.
 */

import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  formatModelName,
  getProductPath,
  getCategoryPath,
} from '@/src/lib/data/products';
import type { ShopModel } from '@/src/lib/data/products';
import { modelCardVariants } from '../animations';
import { DEFAULT_PRODUCT_BLUEPRINT } from '../constants';
import { storeContent } from '@/src/content';

interface CollectionCardProps {
  model: ShopModel;
  hasInteracted: boolean;
  onAddToCart: (model: ShopModel) => void;
}

export function CollectionCard({ model, hasInteracted, onAddToCart }: CollectionCardProps) {
  const isComingSoon = model.isComingSoon;
  const cardImage = model.image || DEFAULT_PRODUCT_BLUEPRINT;

  return (
    <motion.div
      custom={hasInteracted}
      variants={modelCardVariants}
      className="relative w-[260px] lg:w-[380px] min-[2000px]:w-[420px] shrink-0 snap-always snap-start overflow-hidden rounded-[20px] border border-hairline aspect-[3/4] bg-product-card flex flex-col"
    >
      {/* Upper block: Image Container */}
      <div className="relative w-full flex-1 overflow-hidden select-none bg-product-image">
        {!isComingSoon ? (
          <div className="relative w-full h-full group/img">
            <Link
              href={getProductPath(model)}
              className="block w-full h-full pointer-events-auto"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-105"
                style={{
                  backgroundImage: `url('${cardImage}')`,
                }}
              />
            </Link>
            
            {/* Interactive Hover Actions Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Quick View Eye Button */}
              <Link
                href={getProductPath(model)}
                className="absolute top-4 right-4 w-11 h-11 bg-primary text-product-ink hover:bg-product-ink hover:text-primary hover:border-primary border border-transparent rounded-full flex items-center justify-center pointer-events-auto opacity-0 translate-y-2 blur-[4px] group-hover/img:opacity-100 group-hover/img:translate-y-0 group-hover/img:blur-none transition-all duration-300 shadow-lg cursor-pointer"
                aria-label="View product details"
              >
                <Eye className="w-5 h-5" />
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart(model);
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-primary text-product-ink hover:bg-product-ink hover:text-primary hover:border-primary border border-transparent rounded-full font-mono text-[11px] uppercase tracking-[2px] pointer-events-auto opacity-0 translate-y-4 blur-[4px] group-hover/img:opacity-100 group-hover/img:translate-y-0 group-hover/img:blur-none transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer"
              >
                {storeContent.common.addToCart}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full pointer-events-none">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat blur-xl brightness-75 scale-110"
              style={{
                backgroundImage: `url('${cardImage}')`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="border border-white/20 px-6 py-2 text-white font-mono text-[11px] tracking-[2px] uppercase rounded-none bg-black/60">
                {storeContent.common.comingSoon}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lower block: Text Content box */}
      <div className="w-full bg-product-card p-5 lg:pt-[18px] lg:pb-[30px] lg:px-[30px] flex flex-col items-start text-left shrink-0">
        <Link
          href={getCategoryPath(model.categoryLabel)}
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[2px] text-muted-soft mb-2 pointer-events-auto inline-block hover-underline-expand pb-0.5 font-normal outline-none"
        >
          {model.categoryLabel}
        </Link>
        
        <div className="flex justify-between items-start w-full gap-2">
          <h3 className="font-display font-normal text-[16px] xs:text-[18px] lg:text-[24px] uppercase leading-tight text-product-ink pointer-events-auto outline-none tracking-[1px] flex-1 pr-2">
            <Link
              href={getProductPath(model)}
              className="inline-block hover-underline-expand pb-0.5 outline-none"
            >
              {formatModelName(model.name)}
            </Link>
          </h3>
          <span className="font-mono text-[11px] xs:text-[12px] lg:text-[14px] uppercase tracking-[1px] text-product-ink mt-1 shrink-0 pointer-events-auto font-normal">
            {model.priceLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
