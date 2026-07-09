/**
 * @file use-store-hero.ts
 * @description Hook managing state, coordinates, and seamless infinite loops for StoreHero using pre-emptive wraps.
 */

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { HeroCategory } from '../types';

export function useStoreHero(categories: HeroCategory[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Slide index and hover states, initialized to Copy 2 LINEFOLLOWER (index 4)
  const [activeIndex, setActiveIndex] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAnimationRef = useRef<any>(null);

  // Framer Motion direct DOM value controller, initialized to -328vw to align index 4 immediately on mount
  const mvX = useMotionValue<number | string>('-328vw');

  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    childWidth: 0,
    gap: 16,
  });

  // Replicate categories array to build an infinite virtual sliding track of 3 segments (12 slides)
  const extendedCategories = useMemo(() => {
    if (categories.length === 0) return [];
    return Array(3).fill(categories).flat();
  }, [categories]);

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

  const baseOffset = useMemo(() => getBaseOffset(activeIndex), [activeIndex, getBaseOffset]);

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

  // Position initial slide index statically on mount
  const isInitialized = useRef(false);
  useEffect(() => {
    if (dimensions.containerWidth > 0 && dimensions.childWidth > 0 && !isInitialized.current) {
      const targetPos = getBaseOffset(activeIndex);
      mvX.set(targetPos);
      isInitialized.current = true;
    }
  }, [dimensions, activeIndex, getBaseOffset, mvX]);

  // Programmatic slide transition animator with strict clamping and silent pre-emptive boundary wraps
  const animateToIdx = useCallback((targetIndex: number, useSpring: boolean = true) => {
    if (currentAnimationRef.current) {
      currentAnimationRef.current.stop();
    }

    const N = categories.length;
    let currentIdx = activeIndex;
    let adjustedTargetIdx = targetIndex;

    if (N > 0 && dimensions.childWidth > 0) {
      const offsetDiff = N * (dimensions.childWidth + dimensions.gap);
      const currentVal = typeof mvX.get() === 'string' ? parseFloat(mvX.get() as string) : (mvX.get() as number);

      // Pre-emptive loop warping based on the current position to support rapid continuous swiping
      if (currentIdx >= 2 * N) {
        currentIdx = currentIdx - N;
        mvX.set(currentVal + offsetDiff);
        adjustedTargetIdx = adjustedTargetIdx - N;
      } else if (currentIdx < N) {
        currentIdx = currentIdx + N;
        mvX.set(currentVal - offsetDiff);
        adjustedTargetIdx = adjustedTargetIdx + N;
      }
    }

    const maxIdx = extendedCategories.length - 1;
    const clampedIndex = Math.max(0, Math.min(adjustedTargetIdx, maxIdx));
    setActiveIndex(clampedIndex);

    const targetPos = getBaseOffset(clampedIndex);
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
  }, [getBaseOffset, mvX, extendedCategories.length, categories.length, activeIndex, dimensions]);

  const handleNextSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    const nextIdx = activeIndex + 1;
    animateToIdx(nextIdx, true);
  }, [extendedCategories.length, activeIndex, animateToIdx]);

  const handlePrevSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    const prevIdx = activeIndex - 1;
    animateToIdx(prevIdx, true);
  }, [extendedCategories.length, activeIndex, animateToIdx]);

  const handleDotClickWrapper = useCallback((targetOriginalIndex: number) => {
    if (categories.length === 0 || extendedCategories.length === 0) return;
    
    // Slide to the nearest copy representing the clicked dot category
    const currentCopy = Math.floor(activeIndex / categories.length);
    const targetIdx = currentCopy * categories.length + targetOriginalIndex;
    
    animateToIdx(targetIdx, true);
  }, [categories.length, extendedCategories.length, activeIndex, animateToIdx]);

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
    if (e.button !== 0) return; // Process primary left-clicks only
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
    const currentVal = typeof mvX.get() === 'string' ? parseFloat(mvX.get() as string) : (mvX.get() as number);
    mvX.set(baseOffset + walk);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsHovered(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const currentX = e.clientX;
    const walk = currentX - startX.current;
    const threshold = 80;

    let targetIdx = activeIndex;
    if (walk < -threshold) {
      targetIdx = activeIndex + 1;
    } else if (walk > threshold) {
      targetIdx = activeIndex - 1;
    }

    animateToIdx(targetIdx, true);
    resetInterval();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsHovered(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    animateToIdx(activeIndex, true);
    resetInterval();
  };

  return {
    containerRef,
    activeIndex,
    extendedCategories,
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
