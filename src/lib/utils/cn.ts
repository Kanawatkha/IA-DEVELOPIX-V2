/**
 * @file src/lib/utils/cn.ts
 * @description Safe Tailwind CSS class merger.
 *
 * Combines clsx (conditional class logic) with tailwind-merge
 * (deduplication of conflicting Tailwind utilities) so components
 * can accept and extend className props without style conflicts.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-white', className)
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
