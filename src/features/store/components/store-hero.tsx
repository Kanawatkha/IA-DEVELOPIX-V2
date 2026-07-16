/**
 * @file store-hero.tsx
 * @description Cinema-scale categories carousel for the StorePage, fully aligned
 *              with the Bugatti Design System tokens and principles. Uses useStoreHero hook.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useStoreHero } from '../hooks/use-store-hero';
import { StoreHeroSlide } from './store-hero-slide';

export function StoreHero() {
  const {
    containerRef,
    activeIndex,
    extendedCategories,
    categories,
    mvX,
    handleNextSlide,
    handlePrevSlide,
    handleDotClickWrapper,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    isHovered,
    dimensions,
  } = useStoreHero();

  return (
    <section
      id="store-hero-carousel"
      className="relative w-full border-b border-hairline bg-canvas overflow-hidden flex flex-col min-h-[500px] select-none"
      style={{ height: "calc(100svh - var(--navbar-height, 90px))" }}
    >
      {/* Outer overflow container viewport frame */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: dimensions.containerWidth > 0 ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-full flex-1 relative overflow-hidden flex items-stretch"
      >
        <motion.div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="h-full flex gap-2 md:gap-4 items-stretch touch-pan-y"
          style={{ x: mvX, cursor: isHovered ? 'grabbing' : 'grab' }}
        >
          {extendedCategories.map((cat, idx) => (
            <StoreHeroSlide
              key={`${cat.id}-${idx}`}
              cat={cat}
              idx={idx}
              mvX={mvX}
              dimensions={dimensions}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Control console wrapper */}
      <div className="absolute bottom-8 md:bottom-10 left-0 right-0 z-20 px-[11vw] md:px-[12vw] min-[1025px]:px-[9vw] lg:px-[10vw] flex justify-between items-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handlePrevSlide}
          className="p-2 md:p-4 text-muted hover:text-primary transition-colors outline-none pointer-events-auto border border-hairline rounded-full bg-canvas/40 backdrop-blur-sm cursor-pointer"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClickWrapper(idx)}
              className={`transition-all duration-300 rounded-full outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                activeIndex % categories.length === idx
                  ? 'w-10 h-1.5 bg-primary'
                  : 'w-2 h-1.5 bg-muted-soft hover:bg-muted'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleNextSlide}
          className="p-2 md:p-4 text-muted hover:text-primary transition-colors outline-none pointer-events-auto border border-hairline rounded-full bg-canvas/40 backdrop-blur-sm cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
        </motion.button>
      </div>

      {/* Floating scroll icon indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: [0, 8, 0], filter: 'blur(0px)' }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            filter: { duration: 0.6, delay: 0.5 },
            y: { duration: 2, delay: 1.0, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="flex flex-col items-center text-muted"
        >
          <ChevronDown className="w-6 h-6 opacity-60 text-muted" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
}
