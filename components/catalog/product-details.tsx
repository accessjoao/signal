
import Image from "next/image";
import {
    LockKeyhole,
    Network,
    Radio,
    ShieldCheck,
    Video,
} from "lucide-react";

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

// Static icon references prevent components from being created during render.
const categoryIcons = {
    "Communication Devices": Radio,
    "Video & Monitoring": Video,
    "Network & Infrastructure": Network,
} as const;

export default function ProductDetails({
    product,
    isAuthenticated,
    headingLevel = 1,
}: ProductDetailsProps) {
    const price = priceFormatter.format(product.displayPrice / 100);

    const CategoryIcon =
        categoryIcons[
        product.category as keyof typeof categoryIcons
        ] ?? Radio;

    return (
        <div className="flex flex-col gap-9 text-[#F3F4F2]">
            {/* Product visual */}
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#303538]">
                {product.image ? (
                    <div className="relative h-full w-full">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <>
                        <div
                            aria-hidden="true"
                            className="absolute h-[75%] aspect-square rounded-full border border-white/[0.07]"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute h-[52%] aspect-square rounded-full border border-[#D9F36A]/15"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute h-32 w-32 rounded-full bg-[#D9F36A]/[0.04] blur-3xl"
                        />

                        <CategoryIcon
                            size={88}
                            strokeWidth={0.8}
                            aria-hidden="true"
                            className="relative text-[#D9F36A]/65"
                        />

                        <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                            SIGNAL / Product visual
                        </span>
                    </>
                )}

                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#171A1D]/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
                    {product.category}
                </span>
            </div>

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
