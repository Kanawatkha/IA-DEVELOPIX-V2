'use client';

/**
 * @file performance-matchup.tsx
 * @description Standardized performance comparison grid. Maps technical parameters
 *              such as Speed, Agility, and Control Difficulty side-by-side inside
 *              a cinema-scale comparative match-up view.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';
import { StatBar } from './stat-bar';
import { PerformanceComparison } from '@/src/features/products/types/Category';

interface PerformanceMatchupProps {
  title?: string;
  comparisons?: PerformanceComparison[];
}

export function PerformanceMatchup({
  title = 'PERFORMANCE MATCH-UP',
  comparisons,
}: PerformanceMatchupProps) {
  if (!comparisons || comparisons.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={parentVariants}
      className="w-full max-w-[1720px] min-[2000px]:max-w-[2300px] mx-auto px-6 md:px-12 lg:px-20 min-[2000px]:px-16 py-10 md:py-12 border-t border-hairline"
    >
      <motion.h2
        variants={childVariants}
        className={`${ty.displayLg} max-[376px]:text-3xl text-[48px] md:text-[72px] lg:text-[96px] text-primary mb-6 md:mb-8`}
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0">
        {comparisons.slice(0, 2).map((col, idx) => (
          <motion.div
            key={col.name}
            variants={childVariants}
            className={`pb-10 md:pb-0 border-b md:border-b-0 border-hairline ${
              idx === 0
                ? 'md:pr-8 lg:pr-16'
                : 'pt-10 md:pt-0 md:pl-8 lg:pl-16 md:border-l'
            }`}
          >
            {/* Aspect Ratio Container for Vehicle Photography */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-surface-card mb-8 rounded-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.imageUrl}
                alt={`${col.name} Match-up`}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className={`${ty.displayMd} text-[36px] md:text-[48px] text-primary mb-8`}>
              {col.name}
            </h3>

            {/* Performance Stat loop */}
            <div className="flex flex-col gap-6 mb-8">
              {col.stats.map((stat) => (
                <StatBar
                  key={stat.label}
                  label={stat.label}
                  percentage={stat.percentage}
                />
              ))}
            </div>

            {/* Model Philosophy Description */}
            <p className={`${ty.bodyMd} text-[16px] md:text-[18px] text-body`}>
              {col.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
