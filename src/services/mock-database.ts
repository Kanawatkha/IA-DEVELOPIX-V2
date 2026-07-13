import {
  CATALOG_PRODUCTS,
  type CatalogProductId,
} from "@/src/features/products/data/catalog";
import type { Product } from "@/src/features/products/types";

const PRODUCT_DESCRIPTIONS: Record<CatalogProductId, string> = {
  "nofan-15": "Ultra-lightweight line follower optimized for 15 cm agility tracks.",
  "nofan-18": "Ultra-lightweight line follower optimized for 18 cm agility tracks.",
  "fanpull-15": "Vacuum-assisted line follower designed for 15 cm competition tracks.",
  "fanpull-18": "Vacuum-assisted line follower designed for 18 cm competition tracks.",
  "mission-go": "High-precision mission robot built for complex autonomous tasks.",
  "mission-pro": "Advanced mission robot engineered for maximum competitive performance.",
  gathering: "Heavy-duty gathering robot designed for swift sorting and collection.",
  sumo: "Professional-grade sumo combat robot with magnetic downforce.",
};

export const mockDatabase: { products: Product[] } = {
  products: CATALOG_PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price ?? 0,
    description: PRODUCT_DESCRIPTIONS[product.id],
    status: product.isComingSoon ? "coming_soon" : "deploy",
    technicalSpecs: {},
    imagePlaceholder: product.image,
    "3dModelUrl": "/models/placeholder-sphere.glb",
  })),
};
