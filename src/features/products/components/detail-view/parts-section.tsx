/**
 * @file parts-section.tsx
 * @description Encapsulated Parts & Components grid with horizontal navigation,
 *              sub-filtering, desktop/mobile pagination drawer, and card-entrance animations.
 *              Aligned with Bugatti Design System guidelines.
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as ty from '@/src/lib/design/typography';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { SPARE_PARTS, PART_FILTERS, SparePart, PartFilterValue } from '@/src/lib/data/spare-parts';
import { formatModelName } from '@/src/lib/data/products';
import { cn } from '@/src/lib/utils/cn';

export function PartsSection() {
  const partsScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePartFilter, setActivePartFilter] = useState<PartFilterValue>('ALL');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const [scrollLeftPos, setScrollLeftPos] = useState<boolean>(false);
  const [scrollRightPos, setScrollRightPos] = useState<boolean>(true);

  // Monitor horizontal overflow scroll positions
  const handleScrollPosition = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollLeftPos(target.scrollLeft > 0);
    setScrollRightPos(Math.ceil(target.scrollLeft + target.clientWidth) < target.scrollWidth);
  };

  // Force horizontal scroll to reset on category change
  useEffect(() => {
    if (partsScrollRef.current) {
      partsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activePartFilter]);

  // Handle Desktop Wheel/Arrow scrolling
  const scrollParts = (direction: 'left' | 'right') => {
    if (partsScrollRef.current) {
      const scrollAmount = partsScrollRef.current.clientWidth * 0.8;
      partsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Sub-filtering computation
  const filteredParts = SPARE_PARTS.filter(
    (part) => activePartFilter === 'ALL' || part.cat === activePartFilter
  );

  const handleFilterClick = (filter: PartFilterValue) => {
    setActivePartFilter(filter);
    setHasInteracted(true);

    requestAnimationFrame(() => {
      if (partsScrollRef.current) {
        partsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2 - 20;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  };

  return (
    <section ref={sectionRef} className="w-full section-py border-t border-hairline bg-canvas overflow-hidden px-6 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={parentVariants}
        className="max-w-[3840px] mx-auto w-full"
      >
        <div className="mb-6 relative z-40">
          <div className="flex justify-between items-center mb-4 relative z-50">
            <motion.h2
              variants={childVariants}
              className={cn(ty.displayLg, "text-4xl md:text-5xl lg:text-[60px] min-[2000px]:text-[80px] text-primary")}
            >
              PARTS & COMPONENTS
            </motion.h2>

            {/* Header Title Only */}
          </div>

          <div className="flex justify-between items-center w-full relative z-10">
            {/* Scroll Shadows for Mobile Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none z-10 md:hidden"
            >
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/40 via-white/10 to-transparent transition-opacity duration-300",
                  scrollLeftPos ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/40 via-white/10 to-transparent transition-opacity duration-300",
                  scrollRightPos ? "opacity-100" : "opacity-0"
                )}
              />
            </motion.div>

            {/* Horizontal Scroll Filter buttons */}
            <motion.div
              variants={parentVariants}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto overflow-y-hidden no-scrollbar w-full relative z-0"
              onScroll={handleScrollPosition}
            >
              {PART_FILTERS.map((f) => (
                <motion.button
                  variants={childVariants}
                  key={f}
                  onClick={() => handleFilterClick(f)}
                  className={cn(
                    "shrink-0 font-mono text-[10px] md:text-[12px] leading-[1.43] uppercase tracking-[2px] px-3 md:px-6 py-2 md:py-2.5 rounded-full transition-colors duration-300 outline-none focus:ring-1 focus:ring-white whitespace-nowrap font-normal border",
                    activePartFilter === f
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-muted border-hairline hover:border-[#3a3a3a] hover:text-primary"
                  )}
                >
                  {f}
                </motion.button>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <motion.div variants={childVariants} className="lg:flex items-center gap-3 hidden">
              <button
                onClick={() => scrollParts('left')}
                className="p-2 border border-hairline rounded-full hover:border-[#3a3a3a] text-muted hover:text-primary transition-colors outline-none focus:ring-1 focus:ring-white"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollParts('right')}
                className="p-2 border border-hairline rounded-full hover:border-[#3a3a3a] text-muted hover:text-primary transition-colors outline-none focus:ring-1 focus:ring-white"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Scrolling Card List */}
        <div
          ref={partsScrollRef}
          className="w-full overflow-x-auto overflow-y-hidden no-scrollbar"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePartFilter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: hasInteracted ? 0.05 : 0.15, delayChildren: hasInteracted ? 0 : 0.1 },
                },
                exit: { opacity: 0, filter: 'blur(12px)', transition: { duration: hasInteracted ? 0.2 : 0.3 } },
              }}
              className="relative flex snap-x snap-mandatory gap-4 md:gap-6 pr-6 md:pr-12 pb-8 w-max"
            >
              {filteredParts.map((part) => {
                const isComingSoon = part.isComingSoon;
                return (
                  <motion.div
                    key={part.id}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: 'blur(4px)', pointerEvents: 'none' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        pointerEvents: 'auto',
                        transition: { duration: hasInteracted ? 0.4 : 1.0, ease: [0.2, 0.8, 0.2, 1] },
                      },
                      exit: { opacity: 0, filter: 'blur(4px)', pointerEvents: 'none', transition: { duration: hasInteracted ? 0.2 : 0.4 } },
                    }}
                    className="relative w-[260px] lg:w-[380px] min-[2000px]:w-[420px] shrink-0 snap-always snap-start overflow-hidden rounded-[20px] border border-hairline aspect-[3/4] bg-[#eaeaea] flex flex-col"
                  >
                    {/* Upper block: Image Container */}
                    <div className="relative w-full flex-1 overflow-hidden select-none bg-[#f2f2f2]">
                      <div className="relative w-full h-full pointer-events-none">
                        <div
                          className="w-full h-full bg-cover bg-center bg-no-repeat blur-xl brightness-75 scale-110"
                          style={{
                            backgroundImage: `url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png')`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <span className="border border-white/20 px-6 py-2 text-white font-mono text-[11px] tracking-[2px] uppercase rounded-none bg-black/60">
                            COMING SOON
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lower block: Text Content box */}
                    <div className="w-full bg-[#eaeaea] p-5 lg:pt-[18px] lg:pb-[30px] lg:px-[30px] flex flex-col items-start text-left shrink-0">
                      <button
                        onClick={() => handleFilterClick(part.cat)}
                        className="font-mono text-[10px] md:text-[11px] uppercase tracking-[2px] text-[#666666] mb-2 pointer-events-auto inline-block hover-underline-expand pb-0.5 font-normal outline-none"
                      >
                        {part.cat}
                      </button>
                      
                      <div className="flex justify-between items-start w-full gap-2">
                        <h3 className="font-display font-normal text-[16px] xs:text-[18px] lg:text-[24px] uppercase leading-tight text-[#000000] pointer-events-auto outline-none tracking-[1px] flex-1 pr-2">
                          {formatModelName(part.name)}
                        </h3>
                        <span className="font-mono text-[11px] xs:text-[12px] lg:text-[14px] uppercase tracking-[1px] text-[#000000] mt-1 shrink-0 pointer-events-auto font-normal">
                          THB ??
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          {/* Edge align spacer */}
          <div className="w-[1px] shrink-0" />
        </div>
      </motion.div>
    </section>
  );
}
