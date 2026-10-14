import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import ProductDetails from "@/components/catalog/product-details";
import ProductDrawer from "@/components/catalog/product-drawer";
import { getAccessLevel } from "@/lib/auth/session";
import { getProductBySlug } from "@/lib/cms/products";

type InterceptedProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

async function ProductDrawerContent({
    params,
}: InterceptedProductPageProps) {
    // Establish request-time rendering before validating the session.
    await connection();

    const { slug } = await params;

    const access = await getAccessLevel();

    const product = await getProductBySlug(slug, access);

    if (!product) {
        notFound();
    }

    return (
        <ProductDrawer>
            <ProductDetails
                product={product}
                isAuthenticated={access === "authenticated"}
            />
        </ProductDrawer>
    );
}

export default function InterceptedProductPage({
    params,
}: InterceptedProductPageProps) {
    return (
        <Suspense
            fallback={
                <div
                    role="status"
                    aria-label="Loading product details"
                    className="fixed inset-0 z-50 flex items-center justify-end bg-black/30"
                >
                    <div className="flex h-full w-full items-center justify-center bg-[#F8F7F4] md:max-w-xl lg:max-w-2xl">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800" />
                    </div>
                </div>
            }
        >
            <ProductDrawerContent params={params} />
        </Suspense>
    );
}
