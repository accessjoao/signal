import "server-only";

import {
  PRODUCT_CATEGORIES,
  type AccessLevel,
  type Product,
  type ProductCategory,
  type ProductSpecification,
} from "../../types/product";

/** Raw CMS contract. Never pass this model to presentation components. */
export interface CmsProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string | null;
  specifications: ProductSpecification[];
  /** Both prices are USD integer cents. */
  priceLoggedOut: number;
  priceAuthenticated: number;
  visibility: AccessLevel;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

/** Invalid required content is omitted; absent optional media/specs are normalized. */
export function normalizeProducts(content: unknown): CmsProduct[] {
  if (!Array.isArray(content)) return [];

  const products: CmsProduct[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const entry of content) {
    if (
      !isRecord(entry) ||
      !isText(entry.id) ||
      !isText(entry.slug) ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) ||
      !isText(entry.name) ||
      !isText(entry.description) ||
      !PRODUCT_CATEGORIES.some((category) => category === entry.category) ||
      !isPrice(entry.priceLoggedOut) ||
      !isPrice(entry.priceAuthenticated) ||
      (entry.visibility !== "public" && entry.visibility !== "authenticated") ||
      ids.has(entry.id) ||
      slugs.has(entry.slug)
    ) continue;

    const specifications: ProductSpecification[] = [];
    if (Array.isArray(entry.specifications)) {
      for (const spec of entry.specifications) {
        if (isRecord(spec) && isText(spec.label) && isText(spec.value)) {
          specifications.push({ label: spec.label.trim(), value: spec.value.trim() });
        }
      }
    }

    products.push({
      id: entry.id,
      slug: entry.slug,
      name: entry.name.trim(),
      description: entry.description.trim(),
      category: entry.category as ProductCategory,
      // Only local asset paths are supported by this mock CMS.
      image: typeof entry.image === "string" && /^\/(?!\/)[^\s\\?#]+$/.test(entry.image)
        ? entry.image
        : null,
      specifications,
      priceLoggedOut: entry.priceLoggedOut,
      priceAuthenticated: entry.priceAuthenticated,
      visibility: entry.visibility,
    });
    ids.add(entry.id);
    slugs.add(entry.slug);
  }

  return products;
}

/** Access must come from a validated server session, never a request role parameter. */
export function isProductVisible(product: CmsProduct, access: AccessLevel): boolean {
  return access === "authenticated" || product.visibility === "public";
}

export function selectDisplayPrice(product: CmsProduct, access: AccessLevel): number | null {
  if (!isProductVisible(product, access)) return null;
  return access === "authenticated" ? product.priceAuthenticated : product.priceLoggedOut;
}

export function toDisplayProduct(product: CmsProduct, access: AccessLevel): Product | null {
  const displayPrice = selectDisplayPrice(product, access);
  if (displayPrice === null) return null;

  // Explicit allowlist prevents new CMS fields or alternate prices leaking into props.
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image,
    specifications: product.specifications.map(({ label, value }) => ({ label, value })),
    displayPrice,
  };
}

export function findProductBySlug(products: readonly Product[], slug: string): Product | null {
  return products.find((product) => product.slug === slug) ?? null;
}

export function filterByCategory(products: readonly Product[], category = ""): Product[] {
  const selectedCategory = category.trim();
  return products.filter((product) => !selectedCategory || product.category === selectedCategory);
}

export function searchProducts(products: readonly Product[], search = ""): Product[] {
  const query = search.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
  );
}
