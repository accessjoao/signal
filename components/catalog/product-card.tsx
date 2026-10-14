import Link from "next/link";
import {
  ArrowUpRight,
  Network,
  Radio,
  Video,
} from "lucide-react";

import type { Product } from "@/types/product";

export type ProductCardLayout = "price-first" | "specs-first";

type ProductCardProps = {
  product: Product;
  layout: ProductCardLayout;
  isAuthenticated: boolean;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Static mapping keeps component references stable across renders.
const categoryIcons = {
  "Communication Devices": Radio,
  "Video & Monitoring": Video,
  "Network & Infrastructure": Network,
} as const;

export default function ProductCard({
  product,
  layout,
  isAuthenticated,
}: ProductCardProps) {
  const price = priceFormatter.format(
    product.displayPrice / 100,
  );

  const CategoryIcon =
    categoryIcons[
    product.category as keyof typeof categoryIcons
    ] ?? Radio;

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
      {/* Product visual */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#303538]">
        <div
          aria-hidden="true"
          className="absolute h-56 w-56 rounded-full border border-white/[0.07]"
        />

        <div
          aria-hidden="true"
          className="absolute h-40 w-40 rounded-full border border-[#D9F36A]/15"
        />

        <div
          aria-hidden="true"
          className="absolute h-24 w-24 rounded-full bg-[#D9F36A]/[0.04] blur-2xl"
        />

        <CategoryIcon
          size={72}
          strokeWidth={0.9}
          aria-hidden="true"
          className="relative text-[#D9F36A]/60 transition-transform duration-500 group-hover:scale-110"
        />

        <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
          SIGNAL / Equipment
        </span>

        <span className="absolute bottom-5 right-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
          {product.id}
        </span>
      </div>

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

          <Link
            href={`/catalog/${product.slug}`}
            prefetch={true}
            className="flex min-h-12 w-full items-center justify-between rounded-xl bg-[#D9F36A] px-5 text-sm font-semibold text-[#171A1D] transition-colors hover:bg-[#e7ff88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9F36A]"
          >
            View product
            <ArrowUpRight
              size={19}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
