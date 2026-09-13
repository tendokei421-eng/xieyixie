import { Activity } from "lucide-react";
import { MOOD_SRC } from "@/lib/relaxation";
import type { Mood } from "@/lib/types";
import { cn } from "@/lib/utils";

const MOODS: Mood[] = ["tired", "calm", "spark", "rest", "happy"];

export function BuddyCard({
  score,
  mood,
  label,
  hint,
  restCount,
  working,
  hasEvents,
}: {
  score: number;
  mood: Mood;
  label: string;
  hint: string;
  restCount: number;
  working: boolean;
  hasEvents: boolean;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-surface p-5 shadow-card">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-accent/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-0 size-40 rounded-full bg-primary/15"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted">今天的松弛度</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums leading-none">
            {score}
            <span className="ml-1 text-base font-medium text-subtle">/100</span>
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            working
              ? "bg-primary-soft text-primary"
              : hasEvents
                ? "bg-accent-soft text-accent-fg"
                : "bg-surface-2 text-muted",
          )}
        >
          {working ? "日程进行中" : hasEvents ? "空闲可歇" : "还没排日程"}
        </span>
      </div>

      <div className="relative mx-auto mt-2 grid place-items-center">
        <svg
          viewBox="0 0 128 128"
          className="absolute size-52 -rotate-90 text-primary"
          aria-hidden
        >
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-surface-2"
          />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="text-primary transition-[stroke-dashoffset] duration-500 ease-smooth-out"
          />
        </svg>
        <div className="relative h-44 w-44">
          {MOODS.map((m) => (
            <img
              key={m}
              src={MOOD_SRC[m]}
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-500 ease-out",
                m === mood ? "buddy-float opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-1 text-center">
        <h2 className="font-display text-xl font-semibold">{label}</h2>
        <p className="mx-auto mt-1 max-w-[28ch] text-sm leading-relaxed text-muted">{hint}</p>
      </div>

      <div className="relative mt-4 flex items-center justify-center">
        <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft px-3 text-sm font-medium text-accent-fg">
          <Activity className="size-3.5" />
          今天已歇 {restCount} 次
        </span>
      </div>
    </section>
  );
}
