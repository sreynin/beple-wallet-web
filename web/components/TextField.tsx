"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * TextField — spec source: design-guide.md §5.3
 * Height 48px, line variant: bottom border Default/Focus/Error/Disabled
 */
type Variant = "line" | "box";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  variant?: Variant;
  trailing?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, description, errorMessage, variant = "line", trailing, className, id, ...rest }, ref) => {
    const reactId = useId();
    const inputId = id ?? reactId;
    const hasError = Boolean(errorMessage);

    return (
      <div className={cn("w-full", className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-2 block text-[14px] font-medium text-text-title"
          >
            {label}
          </label>
        ) : null}

        <div
          className={cn(
            "group flex h-[48px] items-center gap-2 bg-bg transition-colors",
            variant === "box" && "rounded-md border px-3",
            variant === "line" && "border-b",
            variant === "box" &&
              (hasError
                ? "border-error"
                : "border-border-card focus-within:border-primary focus-within:border-2"),
            variant === "line" &&
              (hasError
                ? "border-error border-b-2"
                : "border-border-input focus-within:border-primary focus-within:border-b-2"),
            rest.disabled && "border-border-input-disabled bg-gray-100",
          )}
        >
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-full w-full flex-1 bg-transparent text-[16px] text-text-heading outline-none",
              "placeholder:text-text-description",
              rest.disabled && "text-text-disabled",
            )}
            aria-invalid={hasError || undefined}
            aria-describedby={
              errorMessage ? `${inputId}-error` : description ? `${inputId}-desc` : undefined
            }
            {...rest}
          />
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>

        {hasError ? (
          <p id={`${inputId}-error`} className="mt-2 text-[12px] text-error">
            {errorMessage}
          </p>
        ) : description ? (
          <p id={`${inputId}-desc`} className="mt-2 text-[12px] text-text-description">
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";
