/**
 * @file animated-price.tsx
 * @description Rolling digits animation component for cart subtotals and item pricing.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPriceProps {
  value: number;
  className?: string;
}

export function AnimatedPrice({ value, className = "font-mono text-lg uppercase text-primary font-bold" }: AnimatedPriceProps) {
  const formatPriceString = (amount: number) => {
    return `฿${amount.toLocaleString()} THB`;
  };

  const priceStr = formatPriceString(value);
  const chars = priceStr.split("");

  return (
    <span className={`${className} inline-flex items-center h-[1.5em] overflow-hidden`}>
      {chars.map((char, index) => {
        const isDigit = /\d/.test(char);
        if (!isDigit) {
          return (
            <span key={index} className="inline-block whitespace-pre">
              {char}
            </span>
          );
        }

        const digit = parseInt(char, 10);

        return (
          <span
            key={index}
            className="relative inline-block w-[0.62em] h-[1.5em] overflow-hidden"
            style={{ verticalAlign: "bottom" }}
          >
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: `-${digit * 10}%` }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                mass: 0.8,
              }}
              className="absolute left-0 top-0 flex flex-col w-full h-[1000%]"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span
                  key={num}
                  className="h-[10%] flex items-center justify-center font-mono"
                  style={{ height: "1.5em", lineHeight: "1.5em" }}
                >
                  {num}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
