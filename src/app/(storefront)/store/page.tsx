/**
 * @file store/page.tsx
 * @description Master Storefront portal. Standardized to import lean atomic
 *              logical subcomponents, keeping the workspace highly maintainable.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShopCollections, StoreHero } from '@/src/features/store';
import { PartsSection } from '@/src/features/products';
import { CATEGORIES } from '@/src/lib/data/products';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';

export default function StorePage() {
  const heroCategories = CATEGORIES.map((cat, index) => ({
    id: index + 1,
    name: cat.name,
    isComingSoon: cat.isComingSoon,
    image: cat.image,
  }));

  return (
    <div>
      {/* SECTION 1: HERO CATEGORIES CAROUSEL */}
      <StoreHero categories={heroCategories} />

      {/* SECTION 2: INFO TEXT BLOCK */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={parentVariants}
        className="w-full py-12 md:py-16 px-6 md:px-12 flex justify-center items-center bg-canvas"
      >
        <div className="max-w-[1000px] min-[2000px]:max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <motion.h2
            variants={childVariants}
            className={`${ty.displayLg} text-4xl md:text-[60px] min-[2000px]:text-[100px] text-primary mb-8 md:mb-12`}
          >
            ENGINEERED FOR THE PINNACLE OF ROBOTICS
          </motion.h2>
          <motion.p
            variants={childVariants}
            className={`${ty.bodyMd} text-[16px] md:text-[20px] min-[2000px]:text-2xl text-muted mb-12 md:mb-16 max-w-[800px] min-[2000px]:max-w-[1000px]`}
          >
            Every platform we build is rooted in our core philosophy of uncompromising performance.
            From micro-controllers to chassis architecture, every element is designed to push the boundaries
            of what is possible in autonomous tactical mobility.
          </motion.p>
          <motion.div variants={childVariants}>
            <Link
              href="/about"
              className={`${ty.ctaButton} text-[14px] min-[2000px]:text-lg px-[24px] py-[12px] min-[2000px]:px-10 min-[2000px]:py-4 hover:bg-primary hover:text-canvas`}
            >
              DISCOVER MORE
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 3: SHOP COLLECTIONS */}
      <ShopCollections title="SHOP COLLECTIONS" defaultFilter="ALL" />

      {/* SECTION 4: PARTS & COMPONENTS */}
      <PartsSection />
    </div>
  );
}
