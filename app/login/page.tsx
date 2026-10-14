import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ArrowUpRight, LockKeyhole, Radio } from "lucide-react";

import { getSession } from "../../lib/auth/session";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  await connection();

  const session = await getSession();

  if (session) {
    redirect("/partner");
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#171A1D] text-[#F3F4F2]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1600px] lg:grid-cols-2">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[#202427] px-12 py-16 lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-1/4 h-[350px] w-[350px] rounded-full border border-[#D9F36A]/20"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-1/3 h-[200px] w-[200px] rounded-full bg-[#D9F36A]/[0.06] blur-3xl"
          />

          <div className="relative flex items-center gap-3">
            <Radio
              size={20}
              strokeWidth={1.5}
              className="text-[#D9F36A]"
              aria-hidden="true"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B9BEC0]">
              Partner network
            </span>
          </div>

          <div className="relative max-w-xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
              SIGNAL / Partner access
            </p>

            <h1 className="text-5xl font-semibold leading-[1.1] tracking-[-0.06em] xl:text-6xl">
              Built for those
              <br />
              who keep the world
              <br />
              <span className="text-[#D9F36A]">
                connected.
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-8 text-[#B9BEC0]">
              Access your partner catalog, explore specialized
              equipment, and view exclusive pricing through
              one connected platform.
            </p>
          </div>

          <div className="relative flex items-center justify-between border-t border-white/10 pt-6">
            <span className="text-xs text-white/40">
              SIGNAL Equipment Platform
            </span>

            <span className="flex items-center gap-2 text-xs text-[#D9F36A]">
              Connected by design
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </section>

        {/* Login panel */}
        <section className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D9F36A]/20 bg-[#D9F36A]/10">
              <LockKeyhole
                size={25}
                strokeWidth={1.5}
                className="text-[#D9F36A]"
                aria-hidden="true"
              />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
              Partner sign in
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Welcome back.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#B9BEC0]">
              Enter your credentials to access the
              partner catalog and pricing.
            </p>

            <div className="mt-10">
              <LoginForm />
            </div>

            <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6">
              <LockKeyhole
                size={16}
                className="mt-0.5 shrink-0 text-[#D9F36A]"
                aria-hidden="true"
              />

              <p className="text-xs leading-6 text-[#B9BEC0]">
                This is a demonstration environment.
                Any non-empty username and password
                will grant simulated partner access.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginPageLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171A1D] px-6">
      <p className="text-sm text-[#B9BEC0]">
        Loading sign in...
      </p>
    </main>
  );
}
