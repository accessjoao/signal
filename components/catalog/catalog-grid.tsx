"use client";

import { useCallback, useState } from "react";
import { ArrowUpDown, SearchX } from "lucide-react";

import ProductCard, {
  type ProductCardLayout,
} from "@/components/catalog/product-card";

import type { Product } from "@/types/product";
import ProductDetails from "@/components/catalog/product-details";
import ProductDrawer from "@/components/catalog/product-drawer";

type CatalogGridProps = {
  products: Product[];
  isAuthenticated: boolean;
};

export default function CatalogGrid({
  products,
  isAuthenticated,
}: CatalogGridProps) {
  const [layout, setLayout] =
    useState<ProductCardLayout>("price-first");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Resolve from the current server-authorized list, never retain a stale product object.
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const closeProduct = useCallback(() => setSelectedProductId(null), []);

  return (
    <div>
      {/* Layout controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <ArrowUpDown
            size={18}
            strokeWidth={1.8}
            className="text-[#D9F36A]"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-semibold text-[#F3F4F2]">
              Product display
            </p>

            <p className="mt-1 text-xs text-[#B9BEC0]">
              Choose how product information is prioritized.
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Product card layout"
          className="inline-flex rounded-full border border-white/10 bg-[#383D40] p-1.5"
        >
          <button
            type="button"
            onClick={() => setLayout("price-first")}
            aria-pressed={layout === "price-first"}
            className={`min-h-10 cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
              layout === "price-first"
                ? "bg-[#D9F36A] text-[#171A1D] shadow-[0_4px_16px_rgba(217,243,106,0.15)]"
                : "text-[#B9BEC0] hover:bg-white/10 hover:text-white"
            }`}
          >
            Price First
          </button>

          <button
            type="button"
            onClick={() => setLayout("specs-first")}
            aria-pressed={layout === "specs-first"}
            className={`min-h-10 cursor-pointer rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
              layout === "specs-first"
                ? "bg-[#D9F36A] text-[#171A1D] shadow-[0_4px_16px_rgba(217,243,106,0.15)]"
                : "text-[#B9BEC0] hover:bg-white/10 hover:text-white"
            }`}
          >
            Specs First
          </button>
        </div>
      </div>

      {/* Product results */}
      {products.length === 0 ? (
        <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#383D40] px-6 py-14 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
            <SearchX
              size={30}
              strokeWidth={1.5}
              className="text-[#D9F36A]"
              aria-hidden="true"
            />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-[#F3F4F2]">
            No products found
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-7 text-[#B9BEC0]">
            We couldn&apos;t find products matching your search.
            Try adjusting your search terms or category filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              layout={layout}
              isAuthenticated={isAuthenticated}
              onViewProduct={setSelectedProductId}
            />
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductDrawer key={selectedProduct.id} onClose={closeProduct}>
          <ProductDetails
            product={selectedProduct}
            isAuthenticated={isAuthenticated}
            headingLevel={2}
          />
        </ProductDrawer>
      )}
    </div>
  );
}
