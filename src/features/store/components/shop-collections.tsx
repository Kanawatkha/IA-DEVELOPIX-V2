/**
 * @file shop-collections.tsx
 * @description Filterable horizontal-scroll product card carousel, dynamically resolving model image resources.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/src/context/cart-context';
import {
  FILTERS,
  type FilterValue,
  formatModelName,
  getProductPath,
  getCategoryPath,
} from '@/src/lib/data/products';
import type { ShopModel } from '@/src/lib/data/products';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { useShopCollections } from '../hooks/use-shop-collections';
import { collectionStaggerVariants, modelCardVariants } from '../animations';
import { DEFAULT_PRODUCT_BLUEPRINT } from '../constants';

interface ShopCollectionsProps {
  /** Section heading text. E.g. "SHOP COLLECTIONS" or "CUSTOMERS ALSO BOUGHT" */
  title: string;
  /** Optional: pre-select a category filter on mount */
  defaultFilter?: FilterValue;
  /** Optional: indicates if rendered on Cart Page to trigger top-scroll instead of drawer */
  isCartPage?: boolean;
}

export function ShopCollections({ title, defaultFilter = 'ALL', isCartPage = false }: ShopCollectionsProps) {
  const { addToCart, setIsCartOpen } = useCart();

  const {
    activeFilter,
    scrollContainerRef,
    sectionRef,
    shadowLeft,
    shadowRight,
    filteredModels,
    hasInteracted,
    handleScroll,
    scrollCards,
    handleFilterClick,
  } = useShopCollections(defaultFilter);

  const handleAddToCartClick = (model: ShopModel) => {
    if (model.isComingSoon || model.price === null) return;

    addToCart({
      id: model.id,
      name: model.name,
      price: model.price,
      image: model.image,
      href: model.path,
    }, 1);
    
    if (isCartPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full section-py border-t border-hairline overflow-hidden bg-canvas px-6 lg:px-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={parentVariants}
        className="max-w-[3840px] mx-auto w-full"
      >
        {/* Header row */}
        <div className="mb-6">
          <motion.h2
            variants={childVariants}
            className="font-display text-4xl md:text-5xl lg:text-[60px] min-[2000px]:text-[80px] font-normal uppercase tracking-[4px] text-primary mb-4"
          >
            {title}
          </motion.h2>

          <div className="flex justify-between items-center w-full relative">
            {/* Mobile scroll shadows */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none z-10 md:hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/40 via-white/10 to-transparent transition-opacity duration-300 ${
                  shadowLeft ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className={`absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/40 via-white/10 to-transparent transition-opacity duration-300 ${
                  shadowRight ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </motion.div>

            {/* Filter buttons */}
            <motion.div
              variants={parentVariants}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden w-full relative z-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={handleScroll}
            >
              {FILTERS.map((f) => (
                <motion.button
                  variants={childVariants}
                  key={f}
                  onClick={() => handleFilterClick(f)}
                  className={`shrink-0 font-mono text-[10px] md:text-[12px] leading-[1.43] uppercase tracking-[2px] px-3 md:px-6 py-2 md:py-2.5 rounded-full transition-colors duration-300 outline-none focus:ring-1 focus:ring-white whitespace-nowrap font-normal border ${
                    activeFilter === f
                      ? 'bg-primary text-canvas border-primary'
                      : 'bg-transparent text-muted border-hairline hover:border-hairline-strong hover:text-primary'
                  }`}
                >
                  {f}
                </motion.button>
              ))}
            </motion.div>

            {/* Desktop navigation arrows */}
            <motion.div variants={childVariants} className="lg:flex items-center gap-3 hidden">
              <button
                onClick={() => scrollCards('left')}
                className="p-2 border border-hairline rounded-full hover:border-hairline-strong text-muted hover:text-primary transition-colors outline-none focus:ring-1 focus:ring-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCards('right')}
                className="p-2 border border-hairline rounded-full hover:border-hairline-strong text-muted hover:text-primary transition-colors outline-none focus:ring-1 focus:ring-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit="exit"
              variants={collectionStaggerVariants(hasInteracted)}
              className="relative flex snap-x snap-mandatory gap-4 md:gap-6 w-max pr-6 md:pr-12 pb-8"
            >
              {filteredModels.map((model) => {
                const isComingSoon = model.isComingSoon;
                const cardImage = model.image || DEFAULT_PRODUCT_BLUEPRINT;

                return (
                  <motion.div
                    key={model.id}
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
                                handleAddToCartClick(model);
                              }}
                              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-primary text-product-ink hover:bg-product-ink hover:text-primary hover:border-primary border border-transparent rounded-full font-mono text-[11px] uppercase tracking-[2px] pointer-events-auto opacity-0 translate-y-4 blur-[4px] group-hover/img:opacity-100 group-hover/img:translate-y-0 group-hover/img:blur-none transition-all duration-300 shadow-lg whitespace-nowrap cursor-pointer"
                            >
                              ADD TO CART
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
                              COMING SOON
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
              })}
            </motion.div>
          </AnimatePresence>
          {/* Right edge spacer */}
          <div className="w-[1px] shrink-0" />
        </div>
      </motion.div>
    </section>
  );
}
