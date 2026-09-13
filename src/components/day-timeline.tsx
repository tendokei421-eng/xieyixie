import { useState } from "react";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { durationLabel, minutesOf } from "@/lib/dates";
import { currentOrNextGap, findGaps } from "@/lib/recommendations";
import { MOOD_SRC } from "@/lib/relaxation";
import type { CalendarEvent, Gap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ActionSheet, ActionSheetItem } from "@/components/action-sheet";

type Item =
  | { type: "event"; start: string; end: string; event: CalendarEvent }
  | { type: "gap"; start: string; end: string; gap: Gap };

function buildItems(events: CalendarEvent[]): Item[] {
  const gaps = findGaps(events);
  const items: Item[] = [
    ...events.map((event) => ({
      type: "event" as const,
      start: event.start,
      end: event.end,
      event,
    })),
    ...gaps.map((gap) => ({ type: "gap" as const, start: gap.start, end: gap.end, gap })),
  ];
  return items.sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
}

export function DayTimeline({
  events,
  nowHHmm,
  isToday,
  onAdd,
  onEdit,
  onCopy,
  onDelete,
}: {
  events: CalendarEvent[];
  nowHHmm: string;
  isToday: boolean;
  onAdd: (partial?: Partial<CalendarEvent>) => void;
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const items = buildItems(events);
  const nowMin = minutesOf(nowHHmm);
  const liveGap = isToday ? currentOrNextGap(findGaps(events), nowHHmm) : null;
  const [menuId, setMenuId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-surface px-5 py-8 text-center shadow-card">
        <img
          src={MOOD_SRC.calm}
          alt=""
          draggable={false}
          className="mx-auto h-24 w-auto object-contain"
        />
        <p className="mt-2 font-display text-lg font-semibold">这一天还很空</p>
      </div>
    );
  }

  return (
    <>
      <ol className="flex flex-col gap-2">
        {items.map((item) => {
          if (item.type === "gap") {
            const active =
              isToday && liveGap?.start === item.gap.start && liveGap.end === item.gap.end;
            const past = isToday && minutesOf(item.end) <= nowMin;
            return (
              <li key={`gap-${item.start}-${item.end}`}>
                <button
                  type="button"
                  onClick={() =>
                    onAdd({
                      start: item.start,
                      end: item.gap.minutes >= 30 ? addMinutes(item.start, 30) : item.end,
                    })
                  }
                  className={cn(
                    "flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150",
                    active ? "bg-accent-soft" : "bg-accent-soft/50 hover:bg-accent-soft",
                    past && "opacity-55",
                  )}
                >
                  <span className="w-11 shrink-0 text-xs tabular-nums text-muted">{item.start}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium">空闲可歇</span>
                      <Badge tone="yellow">{durationLabel(item.gap.minutes)}</Badge>
                      {active && <Badge tone="blue">现在</Badge>}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {item.start} – {item.end}
                    </span>
                  </span>
                </button>
              </li>
            );
          }

          const { event } = item;
          const happening =
            isToday && minutesOf(event.start) <= nowMin && nowMin < minutesOf(event.end);
          const past = isToday && minutesOf(event.end) <= nowMin;
          return (
            <li key={event.id}>
              <article
                className={cn(
                  "flex items-start gap-3 rounded-xl bg-surface px-3 py-3.5 shadow-card transition-shadow duration-150",
                  happening && "ring-2 ring-primary/35",
                  past && "opacity-70",
                )}
              >
                <div className="w-11 shrink-0 pt-0.5">
                  <p className="text-xs font-semibold tabular-nums text-primary">{event.start}</p>
                  <p className="text-xs tabular-nums text-subtle">{event.end}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <h3 className="min-w-0 flex-1 pt-2 text-sm font-semibold leading-snug">
                      {event.title}
                    </h3>
                    <button
                      type="button"
                      aria-label="更多操作"
                      onClick={() => setMenuId(event.id)}
                      className="grid size-11 shrink-0 place-items-center rounded-sm text-muted hover:bg-surface-2 hover:text-fg"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                  </div>
                  {event.detail ? (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {event.detail}
                    </p>
                  ) : null}
                  {happening ? (
                    <p className="mt-1.5 text-xs font-medium text-primary">正在进行</p>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <ActionSheet
        open={!!menuId}
        onOpenChange={(next) => {
          if (!next) setMenuId(null);
        }}
        title="日程操作"
      >
        <ActionSheetItem
          onSelect={() => {
            if (menuId) onEdit(menuId);
            setMenuId(null);
          }}
        >
          <Pencil className="size-4" />
          编辑
        </ActionSheetItem>
        <ActionSheetItem
          onSelect={() => {
            if (menuId) onCopy(menuId);
            setMenuId(null);
          }}
        >
          <Copy className="size-4" />
          复制
        </ActionSheetItem>
        <ActionSheetItem
          danger
          onSelect={() => {
            if (menuId) onDelete(menuId);
            setMenuId(null);
          }}
        >
          <Trash2 className="size-4" />
          删除
        </ActionSheetItem>
      </ActionSheet>
    </>
  );
}

function addMinutes(hhmm: string, add: number) {
  const n = minutesOf(hhmm) + add;
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}
