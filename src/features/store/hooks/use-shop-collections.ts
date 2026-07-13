/**
 * @file use-shop-collections.ts
 * @description Hook managing filter active states, side-scrolling arrows, and viewport offsets in ShopCollections.
 */

import { useRef, useState, useEffect } from 'react';
import { type FilterValue, SHOP_MODELS } from '@/src/lib/data/products';

export function useShopCollections(defaultFilter: FilterValue = 'ALL') {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(defaultFilter);
  const [hasInteracted, setHasInteracted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile scroll shadows state tracker
  const [shadowLeft, setShadowLeft] = useState(false);
  const [shadowRight, setShadowRight] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    setShadowLeft(t.scrollLeft > 0);
    setShadowRight(Math.ceil(t.scrollLeft + t.clientWidth) < t.scrollWidth);
  };

  // Reset scroll tracks back to zero on filter change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  const scrollCards = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const handleFilterClick = (filter: FilterValue) => {
    setActiveFilter(filter);
    setHasInteracted(true);

    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const targetY =
          window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2 - 20;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  };

  const filteredModels = SHOP_MODELS.filter(
    (m) => activeFilter === 'ALL' || m.categoryLabel === activeFilter
  );

  return {
    activeFilter,
    scrollContainerRef,
    sectionRef,
    shadowLeft,
    shadowRight,
    filteredModels,
    hasInteracted,
    handleScroll,
    scrollCards,
    handleFilterClick,
  };
}
