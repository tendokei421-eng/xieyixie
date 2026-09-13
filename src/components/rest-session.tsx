import { useEffect, useState } from "react";
import { toast } from "sonner";
import { activityById } from "@/lib/recommendations";
import { useAppStore } from "@/lib/store";
import { KindIcon } from "@/components/kind-icon";
import { Button } from "@/components/ui/button";

export function RestSession() {
  const active = useAppStore((s) => s.activeRest);
  const completeRest = useAppStore((s) => s.completeRest);
  const cancelRest = useAppStore((s) => s.cancelRest);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const end = new Date(active.startedAt).getTime() + active.durationMin * 60_000;
    if (now >= end) {
      completeRest();
      toast.success("这段休息完成了");
    }
  }, [active, now, completeRest]);

  if (!active) return null;
  const activity = activityById(active.activityId);
  const start = new Date(active.startedAt).getTime();
  const end = start + active.durationMin * 60_000;
  const remainingMs = Math.max(0, end - now);
  const remainingSec = Math.ceil(remainingMs / 1000);
  const m = Math.floor(remainingSec / 60);
  const s = remainingSec % 60;
  const progress = 1 - remainingMs / (active.durationMin * 60_000);

  return (
    <div className="rest-screen">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="rest-title"
        className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top,0px))] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
      >
        <div className="flex items-center gap-2 text-sm text-muted">
          {activity ? <KindIcon kind={activity.kind} /> : null}
          正在歇一歇
        </div>
        <div className="mx-auto my-4 h-36 w-36">
          <img
            src="/buddy/rest.png"
            alt=""
            draggable={false}
            className="buddy-float h-full w-full object-contain"
          />
        </div>
        <h2 id="rest-title" className="text-center font-display text-xl font-semibold">
          {activity?.title ?? "休息一下"}
        </h2>
        {activity ? (
          <p className="mt-1 text-center text-sm leading-relaxed text-muted">
            {activity.detail}
          </p>
        ) : null}

        <p className="mt-8 text-center font-display text-5xl font-semibold tabular-nums tracking-tight">
          {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>

        <div className="mt-auto flex gap-2 pt-6">
          <Button variant="secondary" className="min-h-12 flex-1" onClick={cancelRest}>
            先结束
          </Button>
          <Button
            className="min-h-12 flex-1"
            onClick={() => {
              completeRest();
              toast.success("这段休息完成了");
            }}
          >
            完成休息
          </Button>
        </div>
      </div>
    </div>
  );
}
