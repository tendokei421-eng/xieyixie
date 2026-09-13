import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { dateKey } from "@/lib/dates";
import {
  ACTIVITIES,
  currentOrNextGap,
  findGaps,
  isNowInEvent,
  recommendActivities,
} from "@/lib/recommendations";
import { computeRelaxation } from "@/lib/relaxation";
import { useAppStore } from "@/lib/store";
import { useDayEvents, useDayRests } from "@/hooks/use-day-data";
import { useNow } from "@/hooks/use-now";
import { BuddyCard } from "@/components/buddy-card";
import { RestCards } from "@/components/rest-cards";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { hhmm } = useNow();
  const startRest = useAppStore((s) => s.startRest);
  const activeRest = useAppStore((s) => s.activeRest);

  const today = dateKey();
  const events = useDayEvents(today);
  const restLogs = useDayRests(today);
  const hasEvents = events.length > 0;

  const gaps = useMemo(() => findGaps(events), [events]);
  const gap = currentOrNextGap(gaps, hhmm);
  const working = isNowInEvent(events, hhmm);

  const recs = useMemo(
    () =>
      recommendActivities({
        nowHHmm: hhmm,
        gap,
        restLogs,
        limit: ACTIVITIES.length,
      }),
    [gap, hhmm, restLogs],
  );

  const relax = computeRelaxation({
    events,
    restLogs,
    nowHHmm: hhmm,
    resting: !!activeRest,
  });

  return (
    <div className="enter-stagger mx-auto flex w-full flex-col gap-5">
      <BuddyCard
        score={relax.score}
        mood={relax.mood}
        label={relax.label}
        hint={relax.hint}
        restCount={restLogs.filter((l) => l.completed).length}
        working={working}
        hasEvents={hasEvents}
      />
      <RestCards
        activities={recs}
        gap={gap}
        working={working}
        hasEvents={hasEvents}
        onStart={(a) => startRest(a.id, a.durationMin)}
      />
    </div>
  );
}
