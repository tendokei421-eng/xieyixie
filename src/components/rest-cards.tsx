import { Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { durationLabel } from "@/lib/dates";
import { kindLabel } from "@/lib/recommendations";
import type { Gap, RestActivity } from "@/lib/types";
import { KindIcon } from "@/components/kind-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  return (
    <section>
      <div className="mb-3">
        <h2 className="font-display text-lg font-semibold">现在适合歇一歇</h2>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          {!hasEvents
            ? "还没有日程。先按现在的节奏歇一下。"
            : working
              ? "这段日程结束后再离开工位。先看看下一个空档。"
              : gap
                ? `空闲 ${gap.start} – ${gap.end} · ${durationLabel(gap.minutes)}`
                : "根据今天的节奏为你挑选"}
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="rounded-xl bg-surface px-4 py-6 text-center text-sm text-muted shadow-card">
          这一段排得很满。下一处空隙再歇。
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {activities.map((a) => (
            <li key={a.id} className="flex gap-3 rounded-xl bg-surface p-3.5 shadow-card">
              <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                <KindIcon kind={a.kind} className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-sm font-semibold">{a.title}</h3>
                  <Badge tone="blue">{kindLabel(a.kind)}</Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{a.detail}</p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-subtle">
                    <Clock className="size-3" />
                    {durationLabel(a.durationMin)}
                  </span>
                  <Button size="sm" onClick={() => onStart(a)}>
                    开始休息
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!hasEvents ? (
        <p className="mt-3 text-center text-xs text-muted">
          想按空闲来排？去{" "}
          <Link to="/today" className="font-medium text-primary">
            今天
          </Link>{" "}
          添加日程。
        </p>
      ) : null}
    </section>
  );
}
