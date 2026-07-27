"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function CardModal({ title, isOpen, onClose, children }: CardModalProps) {
  /* Close on ESC */
  const onKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose],
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Window */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="relative flex shrink-0 items-center justify-center border-b border-border/50 bg-surface-elevated px-5 py-3">
              {/* Traffic lights */}
              <div className="absolute left-4 flex items-center gap-2" aria-hidden>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                />
                <span className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
                <span className="h-3 w-3 rounded-full bg-green-500 opacity-60" />
              </div>
              <span className="text-sm font-semibold text-foreground/80">{title}</span>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-6 sm:p-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
