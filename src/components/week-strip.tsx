import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  dateKey,
  parseDateKey,
  weekKeys,
  weekdayLabel,
} from "@/lib/dates";
import { cn } from "@/lib/utils";

export function WeekStrip({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (date: string) => void;
}) {
  const keys = weekKeys(selected);
  const today = dateKey();
  const start = parseDateKey(keys[0]);
  const end = parseDateKey(keys[6]);
  const rangeLabel = `${format(start, "M月d日", { locale: zhCN })} – ${format(end, "d日", { locale: zhCN })}`;
  const shiftWeek = (dir: number) => {
    onSelect(dateKey(addDays(parseDateKey(selected), dir * 7)));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="上一周"
          onClick={() => shiftWeek(-1)}
          className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="text-xs font-medium text-muted">{rangeLabel}</p>
        <button
          type="button"
          aria-label="下一周"
          onClick={() => shiftWeek(1)}
          className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {keys.map((key) => {
          const isSel = key === selected;
          const isToday = key === today;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-md px-0.5 py-1.5 transition-colors duration-150",
                isSel
                  ? "bg-primary text-primary-fg"
                  : isToday
                    ? "bg-accent-soft text-accent-fg"
                    : "text-fg hover:bg-surface-2",
              )}
            >
              <span className={cn("text-xs", isSel ? "text-primary-fg/80" : "text-muted")}>
                {weekdayLabel(key)}
              </span>
              <span className="mt-0.5 text-sm font-semibold tabular-nums leading-none">
                {format(parseDateKey(key), "d")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
