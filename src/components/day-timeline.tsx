import { Copy, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { durationLabel, minutesOf } from "@/lib/dates";
import { currentOrNextGap, findGaps } from "@/lib/recommendations";
import type { CalendarEvent, Gap } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-surface px-5 py-8 text-center shadow-card">
        <img
          src="/buddy/calm.png"
          alt=""
          className="mx-auto h-24 w-auto object-contain"
        />
        <p className="mt-2 font-display text-lg font-semibold">这一天还很空</p>
        <Button className="mt-4 min-h-11" onClick={() => onAdd()}>
          <Plus className="size-4" />
          添加日程
        </Button>
      </div>
    );
  }

  return (
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
                  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150",
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
                  <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug">
                    {event.title}
                  </h3>
                  <EventMenu
                    onEdit={() => onEdit(event.id)}
                    onCopy={() => onCopy(event.id)}
                    onDelete={() => onDelete(event.id)}
                  />
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
  );
}

function addMinutes(hhmm: string, add: number) {
  const n = minutesOf(hhmm) + add;
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}

function EventMenu({
  onEdit,
  onCopy,
  onDelete,
}: {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="更多操作"
          className="grid size-11 shrink-0 place-items-center rounded-sm text-muted hover:bg-surface-2 hover:text-fg"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-36 rounded-md bg-surface p-1 shadow-card-hover"
        >
          <MenuItem onSelect={onEdit} icon={Pencil} label="编辑" />
          <MenuItem onSelect={onCopy} icon={Copy} label="复制" />
          <MenuItem onSelect={onDelete} icon={Trash2} label="删除" danger />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function MenuItem({
  onSelect,
  icon: Icon,
  label,
  danger,
}: {
  onSelect: () => void;
  icon: typeof Pencil;
  label: string;
  danger?: boolean;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm outline-none",
        danger
          ? "text-danger data-[highlighted]:bg-danger/10"
          : "text-fg data-[highlighted]:bg-surface-2",
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </DropdownMenu.Item>
  );
}
