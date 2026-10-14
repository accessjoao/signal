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
    <ProductDetails
      product={product}
      isAuthenticated={access === "authenticated"}
    />
  );
}

function DrawerLoading() {
  return (
    <div
      role="status"
      aria-label="Loading product details"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
    >
      <div
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#D9F36A]"
      />

      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B9BEC0]">
        Loading product details
      </p>
    </div>
  );
}

export default function InterceptedProductPage({
  params,
}: InterceptedProductPageProps) {
  return (
    <ProductDrawer>
      <Suspense fallback={<DrawerLoading />}>
        <ProductDrawerContent params={params} />
      </Suspense>
    </ProductDrawer>
  );
}
