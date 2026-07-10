/**
 * @file store/page.tsx
 * @description Master Storefront portal. Standardized to import lean atomic
 *              logical subcomponents, keeping the workspace highly maintainable.
 */

'use client';

import React from 'react';
import { StoreHero, StoreIntro, ShopCollections } from '@/src/features/store';
import { PartsSection } from '@/src/features/products';

export default function StorePage() {
  return (
    <div>
      {/* SECTION 1: HERO CATEGORIES CAROUSEL */}
      <StoreHero />

      {/* SECTION 2: INFO TEXT BLOCK */}
      <StoreIntro />

      {/* SECTION 3: SHOP COLLECTIONS */}
      <ShopCollections title="SHOP COLLECTIONS" defaultFilter="ALL" />

      {/* SECTION 4: PARTS & COMPONENTS */}
      <PartsSection />
    </div>
  );
}
