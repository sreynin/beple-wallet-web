"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Popup — spec source: design-guide.md §6.1 + tokens --popup-*
 * Width 312px, radius 16px, padding-top 32px, padding-x 20px.
 * Dimmed overlay: #111 @ 0.7.
 */
type Props = {
  open: boolean;
  onDismiss?: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export function Popup({ open, onDismiss, title, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal>
      <div
        className="absolute inset-0 bg-gray-900/70"
        onClick={onDismiss}
        aria-hidden
      />
      <div
        className={cn(
          "relative w-[312px] rounded-2xl bg-bg shadow-popup",
          "pt-8 px-5 pb-5",
        )}
      >
        {title ? (
          <h2 className="mb-3 text-center text-[18px] font-semibold text-text-heading">
            {title}
          </h2>
        ) : null}
        <div className="text-center text-[14px] text-text-body">{children}</div>
        {footer ? <div className="mt-6 flex gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}
