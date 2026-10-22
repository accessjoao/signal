import "server-only";

import seed from "../../data/products.json";
import {
  PRODUCT_CATEGORIES,
  type AccessLevel,
  type Product,
  type ProductFilters,
} from "../../types/product";

import {
  filterByCategory,
  findProductBySlug,
  normalizeProducts,
  searchProducts,
  sortProducts,
  toDisplayProduct,
} from "../products/product-rules";

import { fetchContentfulProducts } from "./contentful";

const mockProducts = normalizeProducts(seed);

async function loadProducts() {
  const source = process.env.CMS_SOURCE ?? "mock";

  if (source === "mock") {
    return mockProducts;
  }

  if (source === "contentful") {
    const entries = await fetchContentfulProducts();
    return normalizeProducts(entries);
  }

  throw new Error(`Unsupported CMS source: ${source}`);
}

/**
 * Trusted server callers only.
 * Access must be derived from a validated server session.
 */
export async function getProducts(
  access: AccessLevel,
  filters: ProductFilters = {},
): Promise<Product[]> {
  const products = await loadProducts();

  const visibleProducts = products.flatMap((product) => {
    const authorized = toDisplayProduct(product, access);
    return authorized ? [authorized] : [];
  });

  const filteredProducts = searchProducts(
    filterByCategory(visibleProducts, filters.category),
    filters.search,
  );

  return sortProducts(filteredProducts, filters.sort);
}

export async function getProductBySlug(
  slug: string,
  access: AccessLevel,
): Promise<Product | null> {
  return findProductBySlug(await getProducts(access), slug);
}

export function getCategories() {
  return [...PRODUCT_CATEGORIES];
}
