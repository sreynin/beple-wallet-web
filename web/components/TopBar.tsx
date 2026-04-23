"use client";

import { ChevronLeft, X } from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "@/lib/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * TopBar — spec source: design-guide.md §5.2
 * Height 56px, horizontal padding 16px.
 */
type Props = {
  title?: string;
  leading?: "back" | "close" | "none" | ReactNode;
  trailing?: ReactNode;
  onLeadingClick?: () => void;
  className?: string;
};

export function TopBar({ title, leading = "back", trailing, onLeadingClick, className }: Props) {
  const router = useRouter();
  const handleLeading = onLeadingClick ?? (() => router.back());

  const leadingNode =
    leading === "back" ? (
      <button
        type="button"
        aria-label="Back"
        onClick={handleLeading}
        className="-ml-2 flex h-10 w-10 items-center justify-center"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    ) : leading === "close" ? (
      <button
        type="button"
        aria-label="Close"
        onClick={handleLeading}
        className="-ml-2 flex h-10 w-10 items-center justify-center"
      >
        <X className="h-6 w-6" />
      </button>
    ) : leading === "none" ? (
      <span className="h-10 w-10" />
    ) : (
      leading
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-bg pt-[env(safe-area-inset-top)] text-text-heading",
        className,
      )}
    >
      <div className="relative flex h-14 items-center justify-between px-4">
        <div className="flex items-center">{leadingNode}</div>
        {title ? (
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-semibold">
            {title}
          </h1>
        ) : null}
        <div className="flex items-center gap-1">{trailing}</div>
      </div>
    </header>
  );
}
