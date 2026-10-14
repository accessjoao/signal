"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LoaderCircle } from "lucide-react";

import { login, type LoginState } from "../actions/auth";

const initialState: LoginState = {
  error: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialState,
  );

  const inputClassName =
    "w-full rounded-xl border border-white/10 bg-[#303538] px-4 py-4 text-sm text-[#F3F4F2] placeholder:text-white/30 outline-none transition-all duration-200 hover:border-white/20 focus:border-[#D9F36A]/60 focus:ring-2 focus:ring-[#D9F36A]/10 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div>
      <form action={formAction} noValidate className="space-y-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2.5 block text-sm font-medium text-[#F3F4F2]"
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
            aria-describedby={
              state.error ? "login-error" : undefined
            }
            placeholder="Enter your username"
            className={inputClassName}
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#F3F4F2]"
            >
              Password
            </label>

            <span className="text-xs text-white/35">
              Demo environment
            </span>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isPending}
            aria-invalid={Boolean(state.error)}
            aria-describedby={
              state.error ? "login-error" : undefined
            }
            placeholder="Enter your password"
            className={inputClassName}
          />
        </div>

        {/* Authentication error */}
        {state.error && (
          <p
            id="login-error"
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-300"
          >
            {state.error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="group flex min-h-14 w-full cursor-pointer items-center justify-between rounded-xl bg-[#D9F36A] px-6 text-sm font-semibold text-[#171A1D] transition-all duration-200 hover:bg-[#E7FF88] hover:shadow-[0_8px_30px_rgba(217,243,106,0.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F36A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>
            {isPending ? "Signing in..." : "Sign in to SIGNAL"}
          </span>

          {isPending ? (
            <LoaderCircle
              size={20}
              aria-hidden="true"
              className="animate-spin"
            />
          ) : (
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          )}
        </button>
      </form>

      {/* Public catalog navigation */}
      <div className="mt-8 border-t border-white/10 pt-7">
        <p className="mb-4 text-xs leading-6 text-[#B9BEC0]">
          Just browsing? Explore the public catalog
          without signing in.
        </p>

        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#F3F4F2] transition-colors hover:text-[#D9F36A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F36A]"
        >
          Explore public catalog
          <ArrowUpRight
            size={17}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
