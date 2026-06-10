'use client';

/**
 * @file series-lineup.tsx
 * @description Standardized product series catalog display grid. Dynamically maps
 *              product groups (e.g., NOFAN or FANPULL) and showcases responsive comparative
 *              product block lineups aligned with Bugatti Design standards.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';
import { ProductBlock } from './product-block';
import { SeriesItem } from '@/src/features/products/types/Category';

interface SeriesLineupProps {
  series: SeriesItem[];
}

export function SeriesLineup({ series }: SeriesLineupProps) {
  if (!series || series.length === 0) {
    return null;
  }

  return (
    <>
      {series.map((group, index) => {
        const hasVisibleTitle = group.name && group.name.trim().length > 0;
        
        return (
          <motion.section
            key={group.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={parentVariants}
            className={`w-full max-w-[1720px] min-[2000px]:max-w-[2300px] mx-auto px-6 md:px-12 lg:px-20 min-[2000px]:px-16 py-10 md:py-12 ${
              index > 0 ? 'border-t border-hairline' : ''
            }`}
          >
            {hasVisibleTitle && (
              <motion.h2
                variants={childVariants}
                className={`${ty.displayLg} text-[48px] md:text-[72px] lg:text-[96px] text-primary mb-6 md:mb-8 flex flex-wrap items-baseline gap-2`}
              >
                {group.name}
                {group.isComingSoon && (
                  <span className="font-mono text-[14px] md:text-[16px] text-muted tracking-normal normal-case font-normal">
                    (Coming soon)
                  </span>
                )}
              </motion.h2>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 ${
              !hasVisibleTitle ? 'pt-2' : ''
            }`}>
              {group.models.map((model, idx) => (
                <motion.div
                  key={model.id}
                  variants={childVariants}
                  className={`pb-10 md:pb-0 md:pr-8 lg:pr-16 border-b md:border-b-0 border-hairline ${
                    idx % 2 === 1 ? 'pt-10 md:pt-0 md:pl-8 lg:pl-16 md:border-l' : ''
                  }`}
                >
                  <ProductBlock
                    title={model.name}
                    size={model.size}
                    price={model.price}
                    link={model.link}
                    isComingSoon={model.isComingSoon || group.isComingSoon}
                    showCmLabel={model.showCmLabel}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </>
  );
}
