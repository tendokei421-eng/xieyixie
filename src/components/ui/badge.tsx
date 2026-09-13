import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-primary-soft text-primary",
  yellow: "bg-accent-soft text-accent-fg",
  mute: "bg-surface-2 text-muted",
  ok: "bg-ok/15 text-ok",
  danger: "bg-danger/12 text-danger",
} as const;

export function Badge({
  tone = "mute",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
