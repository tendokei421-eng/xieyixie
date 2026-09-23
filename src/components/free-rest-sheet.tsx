import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRESETS = [5, 10, 15, 20];

export function FreeRestSheet({
  open,
  restCount,
  onOpenChange,
  onStart,
}: {
  open: boolean;
  restCount: number;
  onOpenChange: (open: boolean) => void;
  onStart: (durationMin: number) => void;
}) {
  const [minutes, setMinutes] = useState(10);

  useEffect(() => {
    if (open) setMinutes(10);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="sheet-bottom z-50 outline-none md:inset-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border md:hidden" />
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-xl font-semibold">自由休息</Dialog.Title>
              <p className="mt-1 text-sm text-muted">今天已歇 {restCount} 次。选 0–20 分钟后开始。</p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-sm text-muted hover:bg-surface-2 hover:text-fg"
                aria-label="关闭"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <p className="text-center font-display text-5xl font-semibold tabular-nums tracking-tight">
            {minutes}
            <span className="ml-1 text-base font-medium text-subtle">分钟</span>
          </p>

          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="mt-5 w-full accent-primary"
            aria-label="休息时长"
          />
          <div className="mt-1 flex justify-between text-xs text-subtle">
            <span>0</span>
            <span>20</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PRESETS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setMinutes(n)}
                className={cn(
                  "min-h-10 rounded-full px-3 text-sm font-medium",
                  minutes === n ? "bg-primary text-primary-fg" : "glass-soft text-fg",
                )}
              >
                {n} 分钟
              </button>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-5 w-full"
            onClick={() => {
              onStart(minutes);
              onOpenChange(false);
            }}
          >
            开始休息
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
