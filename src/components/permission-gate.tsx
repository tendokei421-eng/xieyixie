import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bell, Smartphone, Volume2 } from "lucide-react";
import { enableAppPermissions } from "@/lib/rest-notify";
import { useAppStore } from "@/lib/store";
import { useLockBody } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const ITEMS = [
  {
    icon: Bell,
    title: "通知",
    detail: "计时结束时，熄屏走锁屏，亮屏走出横幅",
  },
  {
    icon: Volume2,
    title: "声音",
    detail: "到点播放五秒结束铃声",
  },
  {
    icon: Smartphone,
    title: "震动",
    detail: "到点轻轻震一下，提醒你歇完了",
  },
] as const;

export function PermissionGate() {
  const hydrated = useAppStore((s) => s.hydrated);
  const asked = useAppStore((s) => s.permissionsAsked);
  const markAsked = useAppStore((s) => s.markPermissionsAsked);
  const [busy, setBusy] = useState(false);
  const open = hydrated && !asked;

  useLockBody(open);

  const allow = async () => {
    if (busy) return;
    setBusy(true);
    markAsked();
    window.setTimeout(() => {
      void enableAppPermissions();
    }, 400);
  };

  return (
    <Dialog.Root open={open} onOpenChange={() => undefined}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-fg/30 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          aria-describedby="perm-desc"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="fixed inset-x-5 top-1/2 z-[70] w-auto max-w-md -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-card-hover outline-none sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
        >
          <Dialog.Title className="font-display text-xl font-semibold tracking-tight">
            开启休息提醒
          </Dialog.Title>
          <p id="perm-desc" className="mt-1 text-sm leading-relaxed text-muted">
            点允许后，这个说明会先关掉，接着手机系统会再问一次「是否允许通知」。
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {ITEMS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                  <item.icon className="size-5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <Button size="lg" className="w-full" disabled={busy} onClick={() => void allow()}>
              {busy ? "正在开启…" : "允许"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-muted"
              disabled={busy}
              onClick={markAsked}
            >
              以后再说
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
