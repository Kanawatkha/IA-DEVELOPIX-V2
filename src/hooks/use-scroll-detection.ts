import { useState, useEffect } from "react";

interface ScrollData {
  scrollDirection: "up" | "down";
  isAtBottom: boolean;
  scrollY: number;
}

/**
 * Custom stateful hook for scroll tracking and environment state reconciliation.
 * Encapsulates direction checks ('up' | 'down'), viewport vertical layout Y height, 
 * and bottom distance threshold detection. Optimized via requestAnimationFrame throttling.
 */
export function useScrollDetection(bottomThresholdBuffer: number = 20): ScrollData {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollDirection: "up",
    isAtBottom: false,
    scrollY: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.pageYOffset;

      // Accumulate scroll delta with a minimal 2px buffer to prevent jittering
      if (Math.abs(currentScrollY - lastScrollY) < 2) {
        ticking = false;
        return;
      }

      setScrollData((prev) => {
        const direction = currentScrollY > lastScrollY ? "down" : "up";
        const isBottom = Math.ceil(window.innerHeight + currentScrollY) >= document.documentElement.scrollHeight - bottomThresholdBuffer;

        return {
          scrollDirection: direction,
          isAtBottom: isBottom,
          scrollY: currentScrollY > 0 ? currentScrollY : 0,
        };
      });

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial calculation
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bottomThresholdBuffer]);

  return scrollData;
}
