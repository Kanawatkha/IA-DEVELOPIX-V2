'use client';

/**
 * @file src/app/(storefront)/products/mission/page.tsx
 * @description Standardized, orchestrator-driven category portal for MISSION products.
 *              Acts as a declarative coordinator loading modules from standard configurations.
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryConfig } from '@/src/lib/data/categories';
import {
  CategoryHero,
  SeriesLineup,
  PerformanceMatchup,
} from '@/src/features/products';

export default function MissionPage() {
  const config = getCategoryConfig('mission');

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

      {/* SECTION 2: THE SERIES CATALOG */}
      <SeriesLineup series={config.series} />

      {/* SECTION 3: PERFORMANCE MATCH-UP COMPARISON */}
      {config.performanceMatchup && (
        <PerformanceMatchup
          title={config.performanceMatchup.title}
          comparisons={config.performanceMatchup.comparisons}
        />
      )}
      
    </main>
  );
}
