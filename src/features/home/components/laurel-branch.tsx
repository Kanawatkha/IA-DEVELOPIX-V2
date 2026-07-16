/**
 * @file src/features/home/components/laurel-branch.tsx
 * @description Procedural SVG laurel wreath branch component.
 */

import React from 'react';

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
