import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { dateKey } from "@/lib/dates";
import { FREE_REST_ID } from "@/lib/free-rest";
import { ACTIVITIES, currentOrNextGap, findGaps, isNowInEvent } from "@/lib/recommendations";
import { computeRelaxation } from "@/lib/relaxation";
import { beginRest } from "@/lib/rest-notify";
import { useAppStore } from "@/lib/store";
import { useDayEvents, useDayRests } from "@/hooks/use-day-data";
import { useNow } from "@/hooks/use-now";
import { BuddyCard } from "@/components/buddy-card";
import { FreeRestSheet } from "@/components/free-rest-sheet";
import { RestCards } from "@/components/rest-cards";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { hhmm } = useNow();
  const activeRest = useAppStore((s) => s.activeRest);
  const [freeOpen, setFreeOpen] = useState(false);

  const today = dateKey();
  const events = useDayEvents(today);
  const restLogs = useDayRests(today);
  const hasEvents = events.length > 0;
  const restCount = restLogs.filter((l) => l.completed).length;

  const gaps = useMemo(() => findGaps(events), [events]);
  const gap = currentOrNextGap(gaps, hhmm);
  const working = isNowInEvent(events, hhmm);

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
        restCount={restCount}
        working={working}
        hasEvents={hasEvents}
        onFreeRest={() => setFreeOpen(true)}
      />
      <RestCards
        activities={ACTIVITIES}
        gap={gap}
        working={working}
        hasEvents={hasEvents}
        onStart={(a) => void beginRest(a.id, a.durationMin)}
      />
      <FreeRestSheet
        open={freeOpen}
        restCount={restCount}
        onOpenChange={setFreeOpen}
        onStart={(minutes) => void beginRest(FREE_REST_ID, minutes)}
      />
    </div>
  );
}
