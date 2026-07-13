'use client';

/**
 * @file src/app/(storefront)/products/gathering/page.tsx
 * @description Standardized, orchestrator-driven category portal for GATHERING products.
 *              Acts as a declarative coordinator loading modules from standard configurations.
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCategoryConfig } from '@/src/lib/data/categories';
import { CategoryHero } from '@/src/features/products';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';

export default function GatheringPage() {
  const config = getCategoryConfig('gathering');

  if (!config) {
    notFound();
  }

  return (
    <main className="w-full bg-canvas min-h-screen text-primary overflow-hidden">
      
      {/* SECTION 1: THE HERO */}
      <CategoryHero
        id={config.id}
        name={config.name}
        subtitle={config.subtitle}
        backgroundImageDesktop={config.backgroundImageDesktop}
        backgroundImageMobile={config.backgroundImageMobile}
        isComingSoon={config.isComingSoon}
      />

      {/* SECTION 2: COMING SOON BLOCK */}
      {config.isComingSoon && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={parentVariants}
          className="w-full min-h-[50vh] md:min-h-[60vh] flex justify-center items-center section-py"
        >
          <motion.div
            variants={childVariants}
            className="w-full max-w-[1920px] mx-auto px-6 md:px-12 2xl:px-24 flex justify-center items-center"
          >
            <div className="w-full border border-hairline bg-transparent py-12 px-10 md:py-32 md:px-32 flex justify-center items-center">
              <h2 className={`${ty.displayLg} text-2xl sm:text-3xl md:text-5xl lg:text-7xl 2xl:text-[6rem] text-primary text-center whitespace-nowrap`}>
                COMING SOON
              </h2>
            </div>
          </motion.div>
        </motion.section>
      )}
      
    </main>
  );
}
