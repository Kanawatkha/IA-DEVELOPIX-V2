import React from "react";
import {
  CATALOG_FILTERS,
  CATALOG_PRODUCTS,
  formatCatalogPrice,
  type CatalogFilter,
  type CatalogProduct,
} from "@/src/features/products/data/catalog";
import { externalImages } from "@/src/lib/media";

export type ShopModel = CatalogProduct & {
  priceLabel: string;
};

export interface CategoryMetadata {
  name: "LINEFOLLOWER" | "MISSION" | "GATHERING" | "SUMO";
  image: string;
  isComingSoon: boolean;
}

const CATEGORY_IMAGE = externalImages.catalog.categoryBackground.desktop;

export const CATEGORIES: readonly CategoryMetadata[] = [
  { name: "LINEFOLLOWER", image: CATEGORY_IMAGE, isComingSoon: false },
  { name: "MISSION", image: CATEGORY_IMAGE, isComingSoon: false },
  { name: "GATHERING", image: CATEGORY_IMAGE, isComingSoon: true },
  { name: "SUMO", image: CATEGORY_IMAGE, isComingSoon: true },
] as const;

export const SHOP_MODELS: readonly ShopModel[] = CATALOG_PRODUCTS.map((product) => ({
  ...product,
  priceLabel: formatCatalogPrice(product.price),
}));

export const FILTERS = CATALOG_FILTERS;
export type FilterValue = CatalogFilter;

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

export function getProductPath(model: Pick<ShopModel, "path">): string {
  return model.path;
}

export function getCategoryPath(category: string): string {
  const categoryPath: Record<string, string> = {
    LINEFOLLOWER: "/products/linefollower",
    MISSION: "/products/mission",
    GATHERING: "/products/gathering",
    SUMO: "/products/sumo",
  };
  return categoryPath[category.toUpperCase()] ?? "/store";
}

export function isModelComingSoon(idOrName: string): boolean {
  return SHOP_MODELS.some(
    (model) =>
      (model.id === idOrName || model.name.toUpperCase() === idOrName.toUpperCase()) &&
      model.isComingSoon,
  );
}
