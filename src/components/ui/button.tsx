import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-fg hover:bg-primary/90 focus-visible:ring-primary/40 shadow-card",
  secondary:
    "glass-soft text-fg hover:bg-primary-soft focus-visible:ring-primary/30",
  ghost: "bg-transparent text-fg hover:bg-surface-2 focus-visible:ring-primary/30",
  accent:
    "bg-accent text-accent-fg hover:bg-accent/90 focus-visible:ring-accent/40",
  danger:
    "bg-danger text-danger-fg hover:bg-danger/90 focus-visible:ring-danger/30",
  outline:
    "glass text-fg hover:shadow-card-hover focus-visible:ring-primary/30",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm rounded-sm",
  md: "h-11 px-4 text-sm rounded-md",
  lg: "h-12 px-5 text-base rounded-lg",
  icon: "size-11 rounded-md",
  pill: "h-11 px-4 text-sm rounded-full",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:not-disabled:scale-[0.96]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
