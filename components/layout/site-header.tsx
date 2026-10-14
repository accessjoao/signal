import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { connection } from "next/server";

import { getAccessLevel } from "@/lib/auth/session";
import { logout } from "@/app/actions/auth";

export async function SiteHeader() {
    await connection();

    const accessLevel = await getAccessLevel();
    const isAuthenticated = accessLevel === "authenticated";

    return (
        <header className="relative z-50 border-b border-white/10 bg-[#0B0D0F] text-[#F3F4F2]">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-4 px-6 lg:px-10"
            >
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-3 text-lg font-bold tracking-[0.16em] sm:text-xl"
                    aria-label="SIGNAL homepage"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9F36A] text-lg font-black tracking-normal text-[#0B0D0F]">
                        S
                    </span>
                    SIGNAL
                </Link>

                <div className="flex items-center gap-4 sm:gap-8">
                    <Link
                        href="/catalog"
                        className="text-sm font-medium text-white/65 transition hover:text-white"
                    >
                        Products
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/partner"
                                className="hidden text-sm font-medium text-[#D9F36A] transition hover:text-white sm:inline"
                            >
                                Partner dashboard
                            </Link>

                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white transition hover:border-white/50 sm:px-5 sm:text-sm"
                                >
                                    <span>Sign out</span>
                                    <LogOut size={15} aria-hidden="true" />
                                </button>
                            </form>
                        </>
                    ) : (

                        <Link
                            href="/login"
                            aria-label="Partner access"
                            className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#D9F36A]/40 px-3 text-xs font-semibold text-[#D9F36A] transition-colors hover:border-[#D9F36A] hover:bg-[#D9F36A]/10 sm:px-5 sm:text-sm"
                        >
                            <span className="sm:hidden">Partner</span>
                            <span className="hidden sm:inline">Partner access</span>

                            <ArrowUpRight
                                size={15}
                                aria-hidden="true"
                                className="hidden transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
                            />
                        </Link>

                    )}
                </div>
            </nav>
        </header>
    );
}
