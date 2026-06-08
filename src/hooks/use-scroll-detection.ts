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
export function useScrollDetection(bottomThresholdBuffer: number = 250): ScrollData {
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

      setScrollData((prev) => {
        // Calculate scroll direction with a 10px buffer to prevent jittering
        let direction = prev.scrollDirection;
        if (Math.abs(currentScrollY - lastScrollY) >= 10) {
          direction = currentScrollY > lastScrollY ? "down" : "up";
        }

        // Detect if viewport is at or near the bottom boundary
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
