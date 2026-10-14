
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
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
    if (hasNavigatedRef.current) return;

    // Trigger the closing animation first.
    setIsClosing(true);
  }, []);

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

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
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
      {/* Backdrop fades in and out */}
      <motion.button
        type="button"
        aria-label="Close product details"
        onClick={closeDrawer}
        disabled={isClosing}
        className="absolute inset-0 h-full w-full bg-black/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : isClosing ? 0.3 : 0.25,
        }}
      />

      {/* Drawer slides in and out */}
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-[#F8F7F4] shadow-2xl md:max-w-xl lg:max-w-2xl"
        initial={{ x: shouldReduceMotion ? 0 : "100%" }}
        animate={{ x: isClosing ? "100%" : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : isClosing
              ? {
                  duration: 0.3,
                  ease: [0.4, 0, 1, 1],
                }
              : {
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 1,
                }
        }
        onAnimationComplete={() => {
          if (isClosing) {
            finishClosing();
          }
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-6 py-5 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
            SIGNAL / Product details
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            disabled={isClosing}
            aria-label="Close product details"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-xl transition hover:bg-neutral-200"
          >
            ×
          </button>
        </div>

        {/* Scrollable product content */}
        <motion.div
          className="flex-1 overflow-y-auto px-6 py-8 md:px-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{
            opacity: isClosing ? 0 : 1,
            y: isClosing ? 8 : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.25,
            delay: shouldReduceMotion || isClosing ? 0 : 0.12,
          }}
        >
          {children}
        </motion.div>
      </motion.aside>
    </div>
  );
}
