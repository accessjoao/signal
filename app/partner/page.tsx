import { redirect } from "next/navigation";

import { getSession } from "../../lib/auth/session";

export const instant = false;

export default async function PartnerPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-semibold">Partner Portal</h1>

      <p className="mt-4 text-lg text-neutral-600">
        You are signed in to SIGNAL.
      </p>

      <p className="mt-2 text-neutral-600">
        Explore the catalog to access partner products and pricing.
      </p>
    </main>
  );
}
