/**
 * @file src/lib/data/categories.ts
 * @description Single source of truth for all product category portal configurations,
 *              performance stats comparison layouts, and metadata definitions.
 */

import { CategoryConfig, type CategoryModelItem } from '@/src/features/products/types/Category';
import {
  formatCatalogAmount,
  getCatalogProduct,
  type CatalogProductId,
} from '@/src/features/products/data/catalog';
import { externalImages } from '@/src/lib/media';

const CATEGORY_DESKTOP_IMAGE = externalImages.catalog.categoryBackground.desktop;
const CATEGORY_MOBILE_IMAGE = externalImages.catalog.categoryBackground.mobile;
const PRODUCT_COMPARISON_IMAGE = externalImages.catalog.productBlueprint;

function toCategoryModel(
  id: CatalogProductId,
  name: string,
  showCmLabel: boolean,
): CategoryModelItem {
  const product = getCatalogProduct(id);
  return {
    id: product.id,
    name,
    size: product.size ?? "",
    price: formatCatalogAmount(product.price),
    link: product.path,
    isComingSoon: product.isComingSoon,
    showCmLabel,
  };
}

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'linefollower',
    name: 'LINEFOLLOWER',
    subtitle: 'NOFAN | FANPULL',
    isComingSoon: false,
    backgroundImageDesktop: CATEGORY_DESKTOP_IMAGE,
    backgroundImageMobile: CATEGORY_MOBILE_IMAGE,
    series: [
      {
        id: 'nofan',
        name: 'NOFAN',
        isComingSoon: false,
        models: [
          toCategoryModel('nofan-15', 'NOFAN', true),
          toCategoryModel('nofan-18', 'NOFAN', true),
        ],
      },
      {
        id: 'fanpull',
        name: 'FANPULL',
        isComingSoon: true,
        subtitle: 'Coming soon',
        models: [
          toCategoryModel('fanpull-15', 'FANPULL', true),
          toCategoryModel('fanpull-18', 'FANPULL', true),
        ],
      },
    ],
    performanceMatchup: {
      title: 'PERFORMANCE MATCH-UP',
      comparisons: [
        {
          name: 'NOFAN',
          imageUrl: PRODUCT_COMPARISON_IMAGE,
          description: 'Emphasizes balanced performance, mechanical stability, and extreme ease of control, making it highly precise and reliable despite having less raw grip than the vacuum model.',
          stats: [
            { label: 'SPEED', percentage: 70 },
            { label: 'AGILITY', percentage: 75 },
            { label: 'TRACK GRIP', percentage: 40 },
            { label: 'CONTROL DIFFICULTY', percentage: 20 },
          ],
        },
        {
          name: 'FANPULL',
          imageUrl: PRODUCT_COMPARISON_IMAGE,
          description: 'Emphasizes raw speed, ultimate agility, and maximum track grip due to the vacuum system, but note that it requires high driver skill (high control difficulty).',
          stats: [
            { label: 'SPEED', percentage: 90 },
            { label: 'AGILITY', percentage: 95 },
            { label: 'TRACK GRIP', percentage: 100 },
            { label: 'CONTROL DIFFICULTY', percentage: 85 },
          ],
        },
      ],
    },
  },
  {
    id: 'mission',
    name: 'MISSION',
    subtitle: 'MISSION GO | MISSION PRO',
    isComingSoon: false,
    backgroundImageDesktop: CATEGORY_DESKTOP_IMAGE,
    backgroundImageMobile: CATEGORY_MOBILE_IMAGE,
    series: [
      {
        id: 'mission-series',
        name: '', // Empty means wait, we can just hide the group title and show grid directly!
        isComingSoon: false,
        models: [
          toCategoryModel('mission-go', 'MISSION', false),
          toCategoryModel('mission-pro', 'MISSION', false),
        ],
      },
    ],
    performanceMatchup: {
      title: 'PERFORMANCE MATCH-UP',
      comparisons: [
        {
          name: 'MISSION GO',
          imageUrl: PRODUCT_COMPARISON_IMAGE,
          description: 'Delivers exceptional balanced performance. While it matches the PRO model in top speed, it offers a more forgiving control experience, making it a highly reliable and consistent choice for competitive racing.',
          stats: [
            { label: 'SPEED', percentage: 85 },
            { label: 'AGILITY', percentage: 80 },
            { label: 'TRACK GRIP', percentage: 85 },
            { label: 'CONTROL DIFFICULTY', percentage: 50 },
          ],
        },
        {
          name: 'MISSION PRO',
          imageUrl: PRODUCT_COMPARISON_IMAGE,
          description: 'Engineered for maximum limits. It shares the same raw speed as the GO model but features enhanced agility and superior track grip, requiring slightly more advanced driver skill to master its full potential.',
          stats: [
            { label: 'SPEED', percentage: 85 },
            { label: 'AGILITY', percentage: 95 },
            { label: 'TRACK GRIP', percentage: 90 },
            { label: 'CONTROL DIFFICULTY', percentage: 60 },
          ],
        },
      ],
    },
  },
  {
    id: 'gathering',
    name: 'GATHERING',
    subtitle: 'Coming Soon',
    isComingSoon: true,
    backgroundImageDesktop: CATEGORY_DESKTOP_IMAGE,
    backgroundImageMobile: CATEGORY_MOBILE_IMAGE,
    series: [],
  },
  {
    id: 'sumo',
    name: 'SUMO',
    subtitle: 'Coming Soon',
    isComingSoon: true,
    backgroundImageDesktop: CATEGORY_DESKTOP_IMAGE,
    backgroundImageMobile: CATEGORY_MOBILE_IMAGE,
    series: [],
  },
];

/**
 * Helper to fetch category configuration data by key.
 */
export function getCategoryConfig(id: string): CategoryConfig | undefined {
  return CATEGORY_CONFIGS.find(config => config.id === id);
}
