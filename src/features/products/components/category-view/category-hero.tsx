'use client';

/**
 * @file category-hero.tsx
 * @description Standardized cinema-scale Hero banner for product category portals,
 *              supporting full-breed visual backgrounds, custom overlay blurs,
 *              and cinematic text layouts aligned with the Bugatti Design System.
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  parentVariants,
  childVariants,
  scrollIndicatorInitial,
  scrollIndicatorAnimate,
  scrollIndicatorTransition,
} from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';

interface CategoryHeroProps {
  id: string;
  name: string;
  subtitle: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
  isComingSoon?: boolean;
}

export function CategoryHero({
  id,
  name,
  subtitle,
  backgroundImageDesktop,
  backgroundImageMobile,
  isComingSoon = false,
}: CategoryHeroProps) {
  return (
    <section className="relative w-full min-h-[calc(100dvh-80px)] flex flex-col justify-start min-[1025px]:justify-center bg-canvas overflow-hidden">
      
      {/* Cinematic Background Layer */}
      <motion.div
        initial={{ opacity: 0, filter: isComingSoon ? 'blur(30px)' : 'blur(15px)' }}
        animate={{ opacity: 1, filter: isComingSoon ? 'blur(20px)' : 'blur(0px)' }}
        transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full relative"
        >
          {/* Mobile Background */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat min-[1025px]:hidden"
            style={{ backgroundImage: `url('${backgroundImageMobile}')` }}
          />
          {/* Desktop Background */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat hidden min-[1025px]:block"
            style={{ backgroundImage: `url('${backgroundImageDesktop}')` }}
          />
        </motion.div>
      </motion.div>

      {/* Atmospheric Radial & Vertical Gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-radial-vignette opacity-60 pointer-events-none" />

      {/* Main Structural Content Grid */}
      <div className="relative z-20 w-full max-w-[1720px] min-[2000px]:max-w-[2300px] mx-auto px-6 md:px-12 lg:px-20 min-[2000px]:px-16 pt-32 min-[1025px]:pt-0 min-[1025px]:mt-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={parentVariants}
          className="flex flex-col items-center text-center min-[1025px]:items-start min-[1025px]:text-left min-[1921px]:pl-24"
        >
          <motion.h1
            variants={childVariants}
            className={`${ty.displayXl} text-[60px] sm:text-[84px] md:text-[110px] min-[1025px]:text-[100px] xl:text-[130px] min-[2000px]:text-[200px] text-primary mb-1 md:mb-2`}
          >
            {name}
          </motion.h1>
          <motion.p
            variants={childVariants}
            className={`${ty.captionUpper} text-[12px] sm:text-[14px] md:text-[16px] text-muted flex items-center gap-1.5`}
          >
            {isComingSoon ? (
              <span>COMING SOON</span>
            ) : (
              <>
                {subtitle}
                {subtitle.includes('Coming soon') || subtitle.toLowerCase().includes('upcoming') ? null : (
                  <span className="opacity-0 font-sans text-xs"></span>
                )}
              </>
            )}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center">
        <motion.div
          initial={scrollIndicatorInitial}
          animate={scrollIndicatorAnimate}
          transition={scrollIndicatorTransition}
          className="flex flex-col items-center text-muted"
        >
          <ChevronDown strokeWidth={1} className="w-8 h-8 opacity-70 text-muted" />
        </motion.div>
      </div>
    </section>
  );
}
