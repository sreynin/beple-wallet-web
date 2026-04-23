import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — spec source: design-guide.md §5.1
 * Sizes: xl(52), lg(48), md(40), sm(32), xs(24)
 */
const button = cva(
  "inline-flex items-center justify-center font-semibold transition-colors " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    "active:scale-[0.99] select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border border-border-input text-gray-900 bg-bg",
        ghost: "text-primary hover:bg-blue-100",
        danger: "bg-error text-white",
      },
      size: {
        xl: "h-[52px] px-6 text-[18px] rounded-xl",
        lg: "h-[48px] px-4 text-[16px] rounded-lg",
        md: "h-[40px] px-4 text-[16px] rounded-lg",
        sm: "h-[32px] px-3 text-[14px] rounded-md",
        xs: "h-[24px] px-2 text-[12px] rounded-sm",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      block: false,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, ...rest }, ref) => (
    <button ref={ref} className={cn(button({ variant, size, block }), className)} {...rest} />
  ),
);

Button.displayName = "Button";
