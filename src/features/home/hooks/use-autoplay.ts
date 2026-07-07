/**
 * @file src/features/home/hooks/use-autoplay.ts
 * @description custom react hook for high-performance requestAnimationFrame loop control.
 */

import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (!isActive) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setElapsedTime((prev) => {
        const next = prev + delta;
        return next >= interval ? interval : next;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, interval]);

  useEffect(() => {
    if (elapsedTime >= interval) {
      onIntervalComplete();
      setElapsedTime(0);
    }
  }, [elapsedTime, interval, onIntervalComplete]);

  const resetAutoplay = () => {
    setElapsedTime(0);
  };

  return { elapsedTime, resetAutoplay };
}
