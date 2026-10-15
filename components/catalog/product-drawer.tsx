"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ProductDrawerProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function ProductDrawer({
  children,
  onClose,
}: ProductDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const isClosingRef = useRef(false);
  const hasClosedRef = useRef(false);

  const closeDrawer = useCallback(() => {
    if (hasClosedRef.current || isClosingRef.current) return;

    isClosingRef.current = true;
    setIsClosing(true);
  }, []);

  const finishClosing = useCallback(() => {
    if (hasClosedRef.current) return;

    hasClosedRef.current = true;
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isClosing) return;

    // Reduced motion has no transitionend; cancellation must not trap the user.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeout = window.setTimeout(finishClosing, reducedMotion.matches ? 0 : 350);

    return () => window.clearTimeout(timeout);
  }, [isClosing, finishClosing]);

  useLayoutEffect(() => {
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;

    if (!panel) return;

    const getTabbableElements = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]',
      )).filter((element) =>
        element.tabIndex >= 0 &&
        !element.matches(":disabled") &&
        !element.closest("[inert], [hidden]") &&
        element.getClientRects().length > 0 &&
        window.getComputedStyle(element).visibility === "visible",
      );

    (closeButtonRef.current ?? panel).focus({ preventScroll: true });

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !panel.contains(event.target)) {
        (getTabbableElements()[0] ?? panel).focus({ preventScroll: true });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      }

      if (event.key === "Tab") {
        const focusableElements = getTabbableElements();

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!first || !last) {
          event.preventDefault();
          panel.focus({ preventScroll: true });
          return;
        }

        const activeElement = document.activeElement;
        if (!activeElement || !focusableElements.includes(activeElement as HTMLElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus({ preventScroll: true });
          return;
        }

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
    document.addEventListener("focusin", handleFocusIn);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.body.style.overflow = previousOverflow;

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [closeDrawer]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close product details"
        onClick={closeDrawer}
        disabled={isClosing}
        className={`absolute inset-0 h-full w-full cursor-pointer bg-[#050607]/75 backdrop-blur-[3px] transition-opacity duration-300 starting:opacity-0 motion-reduce:transition-none ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Drawer panel */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        onTransitionEnd={(event) => {
          if (
            isClosing &&
            event.target === event.currentTarget &&
            event.propertyName === "translate"
          ) {
            finishClosing();
          }
        }}
        // The resting style is visible. CSS owns entry motion, independent of hydration/effect replay.
        className={`absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-white/10 bg-[#292D30] text-[#F3F4F2] shadow-[-24px_0_80px_rgba(0,0,0,0.35)] transition-transform duration-300 starting:translate-x-full motion-reduce:transition-none md:max-w-xl lg:max-w-2xl ${
          isClosing
            ? "translate-x-full ease-in"
            : "translate-x-0 ease-out"
        }`}
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
      </aside>
    </div>
  );
}
