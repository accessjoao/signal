
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ProductDrawerProps = {
  children: ReactNode;
};

export default function ProductDrawer({
  children,
}: ProductDrawerProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [isClosing, setIsClosing] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const hasNavigatedRef = useRef(false);

  const closeDrawer = useCallback(() => {
    if (hasNavigatedRef.current || isClosing) return;

    setIsClosing(true);
  }, [isClosing]);

  const finishClosing = useCallback(() => {
    if (hasNavigatedRef.current) return;

    hasNavigatedRef.current = true;
    router.back();
  }, [router]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusableElements =
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!first || !last) return;

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [closeDrawer]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close product details"
        onClick={closeDrawer}
        disabled={isClosing}
        className="absolute inset-0 h-full w-full cursor-pointer bg-[#050607]/75 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{
          duration: shouldReduceMotion
            ? 0
            : isClosing
              ? 0.3
              : 0.32,
        }}
      />

      {/* Drawer panel */}
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-white/10 bg-[#292D30] text-[#F3F4F2] shadow-[-24px_0_80px_rgba(0,0,0,0.35)] md:max-w-xl lg:max-w-2xl"
        initial={{
          x: shouldReduceMotion ? 0 : "100%",
        }}
        animate={{
          x: isClosing ? "100%" : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.32,
          ease: isClosing
            ? [0.4, 0, 1, 1]
            : [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          if (isClosing) {
            finishClosing();
          }
        }}
      >
        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-[#292D30] px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-[#D9F36A] shadow-[0_0_12px_rgba(217,243,106,0.35)]"
            />

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F3F4F2]">
                SIGNAL
                <span className="ml-2 text-[#D9F36A]">
                  /
                </span>
                <span className="ml-2 text-[#B9BEC0]">
                  Product details
                </span>
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                Equipment catalog
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            disabled={isClosing}
            aria-label="Close product details"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#F3F4F2] transition-all duration-200 hover:rotate-90 hover:border-[#D9F36A]/50 hover:bg-[#D9F36A] hover:text-[#171A1D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9F36A] disabled:cursor-not-allowed"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable product content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-10">
          {children}
        </div>

        {/* Bottom accent */}
        <div
          aria-hidden="true"
          className="h-[2px] shrink-0 bg-gradient-to-r from-transparent via-[#D9F36A]/60 to-transparent"
        />
      </motion.aside>
    </div>
  );
}
