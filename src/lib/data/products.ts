/**
 * @file src/lib/data/products.ts
 * @description Single source of truth for all product catalog data,
 *              filter options, and product routing utilities.
 *
 * Used by:
 *  - store/page.tsx  (SHOP COLLECTIONS section)
 *  - products/[cat]/[model]/page.tsx  (CUSTOMERS ALSO BOUGHT section)
 */

import React from "react";

// ============================================================
// TYPES
// ============================================================

export interface ShopModel {
  id: number;
  name: string;
  cat: "LINEFOLLOWER" | "MISSION" | "GATHERING" | "SUMO";
  price: string;
  isComingSoon: boolean;
  image: string;
}

export interface CategoryMetadata {
  name: "LINEFOLLOWER" | "MISSION" | "GATHERING" | "SUMO";
  image: string;
  isComingSoon: boolean;
}

// ============================================================
// DATA
// ============================================================

export const CATEGORIES: readonly CategoryMetadata[] = [
  {
    name: "LINEFOLLOWER",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png",
    isComingSoon: false,
  },
  {
    name: "MISSION",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png",
    isComingSoon: false,
  },
  {
    name: "GATHERING",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png",
    isComingSoon: true,
  },
  {
    name: "SUMO",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png",
    isComingSoon: true,
  },
] as const;

export const SHOP_MODELS: ShopModel[] = [
  {
    id: 1,
    name: "NOFAN 15cm",
    cat: "LINEFOLLOWER",
    price: "THB 15,000",
    isComingSoon: false,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 2,
    name: "NOFAN 18cm",
    cat: "LINEFOLLOWER",
    price: "THB 18,000",
    isComingSoon: false,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 3,
    name: "MISSION GO",
    cat: "MISSION",
    price: "THB 25,000",
    isComingSoon: false,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 4,
    name: "MISSION PRO",
    cat: "MISSION",
    price: "THB 45,000",
    isComingSoon: false,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 5,
    name: "FANPULL 15cm",
    cat: "LINEFOLLOWER",
    price: "TBA",
    isComingSoon: true,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 6,
    name: "FANPULL 18cm",
    cat: "LINEFOLLOWER",
    price: "TBA",
    isComingSoon: true,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 7,
    name: "GATHERING",
    cat: "GATHERING",
    price: "TBA",
    isComingSoon: true,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
  {
    id: 8,
    name: "SUMO",
    cat: "SUMO",
    price: "TBA",
    isComingSoon: true,
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
  },
];

/** Filter tab labels for the shop collections carousel. */
export const FILTERS = [
  "ALL",
  "LINEFOLLOWER",
  "MISSION",
  "GATHERING",
  "SUMO",
] as const;

export type FilterValue = (typeof FILTERS)[number];

// ============================================================
// UTILITIES
// ============================================================

/**
 * Formats a model name, rendering the "cm" suffix in a smaller,
 * lowercase style for display consistency.
 *
 * @example formatModelName("NOFAN 15cm") → <>NOFAN 15<span>cm</span></>
 */
export function formatModelName(name: string): React.ReactNode {
  const parts = name.split("cm");
  return parts.length > 1
    ? React.createElement(
        React.Fragment,
        null,
        parts[0],
        React.createElement(
          "span",
          { className: "lowercase text-[0.75em] opacity-60" },
          "cm",
        ),
        parts[1],
      )
    : name;
}

/**
 * Resolves the canonical URL path for a given shop model.
 * Used in card links and navigation within ShopCollections.
 */
export function getProductPath(
  model: Pick<ShopModel, "id" | "name" | "cat">,
): string {
  const catLower = model.cat.toLowerCase();
  const nameLower = model.name.toLowerCase();

  if (catLower === "linefollower") {
    if (nameLower.includes("nofan 15"))
      return "/products/linefollower/nofan-15";
    if (nameLower.includes("nofan 18"))
      return "/products/linefollower/nofan-18";
    if (nameLower.includes("fanpull 15"))
      return "/products/linefollower/fanpull-15";
    if (nameLower.includes("fanpull 18"))
      return "/products/linefollower/fanpull-18";
  } else if (catLower === "mission") {
    if (nameLower.includes("go")) return "/products/mission/go";
    if (nameLower.includes("pro")) return "/products/mission/pro";
  } else if (catLower === "gathering") {
    return "/products/gathering";
  } else if (catLower === "sumo") {
    return "/products/sumo";
  }

  return `/products/${catLower}/${nameLower.replace(/\s+/g, "-")}`;
}

/**
 * Maps a product category string to its category hub URL.
 */
export function getCategoryPath(cat: string): string {
  const map: Record<string, string> = {
    LINEFOLLOWER: "/products/linefollower",
    SUMO: "/products/sumo",
    MISSION: "/products/mission",
    GATHERING: "/products/gathering",
  };
  return map[cat.toUpperCase()] ?? "/store";
}

/**
 * Checks if a specific product model is flagged as Coming Soon.
 */
export function isModelComingSoon(name: string): boolean {
  return SHOP_MODELS.some(
    (model) =>
      model.name.toUpperCase() === name.toUpperCase() && model.isComingSoon,
  );
}
