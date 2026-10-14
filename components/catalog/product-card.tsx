import Link from "next/link";

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

export default function ProductCard({
  product,
  layout,
  isAuthenticated,
}: ProductCardProps) {
  const price = priceFormatter.format(product.displayPrice / 100);

  const priceSection = (
    <div className="border-t border-neutral-200 pt-5">
      <p className="text-xs uppercase tracking-wider text-neutral-500">
        {isAuthenticated ? "Partner price" : "Starting at"}
      </p>

      <p className="mt-1 text-2xl font-semibold">{price}</p>
    </div>
  );

  const specificationsSection = (
    <div className="space-y-3">
      {product.specifications.slice(0, 3).map((specification) => (
        <div
          key={specification.label}
          className="flex items-start justify-between gap-4 text-sm"
        >
          <span className="text-neutral-500">
            {specification.label}
          </span>

          <span className="text-right font-medium">
            {specification.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-6 flex aspect-[4/3] items-center justify-center rounded-xl bg-[#EEEFE8]">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          SIGNAL / Equipment
        </span>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
        {product.category}
      </p>

      <h3 className="text-xl font-semibold tracking-tight">
        {product.name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-neutral-600">
        {product.description}
      </p>

      <div className="mt-auto space-y-5 pt-6">
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
          className="inline-flex w-full items-center justify-center rounded-full bg-[#D9F36A] px-5 py-3 text-sm font-semibold transition hover:bg-[#CBE85B]"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
