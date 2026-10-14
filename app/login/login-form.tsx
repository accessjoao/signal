"use client";

import { useActionState } from "react";
import Link from "next/link";

import { login, type LoginState } from "../actions/auth";

const initialState: LoginState = {
  error: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialState,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F4] px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-[#171717]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9F36A] text-lg font-bold tracking-normal">
            S
          </span>
          SIGNAL
        </Link>

        <div className="mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Partner access
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Sign in to explore the complete SIGNAL catalog
            and access exclusive partner pricing.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-[#171717]"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isPending}
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? "login-error" : undefined}
              placeholder="Enter your username"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-[#171717] outline-none transition focus:border-[#171717] focus:ring-2 focus:ring-[#D9F36A] disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#171717]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? "login-error" : undefined}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-[#171717] outline-none transition focus:border-[#171717] focus:ring-2 focus:ring-[#D9F36A] disabled:opacity-60"
            />
          </div>

          {state.error && (
            <p
              id="login-error"
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center rounded-full bg-[#171717] px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-neutral-500">
          Demo access: any non-empty username and password.
        </p>

        <div className="mt-12 border-t border-neutral-200 pt-6">
          <Link
            href="/catalog"
            className="text-sm font-medium text-[#171717] underline-offset-4 hover:underline"
          >
            ← Explore the public catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
