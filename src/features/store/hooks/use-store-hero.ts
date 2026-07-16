"use client";

/**
 * @file use-store-hero.ts
 * @description Hook managing state, coordinates, and seamless infinite loops for StoreHero using a conveyor belt concept.
 */

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { CATEGORIES } from '@/src/lib/data/products';
import { HeroCategory } from '../types';

export function useStoreHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    return CATEGORIES.map((cat, index) => ({
      id: index + 1,
      name: cat.name,
      isComingSoon: cat.isComingSoon,
      image: cat.image,
    }));
  }, []);
  
  // Continuous virtual index representing the scroll target (infinite in both directions)
  const [virtualActiveIndex, setVirtualActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAnimationRef = useRef<any>(null);

  // Computed visual index for dots indicator and general highlight states
  const activeIndex = useMemo(() => {
    const N = categories.length;
    if (N === 0) return 0;
    return (virtualActiveIndex % N + N) % N;
  }, [virtualActiveIndex, categories.length]);

  // Framer Motion direct DOM value controller, initialized to 0px on mount
  const mvX = useMotionValue<number | string>(0);

  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    childWidth: 0,
    gap: 16,
  });

  // Categories are mapped exactly 1:1, layout positioning wraps them using CSS transforms on the fly
  const extendedCategories = categories;

  // Read track size properties dynamically for centering calculations
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const track = containerRef.current.children[0] as HTMLElement;
      const child = track?.children[0] as HTMLElement;
      if (child) {
        const childWidth = child.clientWidth;
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.columnGap || style.gap || '16', 10) || 16;
        setDimensions({ containerWidth, childWidth, gap });
      }
    }
  }, []);

  // Compute coordinate offset for centering an index
  const getBaseOffset = useCallback((index: number) => {
    if (dimensions.containerWidth === 0 || dimensions.childWidth === 0) return 0;
    return (
      (dimensions.containerWidth - dimensions.childWidth) / 2 -
      index * (dimensions.childWidth + dimensions.gap)
    );
  }, [dimensions]);

  const baseOffset = useMemo(() => getBaseOffset(virtualActiveIndex), [virtualActiveIndex, getBaseOffset]);

  // Update track dimensions dynamically on resize
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const id = setTimeout(updateDimensions, 100);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(id);
    };
  }, [updateDimensions, extendedCategories.length]);

  // Keep track of virtualActiveIndex with a ref to avoid triggering centering effect on index changes
  const activeIndexRef = useRef(virtualActiveIndex);
  useEffect(() => {
    activeIndexRef.current = virtualActiveIndex;
  }, [virtualActiveIndex]);

  // Position initial slide index statically on mount and keep centered on dimensions resize
  const isInitialized = useRef(false);
  useEffect(() => {
    if (dimensions.containerWidth > 0 && dimensions.childWidth > 0) {
      const targetPos = getBaseOffset(activeIndexRef.current);
      mvX.set(targetPos);
      isInitialized.current = true;
    }
  }, [dimensions, getBaseOffset, mvX]);

  // Programmatic slide transition animator
  const animateToIdx = useCallback((targetIndex: number, useSpring: boolean = true) => {
    if (currentAnimationRef.current) {
      currentAnimationRef.current.stop();
    }

    const N = categories.length;
    if (N === 0) return;

    setVirtualActiveIndex(targetIndex);
    const targetPos = getBaseOffset(targetIndex);

    if (!useSpring) {
      mvX.set(targetPos);
      return;
    }

    currentAnimationRef.current = animate(mvX, targetPos, {
      type: 'spring' as const,
      stiffness: 260,
      damping: 28,
      mass: 1,
    });
  }, [getBaseOffset, mvX, categories.length]);

  const handleNextSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    const nextIdx = virtualActiveIndex + 1;
    animateToIdx(nextIdx, true);
  }, [extendedCategories.length, virtualActiveIndex, animateToIdx]);

  const handlePrevSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    const prevIdx = virtualActiveIndex - 1;
    animateToIdx(prevIdx, true);
  }, [extendedCategories.length, virtualActiveIndex, animateToIdx]);

  const handleDotClickWrapper = useCallback((targetOriginalIndex: number) => {
    const N = categories.length;
    if (N === 0 || extendedCategories.length === 0) return;
    
    // Find the shortest distance virtual target index that maps to the selected original index
    const currentIdx = virtualActiveIndex;
    const diff = ((targetOriginalIndex - (currentIdx % N)) % N + N) % N;
    const shift = diff > N / 2 ? diff - N : diff;
    const targetIdx = currentIdx + shift;
    
    animateToIdx(targetIdx, true);
  }, [categories.length, extendedCategories.length, virtualActiveIndex, animateToIdx]);

  // Autoplay intervals setup
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = useCallback(() => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }
    if (isHovered || isDragging.current) {
      return;
    }
    autoRotateInterval.current = setInterval(() => {
      if (document.hidden) return;
      handleNextSlide();
    }, 6000);
  }, [isHovered, handleNextSlide]);

  useEffect(() => {
    resetInterval();
    const handleVisibilityChange = () => {
      if (!document.hidden) resetInterval();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetInterval]);

  const handleNextWithReset = useCallback(() => {
    handleNextSlide();
    resetInterval();
  }, [handleNextSlide, resetInterval]);

  const handlePrevWithReset = useCallback(() => {
    handlePrevSlide();
    resetInterval();
  }, [handlePrevSlide, resetInterval]);

  const handleDotClickWithReset = useCallback((idx: number) => {
    handleDotClickWrapper(idx);
    resetInterval();
  }, [handleDotClickWrapper, resetInterval]);

  // Pointer dragging event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    if (currentAnimationRef.current) {
      currentAnimationRef.current.stop();
    }

    isDragging.current = true;
    startX.current = e.clientX;
    setIsHovered(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const walk = e.clientX - startX.current;
    const baseOffset = getBaseOffset(virtualActiveIndex);
    mvX.set(baseOffset + walk);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsHovered(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const walk = e.clientX - startX.current;
    const threshold = 80;

    let targetIdx = virtualActiveIndex;
    if (walk < -threshold) {
      targetIdx = virtualActiveIndex + 1;
    } else if (walk > threshold) {
      targetIdx = virtualActiveIndex - 1;
    }

    animateToIdx(targetIdx, true);
    resetInterval();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsHovered(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    animateToIdx(virtualActiveIndex, true);
    resetInterval();
  };

  return {
    containerRef,
    activeIndex,
    extendedCategories,
    categories,
    mvX,
    handleNextSlide: handleNextWithReset,
    handlePrevSlide: handlePrevWithReset,
    handleDotClickWrapper: handleDotClickWithReset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    isHovered,
    dimensions,
  };
}
