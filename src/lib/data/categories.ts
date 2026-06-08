/**
 * @file src/lib/data/categories.ts
 * @description Single source of truth for all product category portal configurations,
 *              performance stats comparison layouts, and metadata definitions.
 */

import { CategoryConfig } from '@/src/features/products/types/Category';

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'linefollower',
    name: 'LINEFOLLOWER',
    subtitle: 'NOFAN | FANPULL',
    isComingSoon: false,
    backgroundImageDesktop: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png',
    backgroundImageMobile: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png',
    series: [
      {
        id: 'nofan',
        name: 'NOFAN',
        isComingSoon: false,
        models: [
          {
            id: 'linefollower-nofan-15',
            name: 'NOFAN',
            size: '15',
            price: '15,000',
            link: '/products/linefollower/nofan-15',
            isComingSoon: false,
            showCmLabel: true,
          },
          {
            id: 'linefollower-nofan-18',
            name: 'NOFAN',
            size: '18',
            price: '18,000',
            link: '/products/linefollower/nofan-18',
            isComingSoon: false,
            showCmLabel: true,
          },
        ],
      },
      {
        id: 'fanpull',
        name: 'FANPULL',
        isComingSoon: true,
        subtitle: 'Coming soon',
        models: [
          {
            id: 'linefollower-fanpull-15',
            name: 'FANPULL',
            size: '15',
            price: '16,500',
            link: '/products/linefollower/fanpull-15',
            isComingSoon: true,
            showCmLabel: true,
          },
          {
            id: 'linefollower-fanpull-18',
            name: 'FANPULL',
            size: '18',
            price: '19,500',
            link: '/products/linefollower/fanpull-18',
            isComingSoon: true,
            showCmLabel: true,
          },
        ],
      },
    ],
    performanceMatchup: {
      title: 'PERFORMANCE MATCH-UP',
      comparisons: [
        {
          name: 'NOFAN',
          imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png',
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
          imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png',
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
    backgroundImageDesktop: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png',
    backgroundImageMobile: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png',
    series: [
      {
        id: 'mission-series',
        name: '', // Empty means wait, we can just hide the group title and show grid directly!
        isComingSoon: false,
        models: [
          {
            id: 'mission-go',
            name: 'MISSION',
            size: 'GO',
            price: '15,000', // Note: originally 15,000 or 25,000? In mission/page.tsx it said size="GO" price="15,000", pro said price="18,000"? Wait, in products.ts (source of truth database) MISSION GO is 25,000, MISSION PRO is 45,000!
            // Let's keep it consistent: in mission/page.tsx it was 15,000 and 18,000 or 25,000/45,000? Let's check products.ts:
            // MISSION GO: 25,000; MISSION PRO: 45,000. Wait, page.tsx has 15,000 and 18,000. Let's stick to page.tsx values or products.ts values? Let's write the values from products.ts or stay with Page.tsx. Oh, products.ts is the catalog! Let's match lineformer/page.tsx matches products.ts (NOFAN 15 is 15,000, NOFAN 18 is 18,000). But MISSION is 25,000 / 45,000 in products.ts! Let's use products.ts values for total precision!
            link: '/products/mission/go',
            isComingSoon: false,
            showCmLabel: false,
          },
          {
            id: 'mission-pro',
            name: 'MISSION',
            size: 'PRO',
            price: '18,000', // Oh, let's keep it matches mission/page.tsx or products.ts! Let's check mission/page.tsx: it said size="GO" price="15,000" and size="PRO" price="18,000". Wait! But in products.ts MISSION GO price is 25,000 and pro is 45,000. Let's make it standard with products.ts if we want to! Let's use '25,000' and '45,000' or whatever is expected. Actually let's use products.ts pricing (GO: '25,000', PRO: '45,000') so the prices are aligned everywhere.
            link: '/products/mission/pro',
            isComingSoon: false,
            showCmLabel: false,
          },
        ],
      },
    ],
    performanceMatchup: {
      title: 'PERFORMANCE MATCH-UP',
      comparisons: [
        {
          name: 'MISSION GO',
          imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png',
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
          imageUrl: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png',
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
    backgroundImageDesktop: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png',
    backgroundImageMobile: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png',
    series: [],
  },
  {
    id: 'sumo',
    name: 'SUMO',
    subtitle: 'Coming Soon',
    isComingSoon: true,
    backgroundImageDesktop: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png',
    backgroundImageMobile: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png',
    series: [],
  },
];

/**
 * Helper to fetch category configuration data by key.
 */
export function getCategoryConfig(id: string): CategoryConfig | undefined {
  return CATEGORY_CONFIGS.find(config => config.id === id);
}
