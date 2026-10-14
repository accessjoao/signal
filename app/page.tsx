import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Radio,
  Network,
  Video,
  LockKeyhole,
} from "lucide-react";

import { getProducts } from "@/lib/cms/products";

const categories = [
  {
    number: "01",
    name: "Communication Devices",
    description:
      "Stay connected across teams, locations, and critical operations.",
    icon: Radio,
  },
  {
    number: "02",
    name: "Video & Monitoring",
    description:
      "Gain visibility and situational awareness when it matters most.",
    icon: Video,
  },
  {
    number: "03",
    name: "Network & Infrastructure",
    description:
      "Build resilient systems for demanding environments.",
    icon: Network,
  },
];

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default async function Home() {
  const products = (await getProducts("public")).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0B0D0F] text-[#F3F4F2]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-[#D9F36A]/[0.055] blur-[130px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-32">
          <div>
            <div className="mb-9 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#D9F36A] shadow-[0_0_18px_#D9F36A]" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D9F36A]">
                Engineered for what matters
              </span>
            </div>

            <h1 className="max-w-4xl text-[clamp(3.8rem,8vw,7.6rem)] font-semibold leading-[0.94] tracking-[-0.075em]">
              Connection
              <br />
              is <span className="text-[#D9F36A]">everything.</span>
            </h1>

            <p className="mt-9 max-w-lg text-base leading-8 text-[#A6ADB1] sm:text-lg">
              Advanced communications, monitoring, and infrastructure
              technology built to perform when it matters most.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link
                href="/catalog"
                className="group inline-flex min-h-14 items-center gap-8 rounded-full bg-[#D9F36A] px-7 text-sm font-semibold text-[#0B0D0F] transition hover:bg-[#e7ff88]"
              >
                Explore the catalog
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                href="#solutions"
                className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/20 px-7 text-sm font-medium text-white transition hover:border-white/50"
              >
                Discover solutions
                <ArrowDownRight size={18} />
              </Link>
            </div>

            <div className="mt-20 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  03
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/45">
                  Technology categories
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  24/7
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/45">
                  Mission-ready mindset
                </p>
              </div>
            </div>
          </div>

          {/* Abstract technology visual */}

          {/* Orbital animation */}
          <div
            aria-hidden="true"
            className="relative mx-auto aspect-square w-full max-w-[510px]"
          >
            {/* Soft ambient glow */}
            <div className="pointer-events-none absolute inset-[20%] rounded-full bg-[#D9F36A]/[0.04] blur-[70px]" />

            {/* Outer orbit */}
            <div className="absolute inset-[3%] rounded-full border border-white/10">
              <div className="signal-orbit signal-orbit-outer absolute inset-0">
                <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9F36A] shadow-[0_0_18px_#D9F36A,0_0_40px_#D9F36A55]" />
              </div>
            </div>

            {/* Middle orbit */}
            <div className="absolute inset-[16%] rounded-full border border-white/15">
              <div className="signal-orbit signal-orbit-middle absolute inset-0">
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9F36A] shadow-[0_0_15px_#D9F36A,0_0_30px_#D9F36A44]" />
              </div>
            </div>

            {/* Inner orbit */}
            <div className="absolute inset-[29%] rounded-full border border-[#D9F36A]/20">
              <div className="signal-orbit signal-orbit-inner absolute inset-0">
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9F36A] shadow-[0_0_14px_#D9F36A]" />
              </div>
            </div>

            {/* Central sphere */}
            <div className="absolute inset-[43%] rounded-full border border-[#D9F36A]/25 bg-[#D9F36A]/10 shadow-[0_0_60px_#D9F36A18]">
              <div className="absolute inset-[30%] rounded-full bg-[#D9F36A] shadow-[0_0_25px_#D9F36A88]" />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        className="border-t border-white/10 bg-[#15191C] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D9F36A]">
                Explore our ecosystem
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Built for every
                <br />
                critical connection.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#A6ADB1]">
              From frontline communication to resilient network
              infrastructure, discover technology designed to work
              together.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={{
                    pathname: "/catalog",
                    query: { category: category.name },
                  }}
                  className="group flex min-h-[330px] flex-col justify-between rounded-2xl border border-white/10 bg-[#202528] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#D9F36A]/50 hover:bg-[#292F32]"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      size={32}
                      strokeWidth={1.4}
                      className="text-[#D9F36A]"
                    />
                    <span className="text-xs text-white/35">
                      {category.number} / 03
                    </span>
                  </div>

                  <div>
                    <h3 className="max-w-[250px] text-2xl font-semibold tracking-tight">
                      {category.name}
                    </h3>
                    <p className="mt-4 max-w-[270px] text-sm leading-6 text-white/50">
                      {category.description}
                    </p>
                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-widest text-[#D9F36A]">
                      Explore products
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured public products */}
      <section className="bg-[#292D30] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D9F36A]">
                Selected technology
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Featured products.
              </h2>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#D9F36A] transition hover:text-white"
            >
              View full catalog
              <ArrowUpRight size={19} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={`/catalog/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#383D40] transition hover:border-[#D9F36A]/50"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#303538]">
                  <div className="absolute h-44 w-44 rounded-full border border-white/10" />
                  <div className="absolute h-28 w-28 rounded-full border border-[#D9F36A]/20" />
                  <Radio
                    size={64}
                    strokeWidth={0.9}
                    className="relative text-[#D9F36A]/55 transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-6 top-6 text-xs text-white/35">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9F36A]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {product.name}
                  </h3>

                  <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-white/50">
                    {product.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-lg font-semibold">
                      {formatPrice(product.displayPrice)}
                    </span>
                    <ArrowUpRight
                      size={21}
                      className="text-[#D9F36A] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partner access */}
      <section className="relative overflow-hidden bg-[#D9F36A] py-24 text-[#0B0D0F] sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-48 h-[650px] w-[650px] rounded-full border-[90px] border-black/[0.035]"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-12 px-6 lg:flex-row lg:items-end lg:px-10">
          <div>
            <div className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
              <LockKeyhole size={16} />
              Partner network
            </div>

            <h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.065em] sm:text-7xl">
              More access.
              <br />
              More possibilities.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-black/65">
              Sign in to explore the complete product portfolio and
              access exclusive partner pricing.
            </p>
          </div>

          <Link
            href="/login"
            className="group inline-flex min-h-16 shrink-0 items-center justify-between gap-12 self-start rounded-full bg-[#0B0D0F] px-8 text-sm font-semibold text-white transition hover:bg-[#252A2D]"
          >
            Access partner portal
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0B0D0F]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-10 sm:flex-row">
            <div>
              <p className="text-xl font-bold tracking-[0.16em]">
                SIGNAL<span className="text-[#D9F36A]">.</span>
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">
                Connected technology for the moments that matter.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-5 text-sm text-white/60">
              <Link href="/catalog" className="hover:text-white">
                Products
              </Link>
              <Link href="/login" className="hover:text-white">
                Partner access
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
            <span>© 2026 SIGNAL.</span>
            <span>
              Product catalog demonstration · Motorola Solutions
              technical assessment
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
