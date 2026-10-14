import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";

import CatalogFilters from "@/components/catalog/catalog-filters";
import CatalogGrid from "@/components/catalog/catalog-grid";
import { getAccessLevel } from "@/lib/auth/session";
import { getCategories, getProducts } from "@/lib/cms/products";

type CatalogPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
  }>;
};

function getSingleValue(
  value: string | string[] | undefined,
): string {
  return typeof value === "string" ? value.trim() : "";
}

// This component performs request-time work.
async function CatalogContent({
  searchParams,
}: CatalogPageProps) {
  // Ensure session-dependent data is resolved per request.
  await connection();

  const params = await searchParams;

  const selectedCategory = getSingleValue(params.category);
  const search = getSingleValue(params.search);

  const access = await getAccessLevel();

  // The CMS adapter handles authorization and price selection.
  const [products, categories] = await Promise.all([
    getProducts(access, {
      category: selectedCategory,
      search,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#171717]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <header className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.08em]"
          >
            SIGNAL<span className="text-[#8EA92C]">.</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:underline">
              Home
            </Link>

            {access === "authenticated" ? (
              <Link href="/partner" className="hover:underline">
                Partner portal
              </Link>
            ) : (
              <Link href="/login" className="hover:underline">
                Partner login
              </Link>
            )}
          </nav>
        </header>

        <section className="mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
            SIGNAL / Product catalog
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            Technology that moves you forward.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-neutral-600">
            Explore our communication, monitoring, and infrastructure
            solutions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        <CatalogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          search={search}
        />

        <section aria-labelledby="products-heading">
          <CatalogGrid
            products={products}
            isAuthenticated={access === "authenticated"}
          />
        </section>
      </div>
    </main>
  );
}

// This fallback can be rendered without accessing session data.
function CatalogLoading() {
  return (
    <main
      className="min-h-screen bg-[#F8F7F4] px-6 py-12 text-[#171717] lg:px-10"
      role="status"
      aria-label="Loading product catalog"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-12 flex items-center justify-between">
          <div className="h-7 w-28 rounded bg-neutral-200" />
          <div className="h-5 w-36 rounded bg-neutral-200" />
        </div>

        <div className="mb-12 space-y-5">
          <div className="h-4 w-36 rounded bg-neutral-200" />
          <div className="h-14 max-w-2xl rounded bg-neutral-200" />
          <div className="h-6 max-w-lg rounded bg-neutral-200" />
        </div>

        <div className="mb-10 h-28 rounded-2xl bg-neutral-200" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-96 rounded-2xl bg-neutral-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogContent searchParams={searchParams} />
    </Suspense>
  );
}
