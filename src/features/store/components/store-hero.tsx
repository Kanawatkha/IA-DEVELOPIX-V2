/**
 * @file store-hero.tsx
 * @description Cinema-scale categories carousel for the StorePage, fully aligned
 *              with the Bugatti Design System tokens and principles. Uses useStoreHero hook.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import * as ty from '@/src/lib/design/typography';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { HeroCategory } from '../types';
import { useStoreHero } from '../hooks/use-store-hero';
import { storeHeroBackgroundVariants } from '../animations';



interface StoreHeroSlideProps {
  cat: HeroCategory;
  idx: number;
  mvX: any;
  dimensions: {
    containerWidth: number;
    childWidth: number;
    gap: number;
  };
}

function StoreHeroSlide({ cat, idx, mvX, dimensions }: StoreHeroSlideProps) {
  // Translate wrapping formula for sushi conveyor-belt effect
  const tx = useTransform(mvX, (val: number | string) => {
    if (dimensions.containerWidth === 0 || dimensions.childWidth === 0) return 0;
    const currentVal = typeof val === 'string' ? parseFloat(val) : val;
    const step = dimensions.childWidth + dimensions.gap;
    const N = 4; // Total categories is 4
    
    // cx is the centering offset: (containerWidth - childWidth) / 2
    const cx = (dimensions.containerWidth - dimensions.childWidth) / 2;
    
    // Position of this slide relative to the screen center
    const relativeOffset = idx * step + currentVal - cx;
    
    // Wrap relativeOffset to [-2 * step, 2 * step)
    const range = N * step;
    let wrapped = (relativeOffset - (-2 * step)) % range;
    if (wrapped < 0) wrapped += range;
    const wrappedOffset = wrapped + (-2 * step);
    
    // The translation applied to shift this slide in the track:
    return wrappedOffset - (idx * step + currentVal - cx);
  });

  return (
    <motion.div
      className="relative w-[85vw] md:w-[84vw] min-[1025px]:w-[82vw] h-full shrink-0 bg-surface-soft overflow-hidden flex flex-col justify-end rounded-none border-x border-hairline/30"
      style={{ x: tx }}
    >
      {/* Cinematic background photograph, utilizing individual category-specific images */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={cat.isComingSoon}
        variants={storeHeroBackgroundVariants}
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none user-select-none ${
          cat.isComingSoon ? 'grayscale-[0.4]' : ''
        }`}
        style={{
          backgroundImage: `url('${cat.image}')`,
        }}
      >
        {/* Pure bottom overlay fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/10 to-transparent pointer-events-none" />
      </motion.div>

      {/* Structured slide header copy overlay */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={parentVariants}
        className="relative z-10 p-6 md:p-12 pb-24 md:pb-32 min-[2000px]:p-20 min-[2000px]:pb-40 flex flex-col items-start w-full"
      >
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
          <motion.h2
            variants={childVariants}
            className={`${ty.displayXl} text-3xl min-[375px]:text-4xl md:text-[80px] min-[2000px]:text-[120px] text-primary select-none`}
          >
            {cat.name}
          </motion.h2>
          {cat.isComingSoon && (
            <motion.span
              variants={childVariants}
              className={`${ty.captionUpper} text-[10px] md:text-xs text-muted border border-hairline px-3 py-1 rounded-none self-start md:self-auto translate-y-0 md:translate-y-2 lg:translate-y-4`}
            >
              (COMING SOON)
            </motion.span>
          )}
        </div>

        <motion.div variants={childVariants}>
          <Link
            href={cat.isComingSoon ? '#' : `/products/${cat.name.toLowerCase()}`}
            className="inline-flex min-h-11 items-center justify-center border border-primary rounded-pill bg-primary text-canvas font-mono font-normal text-button uppercase transition-colors duration-300 text-[9px] min-[375px]:text-[10px] sm:text-[12px] md:text-[14px] px-4 py-1.5 min-[375px]:px-5 min-[375px]:py-2 sm:px-6 sm:py-2.5 md:px-[24px] md:py-[12px] hover:bg-transparent hover:text-primary whitespace-nowrap cursor-pointer"
            onClick={(e) => cat.isComingSoon && e.preventDefault()}
          >
            DISCOVER {cat.name}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

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
