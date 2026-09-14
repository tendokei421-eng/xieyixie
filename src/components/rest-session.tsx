import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { activityById } from "@/lib/recommendations";
import { playRestChime, startKeepAlive, stopRestChime } from "@/lib/rest-chime";
import {
  announceRestFinished,
  cancelRestEnd,
  scheduleRestEnd,
} from "@/lib/rest-notify";
import { MOOD_SRC } from "@/lib/relaxation";
import { useAppStore } from "@/lib/store";
import { KindIcon } from "@/components/kind-icon";
import { Button } from "@/components/ui/button";

export function RestSession() {
  const active = useAppStore((s) => s.activeRest);
  const completeRest = useAppStore((s) => s.completeRest);
  const cancelRest = useAppStore((s) => s.cancelRest);
  const [now, setNow] = useState(() => Date.now());
  const finishing = useRef(false);

  useEffect(() => {
    if (!active) {
      finishing.current = false;
      cancelRestEnd();
      return;
    }
    startKeepAlive();
    void scheduleRestEnd(active);
    const endAt = new Date(active.startedAt).getTime() + active.durationMin * 60_000;
    const tick = window.setInterval(() => setNow(Date.now()), 250);
    const remain = Math.max(0, endAt - Date.now());
    const due = window.setTimeout(() => setNow(endAt), remain);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(due);
    };
  }, [active]);

  const finish = (reason: "timer" | "manual") => {
    if (finishing.current) return;
    const current = useAppStore.getState().activeRest;
    if (!current) {
      finishing.current = true;
      return;
    }
    finishing.current = true;
    if (reason === "timer") announceRestFinished(current);
    else playRestChime();
    completeRest();
    if (typeof document === "undefined" || document.visibilityState === "visible") {
      toast.success("这段休息完成了");
    }
  };

  useEffect(() => {
    if (!active) return;
    const endAt = new Date(active.startedAt).getTime() + active.durationMin * 60_000;
    if (now >= endAt) finish("timer");
    // finish reads a ref; we only want to fire when the clock crosses the end.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, now]);

  if (!active) return null;
  const activity = activityById(active.activityId);
  const start = new Date(active.startedAt).getTime();
  const end = start + active.durationMin * 60_000;
  const remainingMs = Math.max(0, end - now);
  const remainingSec = Math.ceil(remainingMs / 1000);
  const m = Math.floor(remainingSec / 60);
  const s = remainingSec % 60;
  const progress = 1 - remainingMs / (active.durationMin * 60_000);
  const lockAlerts =
    typeof Notification !== "undefined" && Notification.permission === "granted";

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
            src={MOOD_SRC.rest}
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
        <p className="mt-3 text-center text-xs leading-relaxed text-subtle">
          {lockAlerts
            ? "放到后台或锁屏，到点会震动、响五秒铃，熄屏在锁屏通知，亮屏则出横幅"
            : "放到后台也可以继续计时。允许通知后，锁屏和横幅也会提醒"}
        </p>

        <div className="mt-auto flex gap-2 pt-6">
          <Button
            variant="secondary"
            className="min-h-12 flex-1"
            onClick={() => {
              stopRestChime();
              cancelRestEnd();
              cancelRest();
            }}
          >
            先结束
          </Button>
          <Button className="min-h-12 flex-1" onClick={() => finish("manual")}>
            完成休息
          </Button>
        </div>
      </div>
    </div>
  );
}
