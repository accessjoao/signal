import { describe, expect, it, vi } from "vitest";

// Next enforces this marker during application compilation; unit tests run in Node.
// Keep this test-only mock out of production configuration.
vi.mock("server-only", () => ({}));

import seed from "../data/products.json";
import { getCategories, getProductBySlug, getProducts } from "../lib/cms/products";
import {
  filterByCategory,
  findProductBySlug,
  isProductVisible,
  normalizeProducts,
  searchProducts,
  selectDisplayPrice,
  toDisplayProduct,
} from "../lib/products/product-rules";
import { PRODUCT_CATEGORIES } from "../types/product";

const raw = normalizeProducts(seed);
const publicProduct = raw[0];
const privateProduct = raw[3];

describe("CMS seed integrity", () => {
  it("has 12 complete unique products with both sets in each required category", () => {
    expect(seed).toHaveLength(12);
    expect(raw).toEqual(seed);
    expect(new Set(seed.map((product) => product.id)).size).toBe(12);
    expect(new Set(seed.map((product) => product.slug)).size).toBe(12);
    for (const category of PRODUCT_CATEGORIES) {
      const products = raw.filter((product) => product.category === category);
      expect(products).toHaveLength(4);
      expect(products.some((product) => product.visibility === "public")).toBe(true);
      expect(products.some((product) => product.visibility === "authenticated")).toBe(true);
    }
    for (const product of raw) {
      expect(product.specifications.length).toBeGreaterThan(0);
      expect(product.priceLoggedOut).toBeGreaterThan(0);
      expect(product.priceAuthenticated).toBeGreaterThan(0);
      expect(product.priceAuthenticated).toBeLessThan(product.priceLoggedOut);
    }
  });
});

describe("server authorization and price projection", () => {
  it("allows public products to both levels, and private products only to partners", () => {
    expect(isProductVisible(publicProduct, "public")).toBe(true);
    expect(isProductVisible(publicProduct, "authenticated")).toBe(true);
    expect(isProductVisible(privateProduct, "public")).toBe(false);
    expect(isProductVisible(privateProduct, "authenticated")).toBe(true);
    expect(toDisplayProduct(privateProduct, "public")).toBeNull();
    expect(selectDisplayPrice(privateProduct, "public")).toBeNull();
  });

  it("selects the authorized price and allows zero-valued prices", () => {
    expect(selectDisplayPrice(publicProduct, "public")).toBe(34900);
    expect(selectDisplayPrice(publicProduct, "authenticated")).toBe(29900);
    expect(selectDisplayPrice(privateProduct, "authenticated")).toBe(249900);
    expect(toDisplayProduct({ ...publicProduct, priceLoggedOut: 0 }, "public")?.displayPrice).toBe(0);
  });

  it("allowlists fields including nested specifications and does not mutate the source", () => {
    const extended = {
      ...publicProduct,
      internalNote: "do not serialize",
      specifications: [{ label: "Ports", value: "8", internalNote: "private" }],
    };
    const result = toDisplayProduct(extended, "public");
    expect(Object.keys(result!).sort()).toEqual([
      "category", "description", "displayPrice", "id", "image", "name", "slug", "specifications",
    ]);
    expect(result?.specifications).toEqual([{ label: "Ports", value: "8" }]);
    result!.specifications[0].value = "changed";
    expect(extended.specifications[0].value).toBe("8");
    expect(extended.priceAuthenticated).toBe(29900);
  });
});

