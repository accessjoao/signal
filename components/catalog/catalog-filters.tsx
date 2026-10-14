import Link from "next/link";

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
  const hasActiveFilters = Boolean(selectedCategory || search);

  return (
    <form
      action="/catalog"
      method="GET"
      role="search"
      className="mb-10 rounded-2xl border border-neutral-200 bg-white p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="catalog-search"
            className="mb-2 block text-sm font-semibold"
          >
            Search products
          </label>

          <input
            id="catalog-search"
            name="search"
            type="search"
            defaultValue={search}
            placeholder="Search by name or description"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-700"
          />
        </div>

        <div className="md:w-72">
          <label
            htmlFor="catalog-category"
            className="mb-2 block text-sm font-semibold"
          >
            Category
          </label>

          <select
            id="catalog-category"
            name="category"
            defaultValue={selectedCategory}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-700"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Apply Filters
        </button>

        {hasActiveFilters && (
          <Link
            href="/catalog"
            className="rounded-full border border-neutral-300 px-6 py-3 text-center text-sm font-semibold transition hover:bg-neutral-100"
          >
            Clear Filters
          </Link>
        )}
      </div>
    </form>
  );
}
