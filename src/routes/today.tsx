import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { dateKey } from "@/lib/dates";
import { useAppStore } from "@/lib/store";
import { useDayEvents } from "@/hooks/use-day-data";
import { useNow } from "@/hooks/use-now";
import { DayTimeline } from "@/components/day-timeline";
import { WeekStrip } from "@/components/week-strip";

export const Route = createFileRoute("/today")({ component: TodayPage });

function TodayPage() {
  const { hhmm } = useNow();
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const openCreate = useAppStore((s) => s.openCreate);
  const openEdit = useAppStore((s) => s.openEdit);
  const openDuplicate = useAppStore((s) => s.openDuplicate);
  const removeEvent = useAppStore((s) => s.removeEvent);

  const events = useDayEvents(selectedDate);
  const today = dateKey();
  const isToday = selectedDate === today;

  return (
    <div className="enter-stagger mx-auto flex w-full flex-col gap-4">
      <WeekStrip selected={selectedDate} onSelect={setSelectedDate} />

      {!isToday ? (
        <button
          type="button"
          className="self-start text-sm font-medium text-primary"
          onClick={() => setSelectedDate(today)}
        >
          回到今天
        </button>
      ) : null}

      <DayTimeline
        events={events}
        nowHHmm={hhmm}
        isToday={isToday}
        onAdd={(partial) => openCreate(partial)}
        onEdit={openEdit}
        onCopy={(id) => {
          openDuplicate(id);
          toast("已复制为新日程，确认后保存");
        }}
        onDelete={(id) => {
          removeEvent(id);
          toast("日程已删除");
        }}
      />
    </div>
  );
}
