import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export function ActionSheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="sheet-bottom z-50 outline-none"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
          <Dialog.Title className="px-1 pb-2 font-display text-lg font-semibold">
            {title}
          </Dialog.Title>
          <div className="flex flex-col gap-1">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ActionSheetItem({
  onSelect,
  danger,
  children,
}: {
  onSelect: () => void;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex min-h-12 w-full items-center gap-2 rounded-md px-3 text-left text-base font-medium",
        danger ? "text-danger hover:bg-danger/10" : "text-fg hover:bg-surface-2",
      )}
    >
      {children}
    </button>
  );
}
