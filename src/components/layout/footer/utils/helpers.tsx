/**
 * @file src/components/layout/footer/utils/helpers.tsx
 * @description Centralized pure rendering helpers and label processors for the Footer module.
 */

import React from "react";
import { formatModelName, isModelComingSoon, CATEGORIES } from "@/src/lib/data/products";

/**
 * Parses and processes link labels for display inside Footer lists.
 * Appends (COMING SOON) sub-labels dynamically for unreleased categories/models.
 */
export const renderFooterLinkLabel = (label: string) => {
  const isComingSoon = (() => {
    const labelUpper = label.toUpperCase();
    const categoryMatch = CATEGORIES.find(c => c.name.toUpperCase() === labelUpper);
    if (categoryMatch) {
      return categoryMatch.isComingSoon;
    }
    return isModelComingSoon(label);
  })();

  if (isComingSoon) {
    return (
      <div className="flex flex-row items-center gap-1.5 whitespace-nowrap md:flex-col md:items-start md:gap-0 md:whitespace-normal lg:flex-row lg:items-center lg:gap-1.5 lg:whitespace-nowrap">
        <span className="leading-tight text-[13px]">{formatModelName(label)}</span>
        <span className="text-[13px] md:text-[9px] text-primary/40 tracking-widest font-normal">
          (COMING SOON)
        </span>
      </div>
    );
  }

  return formatModelName(label);
};
