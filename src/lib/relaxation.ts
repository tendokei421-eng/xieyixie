import type { CalendarEvent, Mood, RestLog } from "./types";
import { minutesOf } from "./dates";
import { publicUrl } from "./asset";

export function computeRelaxation(opts: {
  events: CalendarEvent[];
  restLogs: RestLog[];
  nowHHmm: string;
  resting: boolean;
}) {
  let score = 40;
  const completed = opts.restLogs.filter((l) => l.completed);
  score += Math.min(48, completed.length * 14);

  if (opts.resting) score += 8;

  const now = minutesOf(opts.nowHHmm);
  const working = opts.events.some(
    (e) => minutesOf(e.start) <= now && now < minutesOf(e.end),
  );
  if (working) score -= 8;

  const last = completed
    .map((l) => l.startedAt)
    .sort()
    .at(-1);
  if (last) {
    const elapsedMin = (Date.now() - new Date(last).getTime()) / 60000;
    if (elapsedMin < 45) score += 10;
    else if (elapsedMin > 150 && working) score -= 10;
  } else if (now > 15 * 60) {
    score -= 8;
  }

  let longestWork = 0;
  const sorted = [...opts.events].sort((a, b) => a.start.localeCompare(b.start));
  for (const e of sorted) {
    longestWork = Math.max(longestWork, minutesOf(e.end) - minutesOf(e.start));
  }
  if (longestWork >= 120) score -= 6;

  score = Math.max(0, Math.min(100, Math.round(score)));
  const mood = moodFromScore(score);
  return { score, mood, ...moodCopy(mood, working, opts.resting) };
}

export function moodFromScore(score: number): Mood {
  if (score <= 22) return "tired";
  if (score <= 42) return "calm";
  if (score <= 62) return "spark";
  if (score <= 82) return "rest";
  return "happy";
}

function moodCopy(mood: Mood, working: boolean, resting: boolean) {
  if (resting) {
    return { label: "正在歇一歇", hint: "不用赶，把这一小段时间完整地留给自己。" };
  }
  switch (mood) {
    case "tired":
      return {
        label: "有点紧绷",
        hint: working
          ? "这段日程有点密。下一个空档，记得真正离开工位。"
          : "身体已经发出信号了。先歇一歇再继续。",
      };
    case "calm":
      return {
        label: "还算平稳",
        hint: "状态过得去，但别等到累了才休息。空闲里插入一小段就好。",
      };
    case "spark":
      return {
        label: "精神不错",
        hint: "保持这样很好。用下一段空闲去晒晒太阳或看看窗外。",
      };
    case "rest":
      return {
        label: "很放松",
        hint: "节奏刚刚好。把这种松弛带到下一段工作里。",
      };
    case "happy":
      return {
        label: "歇得真好",
        hint: "今天的休息很到位。你可以慢慢的，不必一直加码。",
      };
  }
}

export const MOOD_SRC: Record<Mood, string> = {
  tired: publicUrl("/buddy/tired.png"),
  calm: publicUrl("/buddy/calm.png"),
  spark: publicUrl("/buddy/spark.png"),
  rest: publicUrl("/buddy/rest.png"),
  happy: publicUrl("/buddy/happy.png"),
};
