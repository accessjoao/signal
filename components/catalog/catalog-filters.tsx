"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LoaderCircle,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import CategorySelect from "./category-select";

type CatalogFiltersProps = {
  categories: string[];
  selectedCategory: string;
  search: string;
};

export default function CatalogFilters({
  categories,
  selectedCategory,
  search,
}: CatalogFiltersProps) {
  return (
    <CatalogFiltersForm
      key={`${selectedCategory}\u0000${search}`}
      categories={categories}
      selectedCategory={selectedCategory}
      search={search}
    />
  );
}

function CatalogFiltersForm({
  categories,
  selectedCategory,
  search,
}: CatalogFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(search);

  const hasActiveFilters = Boolean(selectedCategory || search);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const category = String(formData.get("category") ?? "");
    const searchTerm = searchValue.trim();

    const params = new URLSearchParams();

    if (category && category !== "all") {
      params.set("category", category);
    }

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    const query = params.toString();
    const url = query ? `/catalog?${query}` : "/catalog";

    startTransition(() => {
      router.push(url, { scroll: false });
    });
  }

  function handleClear() {
    setSearchValue("");

    startTransition(() => {
      router.push("/catalog", { scroll: false });
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-busy={isPending}
      className="rounded-2xl border border-white/10 bg-[#383D40] p-5 sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SlidersHorizontal
            size={19}
            strokeWidth={1.8}
            className="text-[#D9F36A]"
            aria-hidden="true"
          />

          <h3 className="text-sm font-semibold tracking-tight text-[#F3F4F2]">
            Refine your search
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isPending}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#B9BEC0] transition hover:text-[#D9F36A] disabled:opacity-50"
          >
            <X size={14} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <div className="min-w-0 flex-1">
          <label
            htmlFor="catalog-search"
            className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#B9BEC0]"
          >
            Search products
          </label>

          <div className="relative">
            <Search
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <input
              id="catalog-search"
              name="search"
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by name or description"
              className="min-h-13 w-full rounded-xl border border-white/10 bg-[#292D30] py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#D9F36A] focus:ring-2 focus:ring-[#D9F36A]/15"
            />
          </div>
        </div>

        {/* Category */}
        <div className="lg:w-72">
          <label
            htmlFor="catalog-category"
            className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#B9BEC0]"
          >
            Category
          </label>

          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-4 rounded-xl bg-[#D9F36A] px-7 py-3 text-sm font-semibold text-[#171A1D] transition hover:bg-[#e7ff88] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9F36A] disabled:cursor-wait disabled:opacity-75"
        >
          {isPending ? (
            <>
              Applying...
              <LoaderCircle
                size={18}
                aria-hidden="true"
                className="animate-spin"
              />
            </>
          ) : (
            <>
              Apply filters
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
