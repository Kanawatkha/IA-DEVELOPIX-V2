'use client';

/**
 * @file product-block.tsx
 * @description Product card used in Category Hub pages (linefollower, mission).
 *              Shows image, name, size, price, and Add to Cart / Order Now buttons.
 *
 * Used in:
 *  - products/linefollower/page.tsx
 *  - products/mission/page.tsx
 */

import Link from 'next/link';

interface ProductBlockProps {
  title: string;
  size: string;
  price: string;
  link: string;
  isComingSoon?: boolean;
  /** Whether to append "CM" label after the size string (linefollower style) */
  showCmLabel?: boolean;
}

export function ProductBlock({
  title,
  size,
  price,
  link,
  isComingSoon = false,
  showCmLabel = false,
}: ProductBlockProps) {
  return (
    <div className="flex flex-col w-full group h-full">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-card mb-6 block rounded-none">
        <Link
          href={isComingSoon ? '#' : link}
          className={`block w-full h-full relative ${isComingSoon ? 'cursor-not-allowed pointer-events-none' : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png"
            alt={`${title} ${size}`}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isComingSoon ? 'blur-lg opacity-60' : 'group-hover:scale-[1.03]'
            }`}
          />
          {isComingSoon && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#000000]/20">
              <span className="bg-[#000000] px-6 py-3 border border-white/20 font-mono text-[11px] text-[#ffffff] uppercase tracking-[2px]">
                COMING SOON
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Top Info Row */}
      <div className="flex justify-between items-end mb-2">
        <h3 className="font-display text-[36px] md:text-[48px] lg:text-[60px] uppercase text-[#ffffff] leading-[1.0] tracking-[3px] font-normal">
          {title} {size}
          {showCmLabel && (
            <span className="font-mono text-[12px] md:text-[14px] text-muted ml-1 md:ml-2 tracking-normal min-w-0">
              CM
            </span>
          )}
        </h3>
        <Link
          href={isComingSoon ? '#' : link}
          className={`font-mono text-xs text-muted uppercase tracking-[2px] transition-colors mb-1 md:mb-2 shrink-0 ml-4 relative group ${
            isComingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-[#ffffff]'
          }`}
        >
          Learn more
          {!isComingSoon && (
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#ffffff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          )}
        </Link>
      </div>

      {/* Price Row */}
      <p className="font-mono text-sm tracking-[2px] text-[#ffffff] mb-8">
        {isComingSoon ? 'THB ??' : `THB ${price}`}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <button
          disabled={isComingSoon}
          className={`flex-1 inline-flex items-center justify-center border border-[#ffffff] bg-transparent rounded-pill px-8 py-3.5 font-mono text-[14px] leading-[1.43] tracking-[2.5px] text-[#ffffff] outline-none transition-colors duration-300 whitespace-nowrap ${
            isComingSoon
              ? 'opacity-50 cursor-not-allowed line-through'
              : 'hover:bg-[#ffffff] hover:text-[#000000] focus:shadow-[0_0_0_1px_#ffffff,0_0_0_2px_#000000] uppercase'
          }`}
        >
          ADD TO CART
        </button>
        <button
          disabled={isComingSoon}
          className={`flex-1 inline-flex items-center justify-center border border-[#ffffff] bg-transparent rounded-pill px-8 py-3.5 font-mono text-[14px] leading-[1.43] tracking-[2.5px] text-[#ffffff] outline-none transition-colors duration-300 whitespace-nowrap ${
            isComingSoon
              ? 'opacity-50 cursor-not-allowed line-through'
              : 'hover:border-[#ffffff] hover:bg-white hover:text-black focus:shadow-[0_0_0_1px_#ffffff,0_0_0_2px_#000000] uppercase'
          }`}
        >
          ORDER NOW
        </button>
      </div>
    </div>
  );
}
