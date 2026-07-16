/**
 * @file store-hero-slide.tsx
 * @description Individual carousel slide for the StoreHero showcase.
 */

import React from 'react';
import Link from 'next/link';
import { motion, useTransform } from 'framer-motion';
import * as ty from '@/src/lib/design/typography';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { HeroCategory } from '../types';
import { storeHeroBackgroundVariants } from '../animations';
import { storeContent } from '@/src/content';

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

export function StoreHeroSlide({ cat, idx, mvX, dimensions }: StoreHeroSlideProps) {
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
              {storeContent.hero.comingSoon}
            </motion.span>
          )}
        </div>

        <motion.div variants={childVariants}>
          <Link
            href={cat.isComingSoon ? '#' : `/products/${cat.name.toLowerCase()}`}
            className="inline-flex min-h-11 items-center justify-center border border-primary rounded-pill bg-primary text-canvas font-mono font-normal text-button uppercase transition-colors duration-300 text-[9px] min-[375px]:text-[10px] sm:text-[12px] md:text-[14px] px-4 py-1.5 min-[375px]:px-5 min-[375px]:py-2 sm:px-6 sm:py-2.5 md:px-[24px] md:py-[12px] hover:bg-transparent hover:text-primary whitespace-nowrap cursor-pointer"
            onClick={(e) => cat.isComingSoon && e.preventDefault()}
          >
            {storeContent.hero.discover} {cat.name}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
