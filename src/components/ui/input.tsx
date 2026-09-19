import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-md glass-soft px-3 text-base text-fg placeholder:text-subtle outline-none transition-[box-shadow,background-color] duration-150 focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-primary)]";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(field, "h-12", className)}
        {...props}
      />
    );
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(field, "min-h-28 py-3 leading-relaxed", className)}
      {...props}
    />
  );
});
