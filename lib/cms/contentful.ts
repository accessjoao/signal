import "server-only";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

interface ContentfulEntry {
  sys: {
    id: string;
  };
  fields: Record<string, unknown>;
}

interface ContentfulResponse {
  items: ContentfulEntry[];
  includes?: {
    Asset?: Array<{
      sys: { id: string };
      fields: Record<string, unknown>;
    }>;
  };
  total: number;
  skip: number;
  limit: number;
}

export async function fetchContentfulProducts() {
  if (!spaceId || !deliveryToken) {
    throw new Error("Missing Contentful configuration");
  }

  const allEntries: ContentfulEntry[] = [];
  const assets = new Map<string, string>();
  let skip = 0;

  while (true) {
    const url = new URL(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`
    );

    url.searchParams.set("content_type", "product");
    url.searchParams.set("include", "1");
    url.searchParams.set("limit", "100");
    url.searchParams.set("skip", String(skip));

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${deliveryToken}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Contentful request failed: ${response.status}`);
    }

    const data = (await response.json()) as ContentfulResponse;

    allEntries.push(...data.items);

    for (const asset of data.includes?.Asset ?? []) {
      const file = asset.fields.file;
      if (
        typeof file === "object" &&
        file !== null &&
        "url" in file &&
        typeof file.url === "string"
      ) {
        assets.set(asset.sys.id, file.url);
      }
    }

    skip += data.items.length;

    if (skip >= data.total || data.items.length === 0) {
      break;
    }
  }

  return allEntries.map((entry) => {
    const fields = entry.fields;
    const image = fields.image as
      | { sys?: { id?: string } }
      | undefined;

    const assetUrl = image?.sys?.id
      ? assets.get(image.sys.id)
      : undefined;

    return {
      id: entry.sys.id,
      slug: fields.slug,
      name: fields.name,
      description: fields.description,
      category: fields.category,
      specifications: fields.specifications,
      priceLoggedOut: fields.publicPrice,
      priceAuthenticated: fields.authenticatedPrice,
      visibility: fields.accessLevel,
      image: assetUrl
        ? assetUrl.startsWith("//")
          ? `https:${assetUrl}`
          : assetUrl
        : null,
    };
  });
}
