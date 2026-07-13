/**
 * @file src/features/home/hooks/use-autoplay.ts
 * @description custom react hook for high-performance requestAnimationFrame loop control.
 */

import { useState, useEffect, useRef } from "react";

interface AutoplayConfig {
  interval: number;
  isActive: boolean;
  onIntervalComplete: () => void;
}

/**
 * High performance game-loop ticker hook utilizing requestAnimationFrame.
 * Automatically runs tick updates when active and resets on index changes.
 */
export function useAutoplay({ interval, isActive, onIntervalComplete }: AutoplayConfig) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const next = elapsedTimeRef.current + delta;
      if (next >= interval) {
        elapsedTimeRef.current = 0;
        setElapsedTime(0);
        onIntervalComplete();
      } else {
        elapsedTimeRef.current = next;
        setElapsedTime(next);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, interval, onIntervalComplete]);

  const resetAutoplay = () => {
    elapsedTimeRef.current = 0;
    setElapsedTime(0);
  };

  return { elapsedTime, resetAutoplay };
}
