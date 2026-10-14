export const PRODUCT_CATEGORIES = [
  "Communication Devices",
  "Video & Monitoring",
  "Network & Infrastructure",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type AccessLevel = "public" | "authenticated";

export interface ProductSpecification {
  label: string;
  value: string;
}

/** Safe for serialization to presentation components after server authorization. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  /** Null means the presentation should show its missing-image fallback. */
  image: string | null;
  specifications: ProductSpecification[];
  /** USD integer cents; format only when rendering. */
  displayPrice: number;
}

export interface ProductFilters {
  /** Exact category label. Blank means all; unknown values match nothing. */
  category?: string;
  /** Case-insensitive substring in name or description; whitespace is trimmed. */
  search?: string;
}
