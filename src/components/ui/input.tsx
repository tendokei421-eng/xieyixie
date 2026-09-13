import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-md bg-surface-2 px-3 text-fg shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-fg)_8%,transparent)] placeholder:text-subtle outline-none transition-[box-shadow,background-color] duration-150 focus:bg-surface focus:shadow-[inset_0_0_0_2px_var(--color-primary)]";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(field, "h-11 text-sm", className)}
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
      className={cn(field, "min-h-24 py-2.5 text-sm leading-relaxed", className)}
      {...props}
    />
  );
});
