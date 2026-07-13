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

import { LaurelAwardProps } from '../types';

/**
 * Renders an official international victory medallion flanked by organic laurel branches.
 * Standardizes sizes, scales typography, and applies luxury thematic gold accents.
 */
export const LaurelAward: React.FC<LaurelAwardProps> = ({ award }) => {
  const isGold = award.isGold;
  const textColorPrimary = isGold ? 'text-award-gold' : 'text-primary';
  const textColorSecondary = isGold ? 'text-award-gold/90' : 'text-body';
  const shadowClass = '';
  const dividerClass = isGold ? 'bg-award-gold' : 'bg-primary';

  const sizeStyles = {
    lg: {
      containerW: 'w-[136px] sm:w-[180px] md:w-[200px] lg:w-[184px] xl:w-[242px] 2xl:w-[280px] min-[2000px]:w-[380px]', 
      branchW: 'w-[38px] sm:w-[52px] md:w-[58px] lg:w-[53px] xl:w-[74px] 2xl:w-[82px] min-[2000px]:w-[110px] max-md:w-[25%]',
      contentW: 'w-[58px] sm:w-[76px] md:w-[84px] lg:w-[80px] xl:w-[92px] 2xl:w-[110px] min-[2000px]:w-[150px] max-md:w-[48%]',
      rankText: 'text-3xl sm:text-4xl md:text-5xl lg:text-[2.3rem] xl:text-[2.9rem] 2xl:text-[3.2rem] min-[2000px]:text-[4.2rem]',
      ordinalText: 'text-xs sm:text-lg md:text-xl lg:text-[1.15rem] xl:text-[1.4rem] 2xl:text-[1.5rem] min-[2000px]:text-[2rem]',
      categoryText: 'text-[5.5px] sm:text-[7.5px] md:text-[9px] lg:text-[7px] xl:text-[8px] 2xl:text-[9.5px] min-[2000px]:text-[13px]',
      eventText: 'text-[4.5px] sm:text-[5.5px] md:text-[7px] lg:text-[5.2px] xl:text-[6.3px] 2xl:text-[7.2px] min-[2000px]:text-[10px]',
      yearText: 'text-[7px] sm:text-[9.5px] md:text-xs lg:text-[9.2px] xl:text-[11.5px] 2xl:text-[13px] min-[2000px]:text-[18px]',
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
      containerW: 'w-[136px] sm:w-[120px] md:w-[140px] lg:w-[150px] xl:w-[172px] 2xl:w-[200px] min-[2000px]:w-[275px] max-md:w-auto', 
      branchW: 'w-[38px] sm:w-[34px] md:w-[40px] lg:w-[44px] xl:w-[50px] 2xl:w-[58px] min-[2000px]:w-[80px] max-md:w-[23px]',
      contentW: 'w-[58px] sm:w-[52px] md:w-[60px] lg:w-[67px] xl:w-[76px] 2xl:w-[88px] min-[2000px]:w-[120px] max-md:w-[40px]',
      rankText: 'text-[1.75rem] sm:text-[1.6rem] md:text-3xl lg:text-[2.05rem] xl:text-[2.2rem] 2xl:text-[2.5rem] min-[2000px]:text-[3.2rem] max-md:text-lg',
      ordinalText: 'text-xs sm:text-[11px] md:text-sm lg:text-[14px] xl:text-[16px] 2xl:text-[18px] min-[2000px]:text-[24px] max-md:text-[8px]',
      categoryText: 'text-[5.5px] sm:text-[5px] md:text-[7px] lg:text-[6.3px] xl:text-[7.5px] 2xl:text-[8.5px] min-[2000px]:text-[11.5px] max-md:text-[3.5px]',
      eventText: 'text-[4.5px] sm:text-[4px] md:text-[5px] lg:text-[5.2px] xl:text-[5.8px] 2xl:text-[6.5px] min-[2000px]:text-[9px] max-md:text-[2.5px]',
      yearText: 'text-[7.5px] sm:text-[7px] md:text-[9px] lg:text-[8.6px] xl:text-[10.4px] 2xl:text-[12px] min-[2000px]:text-[16.5px] max-md:text-[4px]',
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
