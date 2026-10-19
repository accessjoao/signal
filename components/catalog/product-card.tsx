"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";

import ProductVisual from "@/components/catalog/product-visual";

import type { Product } from "@/types/product";

export type ProductCardLayout = "price-first" | "specs-first";

type ProductCardProps = {
  product: Product;
  layout: ProductCardLayout;
  isAuthenticated: boolean;
  onViewProduct: (productId: string) => void;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const productButtonClassName =
  "flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl bg-[#D9F36A] px-5 text-sm font-semibold text-[#171A1D] transition-colors hover:bg-[#e7ff88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9F36A]";

export default function ProductCard({
  product,
  layout,
  isAuthenticated,
  onViewProduct,
}: ProductCardProps) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    clientSnapshot,
    serverSnapshot,
  );

  const price = priceFormatter.format(product.displayPrice / 100);

  const priceSection = (
    <div className="border-t border-white/10 pt-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B9BEC0]">
        {isAuthenticated ? "Partner price" : "Starting at"}
      </p>

      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#F3F4F2]">
        {price}
      </p>
    </div>
  );

  const specificationsSection = (
    <div className="space-y-3">
      {product.specifications.slice(0, 3).map((specification) => (
        <div
          key={specification.label}
          className="flex items-start justify-between gap-4 text-sm"
        >
          <span className="text-[#B9BEC0]">
            {specification.label}
          </span>

          <span className="max-w-[55%] text-right font-medium text-[#F3F4F2]">
            {specification.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#383D40] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9F36A]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
      <ProductVisual product={product} variant="card" />

      {/* Product information */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D9F36A]">
          {product.category}
        </p>

        <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-[#F3F4F2]">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#B9BEC0]">
          {product.description}
        </p>

        <div className="mt-auto space-y-6 pt-7">
          {layout === "price-first" ? (
            <>
              {priceSection}
              {specificationsSection}
            </>
          ) : (
            <>
              {specificationsSection}
              {priceSection}
            </>
          )}

          <button
            type="button"
            disabled={!isHydrated}
            onClick={() => onViewProduct(product.id)}
            aria-haspopup="dialog"
            className={productButtonClassName}
          >
            View product
            <ArrowUpRight
              size={19}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
