'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Product } from '@/src/features/products/types';
import * as ty from '@/src/lib/design/typography';

const SceneWrapper = dynamic(
  () => import('@/src/components/canvas').then((mod) => mod.SceneWrapper),
  { ssr: false }
);

const PlaceholderSphere = dynamic(
  () => import('@/src/components/canvas').then((mod) => mod.PlaceholderSphere),
  { ssr: false }
);

interface ProductColumnProps {
  product: Product | undefined;
  title: string;
  isRight?: boolean;
}

export function ProductColumn({ product, title, isRight = false }: ProductColumnProps) {
  if (!product) return null;

  const specEntries = Object.entries(product.technicalSpecs);

  return (
    <div className={`flex flex-col border-b md:border-b-0 border-hairline p-8 md:p-16 lg:p-24 justify-between h-full relative ${!isRight ? 'md:border-r' : ''}`} id={product.id}>
      <div className="flex-1 flex flex-col">
        <h2 className={`${ty.displayXl} text-6xl md:text-[80px] lg:text-[100px] leading-[0.85] mb-16 break-words`}>
          {title}
        </h2>
        
        {/* Sticky Model Container */}
        <div className="sticky top-24 z-20 w-full aspect-[4/3] mb-16 border border-hairline bg-surface-soft overflow-hidden flex items-center justify-center group flex-shrink-0">
          <span className="font-mono text-xs text-muted absolute top-4 left-4 z-10 tracking-[2px]">SYS_RENDER_{product.id}</span>
          <div className="absolute inset-0 pointer-events-none group-hover:bg-white/5 transition-colors"></div>
          <div className="w-full h-full absolute inset-0">
             <SceneWrapper>
                <PlaceholderSphere />
             </SceneWrapper>
          </div>
          <div className="pointer-events-none z-10 bg-[rgba(0,0,0,0.6)] px-4 py-2 backdrop-blur-sm border border-hairline mt-auto mb-4 absolute bottom-4">
             <span className={`${ty.captionUpper} text-muted`}>[ 3D MODEL PLACEHOLDER ]</span>
          </div>
        </div>
 
        {/* Specs List with Staggered Entrance */}
        <div className="space-y-6 mb-16 flex-grow z-10 relative">
          {specEntries.map(([key, val], index) => (
            <motion.div 
              key={key} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col xl:flex-row xl:items-baseline justify-between border-b border-hairline pb-4"
            >
              <span className={`mb-2 xl:mb-0 ${ty.specLabel}`}>{key}</span>
              <span className={`xl:text-right ${ty.specValue}`}>{val}</span>
            </motion.div>
          ))}
          {/* Add extra padding to allow scrolling past the sticky model */}
          <div className="h-[30vh] w-full" />
        </div>
      </div>
      
      <button className={`${ty.ctaButton} w-full hover:bg-white hover:text-canvas mt-auto relative z-10`}>
        EXPLORE {title}
      </button>
    </div>
  );
}
