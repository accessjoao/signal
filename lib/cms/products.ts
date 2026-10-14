import "server-only";

import seed from "../../data/products.json";
import { PRODUCT_CATEGORIES, type AccessLevel, type Product, type ProductFilters } from "../../types/product";
import {
  filterByCategory,
  findProductBySlug,
  normalizeProducts,
  searchProducts,
  toDisplayProduct,
} from "../products/product-rules";

const products = normalizeProducts(seed);

/**
 * Trusted server callers only. The next authentication phase must derive access
 * from a server-validated session, never client state, form data, or URL roles.
 * This module is not a Server Action or a public HTTP endpoint.
 */
export async function getProducts(access: AccessLevel, filters: ProductFilters = {}): Promise<Product[]> {
  const visibleProducts = products.flatMap((product) => {
    const authorized = toDisplayProduct(product, access);
    return authorized ? [authorized] : [];
  });
  return searchProducts(filterByCategory(visibleProducts, filters.category), filters.search);
}

/** Unknown and inaccessible slugs both return null for a future notFound() call. */
export async function getProductBySlug(slug: string, access: AccessLevel): Promise<Product | null> {
  return findProductBySlug(await getProducts(access), slug);
}

export function getCategories() {
  return [...PRODUCT_CATEGORIES];
}
