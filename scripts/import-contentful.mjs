import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
const locale = "en-US";

if (!spaceId || !token) {
  throw new Error("Missing Contentful configuration");
}

const products = JSON.parse(
  await readFile(resolve("data/products.json"), "utf8"),
);

const baseUrl =
  `https://api.contentful.com/spaces/${spaceId}` +
  `/environments/${environment}`;

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Contentful API error (${response.status}): ${JSON.stringify(data)}`,
    );
  }

  return data;
}

async function getExistingEntry(entryId) {
  const response = await fetch(`${baseUrl}/entries/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to check entry ${entryId}: ${response.status}`,
    );
  }

  return response.json();
}

async function importProduct(product) {
  const entryId = product.id;

  const fields = {
    name: { [locale]: product.name },
    slug: { [locale]: product.slug },
    description: { [locale]: product.description },
    category: { [locale]: product.category },
    specifications: { [locale]: product.specifications },
    accessLevel: { [locale]: product.visibility },
    publicPrice: { [locale]: product.priceLoggedOut },
    authenticatedPrice: { [locale]: product.priceAuthenticated },
  };

  const existingEntry = await getExistingEntry(entryId);

  const headers = {
    "X-Contentful-Content-Type": "product",
  };

  if (existingEntry) {
    headers["X-Contentful-Version"] = String(
      existingEntry.sys.version,
    );
  }

  // Create a new entry or update an existing one.
  const entry = await request(`/entries/${entryId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ fields }),
  });

  // Publish using the latest version returned by Contentful.
  await request(`/entries/${entryId}/published`, {
    method: "PUT",
    headers: {
      "X-Contentful-Version": String(entry.sys.version),
    },
  });

  console.log(`Published: ${product.name}`);
}

async function main() {
  console.log(`Importing ${products.length} products into Contentful...`);

  for (const product of products) {
    await importProduct(product);
  }

  console.log(`Successfully imported ${products.length} products.`);
}

main().catch((error) => {
  console.error("Contentful import failed:", error.message);
  process.exitCode = 1;
});
