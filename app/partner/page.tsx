import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "../actions/auth";
import { getSession } from "../../lib/auth/session";

export const instant = false;

export default async function PartnerPage() {
  await connection();

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#171717]">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9F36A] text-lg font-bold tracking-normal">
              S
            </span>
            SIGNAL
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition hover:border-[#171717] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717]"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Partner portal
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Welcome to
            <span className="block">the inside.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
            Your session is active. Explore our complete product
            lineup, including partner-exclusive products and pricing.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717]"
            >
              Explore full catalog
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-4 text-sm font-semibold transition hover:border-[#171717] hover:bg-white"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="mt-20 border-t border-neutral-300 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              SIGNAL Partner Access
            </p>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#D9F36A] px-4 py-2 text-xs font-semibold">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#171717]"
              />
              Session active
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
