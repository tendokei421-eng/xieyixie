import { useEffect, useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { durationLabel } from "@/lib/dates";
import { kindLabel, pickRandomActivities } from "@/lib/recommendations";
import { cn } from "@/lib/utils";
import type { Gap, RestActivity } from "@/lib/types";
import { KindIcon } from "@/components/kind-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 3;

export function RestCards({
  activities,
  gap,
  working,
  hasEvents,
  onStart,
}: {
  activities: RestActivity[];
  gap: Gap | null;
  working: boolean;
  hasEvents: boolean;
  onStart: (activity: RestActivity) => void;
}) {
  const [visible, setVisible] = useState<RestActivity[] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [batch, setBatch] = useState(0);
  const canShuffle = activities.length > 1;

  useEffect(() => {
    setVisible(pickRandomActivities(activities, PAGE_SIZE));
    setBatch((n) => n + 1);
  }, [activities]);

  const shuffle = () => {
    if (!canShuffle) return;
    setVisible((current) =>
      pickRandomActivities(
        activities,
        PAGE_SIZE,
        current?.map((a) => a.id) ?? [],
      ),
    );
    setBatch((n) => n + 1);
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), 420);
  };

  return (
    <section>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold">现在适合歇一歇</h2>
          <p className="mt-0.5 text-sm leading-relaxed text-muted">
            {!hasEvents
              ? "还没有日程。先按现在的节奏歇一下。"
              : working
                ? "这段日程结束后再离开工位。先看看下一个空档。"
                : gap
                  ? `空闲 ${gap.start} – ${gap.end} · ${durationLabel(gap.minutes)}`
                  : "抽三件，不满意就换。"}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="pill"
          className="shrink-0"
          disabled={!canShuffle}
          onClick={shuffle}
        >
          <RefreshCw className={cn("size-4", spinning && "animate-spin")} />
          换一换
        </Button>
      </div>

      {visible === null ? (
        <div className="flex flex-col gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-surface shadow-card" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <p className="rounded-xl bg-surface px-4 py-6 text-center text-sm text-muted shadow-card">
          这一段排得很满。下一处空隙再歇。
        </p>
      ) : (
        <ul key={batch} className="flex flex-col gap-2">
          {visible.map((a) => (
            <li key={a.id} className="flex gap-3 rounded-xl bg-surface p-3.5 shadow-card">
              <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                <KindIcon kind={a.kind} className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-base font-semibold">{a.title}</h3>
                  <Badge tone="blue">{kindLabel(a.kind)}</Badge>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.detail}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1 text-sm text-subtle">
                    <Clock className="size-3.5" />
                    {durationLabel(a.durationMin)}
                  </span>
                  <Button size="lg" className="w-full" onClick={() => onStart(a)}>
                    开始休息
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!hasEvents ? (
        <p className="mt-3 text-center text-sm text-muted">
          想按空闲来排？去{" "}
          <Link to="/today" className="inline-flex min-h-11 items-center font-medium text-primary">
            今天
          </Link>{" "}
          添加日程。
        </p>
      ) : null}
    </section>
  );
}