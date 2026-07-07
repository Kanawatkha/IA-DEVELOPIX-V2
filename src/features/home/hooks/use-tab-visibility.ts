/**
 * @file src/features/home/hooks/use-tab-visibility.ts
 * @description Hook to monitor the visibility status of the active window tab.
 */

import { useState, useEffect } from "react";

/**
 * Tracks window tab visibility states.
 * Listens to document visibility changes to pause loops and save CPU cycles.
 */
export function useTabVisibility() {
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return isTabVisible;
}
