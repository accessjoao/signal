
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import ProductDetails from "@/components/catalog/product-details";
import { getAccessLevel } from "@/lib/auth/session";
import { getProductBySlug } from "@/lib/cms/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function ProductPageContent({ params }: ProductPageProps) {
  // Session-dependent content must render at request time.
  await connection();

  const { slug } = await params;

  const access = await getAccessLevel();

  // The CMS adapter enforces product visibility and pricing.
  const product = await getProductBySlug(slug, access);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#171717]">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <header className="mb-12 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.08em]"
          >
            SIGNAL<span className="text-[#8EA92C]">.</span>
          </Link>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-neutral-500"
          >
            <span aria-hidden="true">←</span>
            Back to catalog
          </Link>
        </header>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            SIGNAL / Product catalog / Details
          </p>
        </div>

        <ProductDetails
          product={product}
          isAuthenticated={access === "authenticated"}
        />

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-full bg-[#D9F36A] px-6 py-3 text-sm font-semibold transition hover:bg-[#CBE85B]"
          >
            Explore more products
          </Link>
        </div>
      </div>
    </main>
  );
}

function ProductPageLoading() {
  return (
    <main
      className="min-h-screen bg-[#F8F7F4] px-6 py-10"
      role="status"
      aria-label="Loading product details"
    >
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-12 h-7 w-28 rounded bg-neutral-200" />

        <div className="mb-8 h-4 w-48 rounded bg-neutral-200" />

        <div className="aspect-[4/3] max-h-96 rounded-2xl bg-neutral-200" />

        <div className="mt-8 space-y-4">
          <div className="h-4 w-36 rounded bg-neutral-200" />
          <div className="h-10 w-80 max-w-full rounded bg-neutral-200" />
          <div className="h-5 w-full max-w-xl rounded bg-neutral-200" />
        </div>

        <div className="mt-10 h-48 rounded-2xl bg-neutral-200" />
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductPageLoading />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
