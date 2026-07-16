'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  scrollIndicatorInitial,
  scrollIndicatorAnimate,
  scrollIndicatorTransition,
} from '@/src/lib/design/variants';

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <motion.div
        initial={scrollIndicatorInitial}
        animate={scrollIndicatorAnimate}
        transition={scrollIndicatorTransition}
        className="flex flex-col items-center text-muted"
      >
        <ChevronDown strokeWidth={1} className="w-8 h-8 opacity-70 text-muted" />
      </motion.div>
    </div>
  );
}
