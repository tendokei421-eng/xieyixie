import { useMemo } from "react";
import { useAppStore } from "@/lib/store";

export function useDayEvents(date: string) {
  const events = useAppStore((s) => s.events);
  return useMemo(
    () =>
      events
        .filter((e) => e.date === date)
        .slice()
        .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)),
    [events, date],
  );
}

export function useDayRests(date: string) {
  const restLogs = useAppStore((s) => s.restLogs);
  return useMemo(
    () => restLogs.filter((l) => l.date === date),
    [restLogs, date],
  );
}
