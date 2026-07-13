import { externalImages } from "./external-images";

export type ProductMedia = {
  cover: string;
  gallery: readonly string[];
  story: readonly string[];
};

const localProductAsset = (category: string, product: string, file: string) =>
  `/images/products/${category}/${product}/${file}`;

const productDefinitions = {
  "nofan-15": ["linefollower", "nofan-15"],
  "nofan-18": ["linefollower", "nofan-18"],
  "fanpull-15": ["linefollower", "fanpull-15"],
  "fanpull-18": ["linefollower", "fanpull-18"],
  "mission-go": ["mission", "go"],
  "mission-pro": ["mission", "pro"],
  gathering: ["gathering", "gathering"],
  sumo: ["sumo", "sumo"],
} as const;

export type ProductMediaId = keyof typeof productDefinitions;

/**
 * Product asset registry. Local paths are ready for future uploads;
 * current UI continues using the external fallback until those files exist.
 */
export function getProductMedia(id: ProductMediaId): ProductMedia {
  const [category, product] = productDefinitions[id];

  return {
    cover: externalImages.catalog.productBlueprint,
    gallery: [externalImages.catalog.productBlueprint],
    story: [],
  };
}

export const productAssetPaths = Object.fromEntries(
  Object.entries(productDefinitions).map(([id, [category, product]]) => [id, {
    cover: localProductAsset(category, product, "cover.webp"),
    gallery: localProductAsset(category, product, "gallery"),
    story: localProductAsset(category, product, "story"),
  }]),
) as Record<ProductMediaId, { cover: string; gallery: string; story: string }>;
