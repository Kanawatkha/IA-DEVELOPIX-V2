/**
 * @file parts-section.tsx
 * @description Encapsulated Parts & Components grid with horizontal navigation,
 *              sub-filtering, desktop/mobile pagination drawer, and card-entrance animations.
 *              Aligned with Bugatti Design System guidelines.
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import * as ty from '@/src/lib/design/typography';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { SPARE_PARTS, PART_FILTERS, SparePart, PartFilterValue } from '@/src/lib/data/spare-parts';
import { formatModelName } from '@/src/lib/data/products';
import { cn } from '@/src/lib/utils/cn';

export function PartsSection() {
  const partsScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const paginationMobileRef = useRef<HTMLDivElement>(null);

  const [activePartFilter, setActivePartFilter] = useState<PartFilterValue>('ALL');
  const [partPage, setPartPage] = useState<number>(1);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isPaginationOpen, setIsPaginationOpen] = useState<boolean>(false);

  const [scrollLeftPos, setScrollLeftPos] = useState<boolean>(false);
  const [scrollRightPos, setScrollRightPos] = useState<boolean>(true);

  // Monitor horizontal overflow scroll positions
  const handleScrollPosition = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollLeftPos(target.scrollLeft > 0);
    setScrollRightPos(Math.ceil(target.scrollLeft + target.clientWidth) < target.scrollWidth);
  };

  // Close pagination box on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedOutsideDesktop = paginationRef.current && !paginationRef.current.contains(target);
      const clickedOutsideMobile = paginationMobileRef.current ? !paginationMobileRef.current.contains(target) : true;

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIsPaginationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Force horizontal scroll to reset on category or pagination change
  useEffect(() => {
    if (partsScrollRef.current) {
      partsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activePartFilter, partPage]);

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

  // Sub-filtering and pagination computation
  const filteredParts = SPARE_PARTS.filter(
    (part) => activePartFilter === 'ALL' || part.cat === activePartFilter
  );

  const partsPerPage = 8;
  const totalPartPages = Math.ceil(filteredParts.length / partsPerPage);
  const paginatedParts = filteredParts.slice((partPage - 1) * partsPerPage, partPage * partsPerPage);

  const handleFilterClick = (filter: PartFilterValue) => {
    setActivePartFilter(filter);
    setPartPage(1);
    setHasInteracted(true);
    setIsPaginationOpen(false);

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

  const handlePageClick = (pageNumber: number) => {
    setPartPage(pageNumber);
    setHasInteracted(true);
    setIsPaginationOpen(false);

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
    <section ref={sectionRef} className="w-full py-10 md:py-12 border-t border-hairline bg-canvas overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={parentVariants}
        className="max-w-[1720px] min-[2000px]:max-w-[2300px] mx-auto w-full"
      >
        <div className="px-6 md:px-12 lg:px-20 min-[2000px]:px-16 mb-6 relative z-40">
          <div className="flex justify-between items-center mb-4 relative z-50">
            <motion.h2
              variants={childVariants}
              className={cn(ty.displayLg, "text-4xl md:text-5xl lg:text-[60px] min-[2000px]:text-[80px] text-primary")}
            >
              PARTS & COMPONENTS
            </motion.h2>

            {/* Pagination Drawer (Mobile Breakpoint) */}
            <motion.div variants={childVariants} className="relative md:hidden" ref={paginationMobileRef}>
              <button
                onClick={() => setIsPaginationOpen(!isPaginationOpen)}
                className="flex items-center gap-2 font-mono text-[11px] text-primary border border-hairline px-3 py-1.5 rounded-full hover:border-[#3a3a3a] transition-colors outline-none focus:ring-1 focus:ring-white whitespace-nowrap font-normal"
              >
                PAGE 0{partPage}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {isPaginationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 bg-surface-card border border-hairline rounded-none py-2 w-full z-50 shadow-2xl pointer-events-auto"
                  >
                    {Array.from({ length: totalPartPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageClick(i + 1)}
                        className={cn(
                          "block w-full text-left px-4 py-2 font-mono text-xs tracking-[2px] font-normal transition-colors",
                          partPage === i + 1 ? "text-primary" : "text-muted hover:text-primary"
                        )}
                      >
                        PAGE 0{i + 1}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
                  "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-300",
                  scrollLeftPos ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/10 to-transparent transition-opacity duration-300",
                  scrollRightPos ? "opacity-100" : "opacity-0"
                )}
              />
            </motion.div>

            {/* Horizontal Scroll Filter buttons */}
            <motion.div
              variants={parentVariants}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto no-scrollbar w-full relative z-0"
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

            {/* Pagination Drawer & Navigation Arrows (Desktop/Tablet) */}
            <motion.div variants={childVariants} className="hidden md:flex items-center gap-6">
              <div className="relative" ref={paginationRef}>
                <button
                  onClick={() => setIsPaginationOpen(!isPaginationOpen)}
                  className="flex items-center gap-2 font-mono text-[11px] text-primary border border-hairline px-4 py-1.5 rounded-full hover:border-[#3a3a3a] transition-colors outline-none focus:ring-1 focus:ring-white whitespace-nowrap font-normal"
                >
                  PAGE 0{partPage}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {isPaginationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-surface-card border border-hairline rounded-none py-2 w-full z-50 shadow-2xl"
                    >
                      {Array.from({ length: totalPartPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageClick(i + 1)}
                          className={cn(
                            "block w-full text-left px-4 py-2 font-mono text-xs tracking-[2px] font-normal transition-colors",
                            partPage === i + 1 ? "text-primary" : "text-muted hover:text-primary"
                          )}
                        >
                          PAGE 0{i + 1}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="lg:flex items-center gap-3 hidden">
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
              </div>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Scrolling Card List */}
        <div
          ref={partsScrollRef}
          className="w-full overflow-x-auto no-scrollbar"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePartFilter}-${partPage}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: hasInteracted ? 0.05 : 0.15, delayChildren: hasInteracted ? 0 : 0.1 },
                },
                exit: { opacity: 0, filter: 'blur(12px)', transition: { duration: hasInteracted ? 0.2 : 0.3 } },
              }}
              className="relative flex snap-x snap-mandatory gap-4 md:gap-6 pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 lg:pr-20 pb-8 w-max"
            >
              {paginatedParts.map((part) => {
                const isComingSoon = part.isComingSoon;
                return (
                  <motion.div
                    key={part.id}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: hasInteracted ? 0.4 : 1.0, ease: [0.2, 0.8, 0.2, 1] },
                      },
                      exit: { opacity: 0, filter: 'blur(12px)', transition: { duration: hasInteracted ? 0.2 : 0.4 } },
                    }}
                    className="group relative w-[260px] lg:w-[380px] min-[2000px]:w-[420px] shrink-0 snap-always snap-start overflow-hidden rounded-none aspect-[3/4] bg-surface-card border border-hairline hover:border-[#3a3a3a] transition-colors duration-500"
                  >
                    {/* Background Product Image Layer */}
                    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
                      <div
                        className={cn(
                          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                          isComingSoon && "blur-xl brightness-50"
                        )}
                        style={{ backgroundImage: `url('${part.image}')` }}
                      />

                      {isComingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <span className="border border-white/20 px-6 py-2 text-white font-mono text-[11px] tracking-[2px] uppercase rounded-none bg-black/60">
                            COMING SOON
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Ambient Light Cutoff Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-0" />

                    {/* Metadata Text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-8 md:pb-10 flex flex-col lg:flex-row lg:justify-between lg:items-end z-10 pointer-events-none">
                      <div className="flex flex-col items-start text-left">
                        <button
                          onClick={() => handleFilterClick(part.cat)}
                          className="font-mono text-[10px] md:text-[12px] uppercase tracking-[2px] text-muted mb-2 pointer-events-auto inline-block relative transition-all outline-none focus:text-primary pb-1 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 font-normal"
                        >
                          {part.cat}
                        </button>
                        <h3 className="font-display font-normal text-2xl md:text-3xl uppercase leading-none text-primary pointer-events-auto outline-none tracking-[2px]">
                          {formatModelName(part.name)}
                        </h3>
                      </div>
                      <span className="font-mono text-[13px] md:text-[15px] uppercase tracking-[2px] text-primary mt-2 lg:mt-0 lg:ml-4 self-start lg:self-auto shrink-0 pointer-events-auto font-normal">
                        {isComingSoon ? 'THB ??' : part.price}
                      </span>
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
