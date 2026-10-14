import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";

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

async function CatalogContent({
  searchParams,
}: CatalogPageProps) {
  await connection();

  const params = await searchParams;

  const selectedCategory = getSingleValue(params.category);
  const search = getSingleValue(params.search);

  const access = await getAccessLevel();
  const isAuthenticated = access === "authenticated";

  // The CMS adapter remains responsible for authorization,
  // product visibility, and server-side price selection.
  const [products, categories] = await Promise.all([
    getProducts(access, {
      category: selectedCategory,
      search,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#292D30] text-[#F3F4F2]">
      {/* Catalog introduction */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#171A1D]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-72 h-[650px] w-[650px] rounded-full bg-[#D9F36A]/[0.045] blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
              <Link
                href="/"
                className="text-white/45 transition hover:text-white"
              >
                Home
              </Link>

              <ArrowRight
                size={13}
                className="text-white/30"
                aria-hidden="true"
              />

              <span className="text-[#D9F36A]">
                Product catalog
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9F36A]" />
              {isAuthenticated
                ? "Partner catalog"
                : "Public catalog"}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#D9F36A]">
                SIGNAL / Technology portfolio
              </p>

              <h1 className="max-w-4xl text-[clamp(3.2rem,6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.07em]">
                Technology that
                <br />
                <span className="text-[#D9F36A]">
                  moves you forward.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#A6ADB1] sm:text-lg">
                Explore connected communication, monitoring, and
                infrastructure solutions engineered for demanding
                environments.
              </p>
            </div>

            {!isAuthenticated && (
              <Link
                href="/login"
                className="group flex max-w-sm items-center gap-4 rounded-2xl border border-[#D9F36A]/20 bg-[#D9F36A]/[0.06] p-5 transition hover:border-[#D9F36A]/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9F36A]/10 text-[#D9F36A]">
                  <LockKeyhole size={20} />
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-semibold">
                    Partner access
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/50">
                    Unlock additional products and partner pricing.
                  </span>
                </span>

                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-[#D9F36A] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            )}
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-white/10 pt-7">
            {categories.map((category) => (
              <Link
                key={category}
                href={{
                  pathname: "/catalog",
                  query: { category },
                }}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  selectedCategory === category
                    ? "border-[#D9F36A] bg-[#D9F36A] text-[#171A1D]"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog controls and product results */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
              Explore the collection
            </p>

            <h2
              id="products-heading"
              className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              All products
            </h2>
          </div>

          <p className="text-sm text-[#B9BEC0]">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}{" "}
            available
          </p>
        </div>

        <CatalogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          search={search}
        />

        <section
          aria-labelledby="products-heading"
          className="mt-10"
        >
          <CatalogGrid
            products={products}
            isAuthenticated={isAuthenticated}
          />
        </section>
      </section>
    </main>
  );
}

function CatalogLoading() {
  return (
    <main
      className="min-h-screen bg-[#292D30] text-[#F3F4F2]"
      role="status"
      aria-label="Loading product catalog"
    >
      <div className="border-b border-white/10 bg-[#171A1D]">
        <div className="mx-auto max-w-7xl animate-pulse px-6 py-20 lg:px-10">
          <div className="mb-12 h-4 w-40 rounded bg-white/10" />

          <div className="space-y-5">
            <div className="h-4 w-44 rounded bg-white/10" />
            <div className="h-16 max-w-3xl rounded bg-white/10" />
            <div className="h-16 max-w-xl rounded bg-white/10" />
            <div className="h-5 max-w-lg rounded bg-white/10" />
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-9 w-40 rounded-full bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl animate-pulse px-6 py-14 lg:px-10">
        <div className="mb-10 h-24 rounded-2xl bg-white/10" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-96 rounded-2xl bg-white/10"
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
