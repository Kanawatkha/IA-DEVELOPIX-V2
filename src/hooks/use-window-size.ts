import { useState, useEffect } from "react";

/**
 * Custom hook to detect window dimensions and responsiveness boundaries.
 * Optimized with server-safe checks to prevent compilation hydration mismatches in Next.js SSR.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Only execute on browser environment
    if (typeof window === "undefined") return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = typeof windowSize.width === "number" ? windowSize.width < 768 : false;
  const isTablet = typeof windowSize.width === "number" ? windowSize.width >= 768 && windowSize.width < 1025 : false;
  const isDesktop = typeof windowSize.width === "number" ? windowSize.width >= 1025 : true;

  return { ...windowSize, isMobile, isTablet, isDesktop };
}
