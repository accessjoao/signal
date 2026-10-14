import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import {
    ArrowLeft,
    ArrowUpRight,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

import ProductDetails from "@/components/catalog/product-details";
import { getAccessLevel } from "@/lib/auth/session";
import { getProductBySlug } from "@/lib/cms/products";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

async function ProductPageContent({
    params,
}: ProductPageProps) {
    // Session-dependent content must render at request time.
    await connection();

    const { slug } = await params;
    const access = await getAccessLevel();

    // The CMS adapter enforces product visibility and pricing.
    const product = await getProductBySlug(slug, access);

    if (!product) {
        notFound();
    }

    const isAuthenticated = access === "authenticated";

    return (
        <main className="min-h-screen bg-[#292D30] text-[#F3F4F2]">
            {/* Page hero */}
            <section className="relative overflow-hidden border-b border-white/10 bg-[#171A1D]">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.05]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-24 h-[350px] w-[350px] rounded-full border border-[#D9F36A]/10"
                />

                <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-12">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="mb-14">
                        <ol className="flex flex-wrap items-center gap-2 text-xs text-[#B9BEC0]">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-[#D9F36A]"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <ChevronRight
                                    size={13}
                                    aria-hidden="true"
                                />
                            </li>

                            <li>
                                <Link
                                    href="/catalog"
                                    className="transition-colors hover:text-[#D9F36A]"
                                >
                                    Catalog
                                </Link>
                            </li>

                            <li>
                                <ChevronRight
                                    size={13}
                                    aria-hidden="true"
                                />
                            </li>

                            <li
                                aria-current="page"
                                className="max-w-[220px] truncate font-medium text-[#F3F4F2] sm:max-w-none"
                            >
                                {product.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-wrap items-start justify-between gap-8">
                        <div className="max-w-3xl">
                            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
                                SIGNAL / Equipment catalog
                            </p>

                            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                                {product.name}
                            </h1>

                            <p className="mt-5 text-sm uppercase tracking-[0.16em] text-[#B9BEC0]">
                                {product.category}
                            </p>
                        </div>

                        {isAuthenticated && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9F36A]/20 bg-[#D9F36A]/10 px-4 py-2 text-xs font-semibold text-[#D9F36A]">
                                <ShieldCheck
                                    size={16}
                                    aria-hidden="true"
                                />
                                Partner access
                            </span>
                        )}
                    </div>

                    <Link
                        href="/catalog"
                        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#B9BEC0] transition-colors hover:text-[#D9F36A]"
                    >
                        <ArrowLeft size={17} aria-hidden="true" />
                        Back to catalog
                    </Link>
                </div>
            </section>

            {/* Product content */}
            <section className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
                <ProductDetails
                    product={product}
                    isAuthenticated={isAuthenticated}
                    headingLevel={2}
                />
            </section>

            {/* Explore more */}
            <section className="border-t border-white/10 bg-[#202427]">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10 sm:px-10">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D9F36A]">
                            Keep exploring
                        </p>

                        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            Discover more equipment.
                        </h2>
                    </div>

                    <Link
                        href="/catalog"
                        className="group inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#D9F36A] px-6 text-sm font-semibold text-[#171A1D] transition-colors hover:bg-[#E7FF88]"
                    >
                        Explore all products
                        <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function ProductPageLoading() {
    return (
        <main
            className="min-h-screen bg-[#292D30]"
            role="status"
            aria-label="Loading product details"
        >
            <div className="animate-pulse">
                {/* Hero skeleton */}
                <div className="border-b border-white/10 bg-[#171A1D]">
                    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
                        <div className="mb-14 h-4 w-48 rounded bg-white/10" />

                        <div className="h-3 w-40 rounded bg-white/10" />

                        <div className="mt-6 h-12 w-full max-w-xl rounded-xl bg-white/10" />

                        <div className="mt-5 h-4 w-52 rounded bg-white/10" />
                    </div>
                </div>

                {/* Product skeleton */}
                <div className="mx-auto max-w-4xl space-y-8 px-6 py-12 sm:px-10">
                    <div className="aspect-[4/3] rounded-2xl bg-[#383D40]" />

                    <div className="h-8 w-2/3 rounded-lg bg-[#383D40]" />

                    <div className="h-20 rounded-xl bg-[#383D40]" />

                    <div className="h-64 rounded-2xl bg-[#383D40]" />

                    <div className="h-44 rounded-2xl bg-[#383D40]" />
                </div>
            </div>
        </main>
    );
}

export default function ProductPage({
    params,
}: ProductPageProps) {
    return (
        <Suspense fallback={<ProductPageLoading />}>
            <ProductPageContent params={params} />
        </Suspense>
    );
}
