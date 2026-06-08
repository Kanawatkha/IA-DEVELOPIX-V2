/**
 * @file src/components/ui/laurel-award.tsx
 * @description Laurel wreath and competition rank award visualizer.
 *              Styled to adhere to the strict, premium Bugatti Design System.
 */

'use client';

import React from 'react';
import { AwardData } from '@/src/types/home';

interface LaurelBranchLeftProps {
  className?: string;
}

/**
 * Procedural Bezier curve SVG renderer representing one half of the laurel wreath branch.
 * Generates organically scaled leaf pairs along a mathematically defined trajectory.
 */
export const LaurelBranchLeft: React.FC<LaurelBranchLeftProps> = ({ className }) => {
  // Bezier curve control coordinates optimizing wreath curviness.
  const p0 = { x: 135, y: 310 }; 
  const p1 = { x: -10, y: 160 }; 
  const p2 = { x: 115, y: 10 };  

  // Computes absolute coordinate points along the quadratic Bezier track.
  const getPoint = (t: number) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
  });

  // Calculates the tangent angle at any parameter 't' to rotate leaf paths dynamically.
  const getAngle = (t: number) => {
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const leafPairs = [];
  const count = 14; 
  
  for (let i = 0; i < count; i++) {
    const t = (i / (count - 1)) * 0.95; 
    const point = getPoint(t);
    const angle = getAngle(t);
    const scale = 0.4 + Math.sin(t * Math.PI * 0.9) * 0.55;
    
    leafPairs.push({ x: point.x, y: point.y, baseAngle: angle, scale });
  }

  const leafPath = "M 0,0 C -13,-12 -13,-38 0,-55 C 13,-38 13,-12 0,0 Z";

  return (
    <svg 
      viewBox="0 0 160 320" 
      fill="currentColor" 
      className={`overflow-visible ${className || ''}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path 
        d={`M ${p0.x},${p0.y} Q ${p1.x},${p1.y} ${p2.x},${p2.y}`} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      
      <path
        d={leafPath}
        transform={`translate(${p2.x}, ${p2.y}) rotate(${getAngle(1) + 90}) scale(0.7)`}
      />

      {leafPairs.map((leaf, i) => {
        const dirAngle = leaf.baseAngle + 90;
        return (
          <g key={i}>
            <path
              d={leafPath}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${dirAngle - 55}) scale(${leaf.scale})`}
            />
            <path
              d={leafPath}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${dirAngle + 45}) scale(${leaf.scale * 0.8})`}
            />
          </g>
        );
      })}
    </svg>
  );
};

interface LaurelAwardProps {
  award: AwardData;
}

/**
 * Renders an official international victory medallion flanked by organic laurel branches.
 * Standardizes sizes, scales typography, and applies luxury thematic gold accents.
 */
export const LaurelAward: React.FC<LaurelAwardProps> = ({ award }) => {
  const isGold = award.isGold;
  const textColorPrimary = isGold ? 'text-[#FFD700]' : 'text-white';
  const textColorSecondary = isGold ? 'text-[#FFD700]/90' : 'text-gray-300';
  const shadowClass = isGold ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'drop-shadow-sm';
  const dividerClass = isGold ? 'bg-[#FFD700]' : 'bg-white';

  const sizeStyles = {
    lg: {
      containerW: 'w-[136px] sm:w-[180px] md:w-[200px] lg:w-[160px] xl:w-[210px] 2xl:w-[20.5vw]', 
      branchW: 'w-[38px] sm:w-[52px] md:w-[58px] lg:w-[46px] xl:w-[64px] 2xl:w-[6.2vw] max-md:w-[25%]',
      contentW: 'w-[58px] sm:w-[76px] md:w-[84px] lg:w-[70px] xl:w-[80px] 2xl:w-[8vw] max-md:w-[48%]',
      rankText: 'text-3xl sm:text-4xl md:text-5xl lg:text-[2rem] xl:text-4xl 2xl:text-[5vw]',
      ordinalText: 'text-xs sm:text-lg md:text-xl lg:text-base xl:text-xl 2xl:text-[2.6vw]',
      categoryText: 'text-[5.5px] sm:text-[7.5px] md:text-[9px] lg:text-[6px] xl:text-[7px] 2xl:text-[0.9vw]',
      eventText: 'text-[4.5px] sm:text-[5.5px] md:text-[7px] lg:text-[4.5px] xl:text-[5.5px] 2xl:text-[0.7vw]',
      yearText: 'text-[7px] sm:text-[9.5px] md:text-xs lg:text-[8px] xl:text-[10px] 2xl:text-[1.1vw]',
    },
    md: {
      containerW: 'w-[124px] sm:w-[140px] md:w-[160px] lg:w-[130px] xl:w-[150px] 2xl:w-[12vw] max-md:w-full', 
      branchW: 'w-[34px] sm:w-[40px] md:w-[46px] lg:w-[38px] xl:w-[44px] 2xl:w-[3.5vw]',
      contentW: 'w-[54px] sm:w-[60px] md:w-[68px] lg:w-[58px] xl:w-[66px] 2xl:w-[6vw]',
      rankText: 'text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-[2rem] 2xl:text-[3vw]',
      ordinalText: 'text-[10px] sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-[1.3vw]',
      categoryText: 'text-[5px] sm:text-[6.5px] md:text-[8px] lg:text-[5px] xl:text-[6.5px] 2xl:text-[0.7vw]',
      eventText: 'text-[4px] sm:text-[4.5px] md:text-[6px] lg:text-[4px] xl:text-[5px] 2xl:text-[0.45vw]',
      yearText: 'text-[6.5px] sm:text-[8px] md:text-[10px] lg:text-[7px] xl:text-[9px] 2xl:text-[0.9vw]',
    },
    sm: {
      containerW: 'w-[136px] sm:w-[120px] md:w-[140px] lg:w-[130px] xl:w-[150px] 2xl:w-[11vw] max-md:w-auto', 
      branchW: 'w-[38px] sm:w-[34px] md:w-[40px] lg:w-[38px] xl:w-[44px] 2xl:w-[3vw] max-md:w-[23px]',
      contentW: 'w-[58px] sm:w-[52px] md:w-[60px] lg:w-[58px] xl:w-[66px] 2xl:w-[4.8vw] max-md:w-[40px]',
      rankText: 'text-[1.75rem] sm:text-[1.6rem] md:text-3xl lg:text-[1.75rem] xl:text-3xl 2xl:text-[2.3vw] max-md:text-lg',
      ordinalText: 'text-xs sm:text-[11px] md:text-sm lg:text-xs xl:text-sm 2xl:text-[1.3vw] max-md:text-[8px]',
      categoryText: 'text-[5.5px] sm:text-[5px] md:text-[7px] lg:text-[5.5px] xl:text-[6.5px] 2xl:text-[0.5vw] max-md:text-[3.5px]',
      eventText: 'text-[4.5px] sm:text-[4px] md:text-[5px] lg:text-[4.5px] xl:text-[5px] 2xl:text-[0.4vw] max-md:text-[2.5px]',
      yearText: 'text-[7.5px] sm:text-[7px] md:text-[9px] lg:text-[7.5px] xl:text-[9px] 2xl:text-[0.8vw] max-md:text-[4px]',
    }
  };

  const style = sizeStyles[award.size] || sizeStyles.sm;

  return (
    <div className={`flex justify-between items-center ${style.containerW} relative mx-auto px-1 overflow-visible`}>
      <LaurelBranchLeft className={`${style.branchW} h-auto ${textColorPrimary} flex-shrink-0 ${shadowClass}`} />
      
      <div className={`flex flex-col items-center text-center justify-center ${style.contentW} flex-shrink-0 z-10`}>
        <div className={`flex items-start justify-center ${textColorPrimary} mb-0 lg:mb-0.5 ${shadowClass}`}>
          <span className={`${style.rankText} font-normal leading-none italic tracking-normal`}>
            {award.rank}
          </span>
          <span className={`${style.ordinalText} font-normal leading-none mt-0.5 xl:mt-1 ml-1.5 xl:ml-2 2xl:ml-3 italic`}>
            {award.ordinal}
          </span>
        </div>
        
        <div className={`w-[90%] h-[1px] xl:h-[1.5px] ${dividerClass} my-0.5 lg:my-1 opacity-90 ${shadowClass}`}></div>
        
        <h4 className={`${style.categoryText} ${textColorPrimary} font-normal tracking-[2px] w-full uppercase ${shadowClass}`}>
          {award.category}
        </h4>
        <p className={`${style.eventText} ${textColorSecondary} uppercase tracking-[2px] mt-0.5 xl:mt-0.5 2xl:mt-1 whitespace-pre-line leading-tight font-normal ${shadowClass}`}>
          {award.event}
        </p>
        
        <p className={`${style.yearText} ${textColorPrimary} font-normal tracking-[2px] mt-1 xl:mt-1 2xl:mt-2 ${shadowClass}`}>
          {award.year}
        </p>
      </div>

      <LaurelBranchLeft className={`${style.branchW} h-auto ${textColorPrimary} transform scale-x-[-1] flex-shrink-0 ${shadowClass}`} />
    </div>
  );
};
