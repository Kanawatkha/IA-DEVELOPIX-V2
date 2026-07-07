/**
 * @file src/features/home/types/index.ts
 * @description Centralized prop interfaces and types for the Home feature module.
 */

import { AwardData } from "@/src/types/home";

/**
 * Prop interface for rendering individual laurel award medallions.
 */
export interface LaurelAwardProps {
  award: AwardData;
}
