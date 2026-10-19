import {
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";

import ProductVisual from "@/components/catalog/product-visual";
import type { Product } from "@/types/product";

type ProductDetailsProps = {
    product: Product;
    isAuthenticated: boolean;
    headingLevel?: 1 | 2;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export default function ProductDetails({
    product,
    isAuthenticated,
    headingLevel = 1,
}: ProductDetailsProps) {
    const price = priceFormatter.format(product.displayPrice / 100);

    return (
        <div className="flex flex-col gap-9 text-[#F3F4F2]">
            <ProductVisual product={product} variant="details" />

            {/* Product information */}
            <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D9F36A]" />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9F36A]">
                        {product.category}
                    </p>
                </div>

                {headingLevel === 1 ? (
                    <h1 className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                        {product.name}
                    </h1>
                ) : (
                    <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                        {product.name}
                    </h2>
                )}

                <p className="mt-5 text-sm leading-7 text-[#B9BEC0] sm:text-base">
                    {product.description}
                </p>
            </div>

            {/* Technical specifications */}
            <section aria-labelledby="product-specifications">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h2
                        id="product-specifications"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Technical specifications
                    </h2>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Product details
                    </span>
                </div>

                <dl className="overflow-hidden rounded-2xl border border-white/10 bg-[#383D40] px-5 sm:px-6">
                    {product.specifications.length > 0 ? (
                        product.specifications.map((specification) => (
                            <div
                                key={specification.label}
                                className="flex items-start justify-between gap-6 border-b border-white/10 py-4 text-sm last:border-b-0"
                            >
                                <dt className="text-[#B9BEC0]">
                                    {specification.label}
                                </dt>

                                <dd className="max-w-[55%] text-right font-semibold text-[#F3F4F2]">
                                    {specification.value}
                                </dd>
                            </div>
                        ))
                    ) : (
                        <div className="py-6 text-sm text-[#B9BEC0]">
                            Technical specifications are not available yet.
                        </div>
                    )}
                </dl>
            </section>

            {/* Pricing */}
            <section
                aria-label="Product pricing"
                className="relative overflow-hidden rounded-2xl border border-[#D9F36A]/20 bg-[#171A1D] p-6 sm:p-8"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D9F36A]/[0.055] blur-3xl"
                />

                <div className="relative">
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <ShieldCheck
                                size={17}
                                className="text-[#D9F36A]"
                                aria-hidden="true"
                            />
                        ) : (
                            <LockKeyhole
                                size={17}
                                className="text-[#D9F36A]"
                                aria-hidden="true"
                            />
                        )}

                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D9F36A]">
                            {isAuthenticated
                                ? "Your partner price"
                                : "Starting at"}
                        </p>
                    </div>

                    <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                        {price}
                    </p>

                    <div className="mt-6 border-t border-white/10 pt-5">
                        <p className="text-xs leading-6 text-[#B9BEC0]">
                            {isAuthenticated
                                ? "Partner pricing is available with your active session."
                                : "Sign in to access additional products and partner pricing."}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
