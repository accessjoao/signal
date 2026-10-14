"use client";

import { useState } from "react";

import ProductCard, {
  type ProductCardLayout,
} from "@/components/catalog/product-card";

import type { Product } from "@/types/product";

type CatalogGridProps = {
  products: Product[];
  isAuthenticated: boolean;
};

export default function CatalogGrid({
  products,
  isAuthenticated,
}: CatalogGridProps) {
  const [layout, setLayout] = useState<ProductCardLayout>("price-first");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="products-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Explore products
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div
          role="group"
          aria-label="Product card layout"
          className="inline-flex rounded-full border border-neutral-200 bg-white p-1"
        >
          <button
            type="button"
            onClick={() => setLayout("price-first")}
            aria-pressed={layout === "price-first"}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              layout === "price-first"
                ? "bg-[#171717] text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Price First
          </button>

          <button
            type="button"
            onClick={() => setLayout("specs-first")}
            aria-pressed={layout === "specs-first"}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              layout === "specs-first"
                ? "bg-[#171717] text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Specs First
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
          <h3 className="text-xl font-semibold">No products found</h3>

          <p className="mt-2 text-sm text-neutral-600">
            Try adjusting your search or category filters.
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
