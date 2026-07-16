/**
 * @file catalog.ts
 * @description Single source of truth for all product catalog mock database records, helper retrieval utilities, and price formatters.
 */

import type { CategoryKey } from "@/src/types/category";
import { externalImages, getProductMedia } from "@/src/lib/media";

export type CatalogProductId =
  | "nofan-15"
  | "nofan-18"
  | "fanpull-15"
  | "fanpull-18"
  | "mission-go"
  | "mission-pro"
  | "gathering"
  | "sumo";

export interface CatalogProduct {
  id: CatalogProductId;
  name: string;
  category: CategoryKey;
  categoryLabel: Uppercase<CategoryKey>;
  size?: string;
  price: number | null;
  isComingSoon: boolean;
  image: string;
  path: string;
  showCmLabel: boolean;
}

const PRODUCT_IMAGE = externalImages.catalog.productBlueprint;

export const CATALOG_PRODUCTS = [
  {
    id: "nofan-15",
    name: "NOFAN 15cm",
    category: "linefollower",
    categoryLabel: "LINEFOLLOWER",
    size: "15",
    price: 15000,
    isComingSoon: false,
    image: getProductMedia("nofan-15").cover,
    path: "/products/linefollower/nofan-15",
    showCmLabel: true,
  },
  {
    id: "nofan-18",
    name: "NOFAN 18cm",
    category: "linefollower",
    categoryLabel: "LINEFOLLOWER",
    size: "18",
    price: 18000,
    isComingSoon: false,
    image: getProductMedia("nofan-18").cover,
    path: "/products/linefollower/nofan-18",
    showCmLabel: true,
  },
  {
    id: "fanpull-15",
    name: "FANPULL 15cm",
    category: "linefollower",
    categoryLabel: "LINEFOLLOWER",
    size: "15",
    price: null,
    isComingSoon: true,
    image: getProductMedia("fanpull-15").cover,
    path: "/products/linefollower/fanpull-15",
    showCmLabel: true,
  },
  {
    id: "fanpull-18",
    name: "FANPULL 18cm",
    category: "linefollower",
    categoryLabel: "LINEFOLLOWER",
    size: "18",
    price: null,
    isComingSoon: true,
    image: getProductMedia("fanpull-18").cover,
    path: "/products/linefollower/fanpull-18",
    showCmLabel: true,
  },
  {
    id: "mission-go",
    name: "MISSION GO",
    category: "mission",
    categoryLabel: "MISSION",
    price: 25000,
    isComingSoon: false,
    image: getProductMedia("mission-go").cover,
    path: "/products/mission/go",
    showCmLabel: false,
  },
  {
    id: "mission-pro",
    name: "MISSION PRO",
    category: "mission",
    categoryLabel: "MISSION",
    price: 45000,
    isComingSoon: false,
    image: getProductMedia("mission-pro").cover,
    path: "/products/mission/pro",
    showCmLabel: false,
  },
  {
    id: "gathering",
    name: "GATHERING",
    category: "gathering",
    categoryLabel: "GATHERING",
    price: null,
    isComingSoon: true,
    image: getProductMedia("gathering").cover,
    path: "/products/gathering",
    showCmLabel: false,
  },
  {
    id: "sumo",
    name: "SUMO",
    category: "sumo",
    categoryLabel: "SUMO",
    price: null,
    isComingSoon: true,
    image: getProductMedia("sumo").cover,
    path: "/products/sumo",
    showCmLabel: false,
  },
] as const satisfies readonly CatalogProduct[];

export const CATALOG_FILTERS = [
  "ALL",
  "LINEFOLLOWER",
  "MISSION",
  "GATHERING",
  "SUMO",
] as const;

export type CatalogFilter = (typeof CATALOG_FILTERS)[number];

export function getCatalogProduct(id: CatalogProductId): CatalogProduct {
  const product = CATALOG_PRODUCTS.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown catalog product: ${id}`);
  return product;
}

export function formatCatalogPrice(price: number | null): string {
  return price === null ? "TBA" : `THB ${price.toLocaleString("en-US")}`;
}

export function formatCatalogAmount(price: number | null): string {
  return price === null ? "??" : price.toLocaleString("en-US");
}

export function getCatalogProductsByFilter(filter: CatalogFilter): readonly CatalogProduct[] {
  if (filter === "ALL") return CATALOG_PRODUCTS;
  return CATALOG_PRODUCTS.filter((product) => product.categoryLabel === filter);
}
