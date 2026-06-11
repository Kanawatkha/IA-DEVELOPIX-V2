'use client';

/**
 * @file stat-bar.tsx
 * @description Animated horizontal performance stat bar.
 *
 * Used in:
 *  - products/linefollower/page.tsx  (PERFORMANCE MATCH-UP section)
 *  - products/mission/page.tsx        (PERFORMANCE MATCH-UP section)
 */

import { motion } from 'framer-motion';
import { EASE } from '@/src/lib/design/variants';

interface StatBarProps {
  label: string;
  percentage: number;
}

export function StatBar({ label, percentage }: StatBarProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted">{label}</span>
        <span className="font-mono text-[11px] text-[#ffffff] tracking-[1px]">{percentage}%</span>
      </div>
      <div className="w-full h-1 bg-hairline relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#ffffff]"
          initial={{ width: '0%' }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: EASE.luxury, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
