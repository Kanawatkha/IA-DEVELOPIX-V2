/**
 * @file src/features/home/hooks/use-swipe.ts
 * @description Decoupled touch guesture hook to manage coordinate tracking and swipe events.
 */

import React, { useState } from "react";

interface SwipeCallbacks {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onTouchStartTrigger?: () => void;
  onTouchEndTrigger?: () => void;
  minSwipeDistance?: number;
}

/**
 * Tracks touch coordinate vectors on screen layouts.
 * Resolves triggers for left/right swipes when distances exceed thresholds.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onTouchStartTrigger,
  onTouchEndTrigger,
  minSwipeDistance = 50,
}: SwipeCallbacks) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    if (onTouchStartTrigger) onTouchStartTrigger();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (onTouchEndTrigger) onTouchEndTrigger();
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