describe("adapter public contract", () => {
  it("returns only set A and public prices to public callers, and A+B partner prices to partners", async () => {
    const publicResults = await getProducts("public");
    const partnerResults = await getProducts("authenticated");
    expect(publicResults.map((product) => product.id)).toEqual(
      seed.filter((product) => product.visibility === "public").map((product) => product.id),
    );
    expect(publicResults).toHaveLength(8);
    expect(partnerResults).toHaveLength(12);
    for (const result of publicResults) {
      expect(result.displayPrice).toBe(seed.find((product) => product.id === result.id)?.priceLoggedOut);
    }
    for (const result of partnerResults) {
      expect(result.displayPrice).toBe(seed.find((product) => product.id === result.id)?.priceAuthenticated);
    }
    for (const results of [publicResults, partnerResults]) {
      expect(JSON.stringify(results)).not.toMatch(/priceLoggedOut|priceAuthenticated|visibility/);
    }
    const serialized = JSON.stringify(publicResults);
    for (const product of seed) {
      expect(serialized).not.toContain(`"displayPrice":${product.priceAuthenticated}`);
      if (product.visibility === "authenticated") {
        for (const value of [product.id, product.slug, product.name, product.description]) {
          expect(serialized).not.toContain(value);
        }
      }
    }
  });

  it("does not let partner traffic or mutated returned data affect later public calls", async () => {
    const partnerResults = await getProducts("authenticated");
    partnerResults[0].specifications[0].value = "mutated";
    partnerResults[0].displayPrice = 1;
    const later = await getProducts("public");
    expect(later[0].specifications[0].value).toBe("18 hours");
    expect(later[0].displayPrice).toBe(34900);
    expect(later).toHaveLength(8);
  });

  it("returns null for unknown, malformed and unauthorized slugs", async () => {
    for (const slug of ["not-a-product", "", "../relay-r1-handheld", privateProduct.slug]) {
      expect(await getProductBySlug(slug, "public")).toBeNull();
    }
    expect(await getProductBySlug(privateProduct.slug, "authenticated")).toMatchObject({
      id: privateProduct.id, displayPrice: 249900,
    });
    expect(await getProductBySlug(publicProduct.slug, "public")).toMatchObject({ displayPrice: 34900 });
  });

  it("combines category and trimmed case-insensitive name/description search after authorization", async () => {
    expect((await getProducts("public", { category: "Communication Devices", search: "  RELAY " }))
      .map((product) => product.id)).toEqual(["com-001", "com-002"]);
    expect((await getProducts("public", { search: "WAREHOUSE" })).map((product) => product.id))
      .toEqual(["com-001"]);
    expect(await getProducts("public", { search: "incident response" })).toEqual([]);
    expect((await getProducts("authenticated", { search: "incident response" })).map((product) => product.id))
      .toEqual(["com-004"]);
    expect(await getProducts("public", { category: "Video & Monitoring", search: "relay" })).toEqual([]);
    expect(await getProducts("public", { category: "unknown" })).toEqual([]);
    expect(await getProducts("public", { category: " ", search: " " })).toEqual(await getProducts("public"));
    expect(getCategories()).toEqual(PRODUCT_CATEGORIES);
  });

  it("exposes deterministic pure lookup/filter/search functions without changing the input", async () => {
    const products = await getProducts("public");
    const before = structuredClone(products);
    expect(findProductBySlug(products, "relay-r1-handheld")).toEqual(products[0]);
    expect(findProductBySlug(products, "missing")).toBeNull();
    expect(filterByCategory(products, " Network & Infrastructure ")).toHaveLength(2);
    expect(searchProducts(products, "  WAREHOUSE  ")).toEqual([products[0]]);
    expect(searchProducts(products, "absent term")).toEqual([]);
    expect(searchProducts([], "relay")).toEqual([]);
    expect(products).toEqual(before);
  });
});

describe("malformed CMS content", () => {
  it.each([null, undefined, {}, "invalid"])("returns an empty catalog for a non-array payload %s", (content) => {
    expect(normalizeProducts(content)).toEqual([]);
  });

  it.each([
    { visibility: "partner" }, { visibility: undefined }, { category: "unknown" },
    { priceLoggedOut: -1 }, { priceAuthenticated: NaN }, { priceAuthenticated: Infinity },
    { priceLoggedOut: 2.5 }, { priceAuthenticated: "29900" },
    { priceLoggedOut: Number.MAX_SAFE_INTEGER + 1 }, { id: "" },
    { slug: "../bad" }, { name: " " }, { description: null },
  ])("omits invalid required fields without dropping valid records: %j", (changes) => {
    expect(normalizeProducts([{ ...publicProduct, ...changes }, privateProduct])).toEqual([privateProduct]);
  });

  it("omits duplicate IDs/slugs and malformed records deterministically", () => {
    expect(normalizeProducts([
      null, false, [], publicProduct,
      { ...publicProduct, slug: "different-slug" },
      { ...publicProduct, id: "different-id" }, privateProduct,
    ])).toEqual([publicProduct, privateProduct]);
  });

  it("normalizes absent images/specs and strips unrecognized nested fields", () => {
    expect(normalizeProducts([{ ...publicProduct, image: undefined, specifications: undefined }])[0])
      .toMatchObject({ image: null, specifications: [] });
    const [product] = normalizeProducts([{
      ...publicProduct,
      image: "https://unapproved.example/image.jpg",
      specifications: [null, { label: " ", value: "bad" }, { label: " Ports ", value: " 8 ", secret: true }],
    }]);
    expect(product.image).toBeNull();
    expect(product.specifications).toEqual([{ label: "Ports", value: "8" }]);
    expect(normalizeProducts([{ ...publicProduct, image: "/images/radio.webp" }])[0].image)
      .toBe("/images/radio.webp");
  });
});
