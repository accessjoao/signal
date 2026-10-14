import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  LockKeyhole,
  LogOut,
  Radio,
  ShieldCheck,
  Tag,
} from "lucide-react";

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
    <main className="min-h-[calc(100vh-80px)] bg-[#171A1D] text-[#F3F4F2]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#202427]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full border border-white/[0.06]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-[450px] w-[450px] rounded-full border border-[#D9F36A]/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D9F36A]/[0.035] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#D9F36A] shadow-[0_0_14px_rgba(217,243,106,0.4)]"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
                SIGNAL / Partner portal
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9F36A]/20 bg-[#D9F36A]/10 px-4 py-2 text-xs font-semibold text-[#D9F36A]">
              <ShieldCheck size={15} aria-hidden="true" />
              Session active
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              You&apos;re connected.
              <span className="mt-2 block text-[#D9F36A]">
                Go further.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#B9BEC0] sm:text-lg">
              Your partner session is active. Explore the complete
              SIGNAL equipment catalog, including exclusive products
              and authenticated pricing.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-xl bg-[#D9F36A] px-7 text-sm font-semibold text-[#171A1D] transition-all duration-200 hover:bg-[#E7FF88] hover:shadow-[0_8px_30px_rgba(217,243,106,0.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F36A]"
              >
                Explore full catalog
                <ArrowUpRight
                  size={19}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/15 px-7 text-sm font-semibold text-[#F3F4F2] transition-colors hover:border-white/30 hover:bg-white/[0.05]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
              Your access
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              More access. More possibilities.
            </h2>
          </div>

          <span className="text-xs uppercase tracking-[0.16em] text-[#B9BEC0]">
            Authenticated experience
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Full catalog */}
          <div className="rounded-2xl border border-white/10 bg-[#292D30] p-7 transition-colors hover:border-[#D9F36A]/25">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9F36A]/20 bg-[#D9F36A]/10">
              <Radio
                size={23}
                strokeWidth={1.5}
                className="text-[#D9F36A]"
                aria-hidden="true"
              />
            </div>

            <h3 className="text-xl font-semibold tracking-tight">
              Expanded catalog
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#B9BEC0]">
              Browse the complete product collection, including
              equipment reserved for authenticated partners.
            </p>
          </div>

          {/* Partner pricing */}
          <div className="rounded-2xl border border-white/10 bg-[#292D30] p-7 transition-colors hover:border-[#D9F36A]/25">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9F36A]/20 bg-[#D9F36A]/10">
              <Tag
                size={23}
                strokeWidth={1.5}
                className="text-[#D9F36A]"
                aria-hidden="true"
              />
            </div>

            <h3 className="text-xl font-semibold tracking-tight">
              Partner pricing
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#B9BEC0]">
              View pricing selected for your authenticated session,
              rendered securely on the server.
            </p>
          </div>

          {/* Secure access */}
          <div className="rounded-2xl border border-white/10 bg-[#292D30] p-7 transition-colors hover:border-[#D9F36A]/25">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9F36A]/20 bg-[#D9F36A]/10">
              <LockKeyhole
                size={23}
                strokeWidth={1.5}
                className="text-[#D9F36A]"
                aria-hidden="true"
              />
            </div>

            <h3 className="text-xl font-semibold tracking-tight">
              Protected access
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#B9BEC0]">
              Your session controls access to restricted product
              information and partner-only catalog routes.
            </p>
          </div>
        </div>
      </section>

      {/* Session footer */}
      <section className="border-t border-white/10 bg-[#202427]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8 sm:px-10">
          <div className="flex items-center gap-3">
            <BadgeCheck
              size={20}
              className="text-[#D9F36A]"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-semibold">
                Partner access enabled
              </p>

              <p className="mt-1 text-xs text-[#B9BEC0]">
                Your authenticated session is active.
              </p>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[#B9BEC0] transition-colors hover:border-white/30 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F36A]"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
