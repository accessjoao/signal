import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0D0F] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          {/* Branding */}
          <div>
            <Link
              href="/"
              aria-label="SIGNAL home"
              className="inline-block text-xl font-bold tracking-[0.16em]"
            >
              SIGNAL<span className="text-[#D9F36A]">.</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">
              Connected technology for the moments that matter.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-10 gap-y-5 text-sm text-white/60"
          >
            <Link
              href="/catalog"
              className="transition-colors hover:text-white"
            >
              Products
            </Link>

            <Link
              href="/login"
              className="transition-colors hover:text-white"
            >
              Partner access
            </Link>
          </nav>
        </div>
      </div>

      {/* Full-width divider */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-white/10"
      />

      {/* Bottom footer content */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 lg:px-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          {/* Copyright */}
          <span className="text-xs text-white/35">
            © 2026 SIGNAL. Concept project.
          </span>

          {/* Developer credit */}
          <span className="text-xs text-white/45">
            Designed &amp; developed by{" "}
            <a
              href="https://github.com/accessjoao"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/75 transition-colors hover:text-[#D9F36A] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F36A]"
            >
              Joao Felipe Silveira
            </a>
          </span>
        </div>

        {/* Project description */}
        <p className="mt-5 text-[11px] text-white/25">
          Independent full-stack product catalog project
        </p>
      </div>
    </footer>
  );
}
