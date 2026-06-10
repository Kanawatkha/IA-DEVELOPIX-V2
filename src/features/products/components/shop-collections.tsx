'use client';

// shop-collections.tsx
// Filterable horizontal-scroll product card carousel.
//
// This is the Single Source of Truth for the shop/also-bought carousel UI.
// Used in:
//  - store/page.tsx         -> title="SHOP COLLECTIONS"
//  - products/*/*/page.tsx  -> title="CUSTOMERS ALSO BOUGHT"
//
// BUG FIX:
// Previous copies in product detail pages had `snap-x snap-mandatory`
// on BOTH the outer scroll container and inner flex wrapper, causing
// the nav arrow .scrollBy() to conflict with browser snap.
// Fixed here: snap classes are only on the inner flex wrapper (w-max),
// matching the correct pattern from store/page.tsx.

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SHOP_MODELS,
  FILTERS,
  type FilterValue,
  formatModelName,
  getProductPath,
  getCategoryPath,
} from '@/src/lib/data/products';
import { parentVariants, childVariants } from '@/src/lib/design/variants';

interface ShopCollectionsProps {
  /** Section heading text. E.g. "SHOP COLLECTIONS" or "CUSTOMERS ALSO BOUGHT" */
  title: string;
  /** Optional: pre-select a category filter on mount */
  defaultFilter?: FilterValue;
}

export function ShopCollections({ title, defaultFilter = 'ALL' }: ShopCollectionsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(defaultFilter);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Refs for the scroll container and section (for centered-scroll on filter change)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile scroll shadow state
  const [shadowLeft, setShadowLeft] = useState(false);
  const [shadowRight, setShadowRight] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    setShadowLeft(t.scrollLeft > 0);
    setShadowRight(Math.ceil(t.scrollLeft + t.clientWidth) < t.scrollWidth);
  };

  // Reset horizontal scroll to left when filter changes (Store page pattern)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  const scrollCards = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const handleFilterClick = (filter: FilterValue) => {
    setActiveFilter(filter);
    setHasInteracted(true);
    // Scroll section to center of viewport (matches store page behaviour)
    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const targetY =
          window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2 - 20;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  };

  const filteredModels = SHOP_MODELS.filter(
    (m) => activeFilter === 'ALL' || m.cat === activeFilter
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 md:py-12 border-t border-hairline overflow-hidden bg-canvas px-6 lg:px-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
                className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary/30 to-transparent transition-opacity duration-300 ${
                  shadowLeft ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary/30 to-transparent transition-opacity duration-300 ${
                  shadowRight ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </motion.div>

            {/* Filter buttons */}
            <motion.div
              variants={parentVariants}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden w-full relative z-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={handleScroll}
            >
              {FILTERS.map((f) => (
                <motion.button
                  variants={childVariants}
                  key={f}
                  onClick={() => handleFilterClick(f)}
                  className={`shrink-0 font-mono text-[10px] md:text-[12px] leading-[1.43] uppercase tracking-[2px] px-3 md:px-6 py-2 md:py-2.5 rounded-pill transition-colors duration-300 outline-none focus:ring-1 focus:ring-white whitespace-nowrap font-normal border ${
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

        {/* Scroll container — BUG FIX: no snap-x here, only on inner flex */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: hasInteracted ? 0.05 : 0.15,
                    delayChildren: hasInteracted ? 0 : 0.1,
                  },
                },
                exit: {
                  opacity: 0,
                  filter: 'blur(12px)',
                  transition: { duration: hasInteracted ? 0.2 : 0.3 },
                },
              }}
              /* snap-x + snap-mandatory is applied HERE (inner flex wrapper) only — correct pattern */
              className="relative flex snap-x snap-mandatory gap-4 md:gap-6 w-max pr-6 md:pr-12 pb-8"
            >
              {filteredModels.map((model) => {
                const isComingSoon =
                  model.name.includes('FANPULL') ||
                  model.cat === 'GATHERING' ||
                  model.cat === 'SUMO' ||
                  model.isComingSoon;

                return (
                  <motion.div
                    key={model.id}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: {
                          duration: hasInteracted ? 0.4 : 1.0,
                          ease: [0.2, 0.8, 0.2, 1],
                        },
                      },
                      exit: {
                        opacity: 0,
                        filter: 'blur(12px)',
                        transition: { duration: hasInteracted ? 0.2 : 0.4 },
                      },
                    }}
                    className="relative w-[260px] lg:w-[380px] min-[2000px]:w-[420px] shrink-0 snap-always snap-start overflow-hidden rounded-none border border-hairline aspect-[3/4] bg-surface-card"
                  >
                    {/* Layer 1: Background Image */}
                    {!isComingSoon ? (
                      <Link
                        href={getProductPath(model)}
                        className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-auto block"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out hover:scale-105"
                          style={{
                            backgroundImage: `url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png')`,
                          }}
                        />
                      </Link>
                    ) : (
                      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] blur-xl brightness-50"
                          style={{
                            backgroundImage: `url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png')`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                          <span className="border border-primary/30 px-6 py-2 text-primary font-normal tracking-[2px] uppercase rounded-none bg-canvas/60">
                            COMING SOON
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-canvas/90 to-transparent pointer-events-none z-0" />

                    {/* Layer 2: Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-8 md:pb-10 flex flex-col lg:flex-row lg:justify-between lg:items-end z-10 pointer-events-none">
                      <div className="flex flex-col items-start text-left">
                        <Link
                          href={getCategoryPath(model.cat)}
                          className="font-mono text-[10px] md:text-[12px] uppercase tracking-[2px] text-muted mb-2 pointer-events-auto inline-block relative transition-all outline-none focus:text-primary pb-1 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 font-normal"
                        >
                          {model.cat}
                        </Link>
                        <h3 className="font-display font-normal text-2xl md:text-3xl uppercase leading-none text-primary pointer-events-auto outline-none tracking-[2px]">
                          <Link
                            href={getProductPath(model)}
                            className="inline-block relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 transition-all outline-none pb-1"
                          >
                            {formatModelName(model.name)}
                          </Link>
                        </h3>
                      </div>
                      <span className="font-mono text-[13px] md:text-[15px] uppercase tracking-[2px] text-primary mt-2 lg:mt-0 lg:ml-4 self-start lg:self-auto shrink-0 pointer-events-auto font-normal">
                        {isComingSoon ? 'THB ??' : model.price}
                      </span>
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
