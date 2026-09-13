import type {
  CalendarEvent,
  Gap,
  RestActivity,
  RestLog,
  TimeOfDay,
} from "./types";
import { minutesOf, timeOfDay as slotOf } from "./dates";

export const ACTIVITIES: RestActivity[] = [
  {
    id: "sun-walk",
    title: "走出工位，下楼晒晒太阳",
    detail: "离开屏幕，坐电梯或走楼梯到楼下。站在日光里三到五分钟，让眼睛看向远处。",
    durationMin: 8,
    kind: "sun",
    best: ["morning", "noon"],
    minGapMin: 8,
  },
  {
    id: "snack",
    title: "奖励自己一份健康小零食",
    detail: "坚果、水果或酸奶都可以。慢慢吃，把注意力放回身体，而不是下一封邮件。",
    durationMin: 6,
    kind: "snack",
    best: ["noon", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "window",
    title: "看看窗外，欣赏一处风景",
    detail: "走到窗边，找一朵云、一棵树或路过的人。不拍照，不评价，只看一会儿。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "stretch",
    title: "起身伸个懒腰",
    detail: "双手向上延展，再轻轻转肩、转转手腕。让坐了太久的脊柱重新打开。",
    durationMin: 4,
    kind: "stretch",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 4,
  },
  {
    id: "breath",
    title: "闭眼，做一组深呼吸",
    detail: "坐直或靠墙。吸气四拍，停一拍，呼气六拍。重复八次，让肩膀慢慢松开。",
    durationMin: 3,
    kind: "breath",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "corridor",
    title: "在走廊里慢慢走一圈",
    detail: "不必去很远。离开工位，把步子放慢，数四十步再回来。",
    durationMin: 7,
    kind: "walk",
    best: ["morning", "noon", "afternoon"],
    minGapMin: 6,
  },
  {
    id: "tea",
    title: "泡一杯温热的花茶",
    detail: "去茶水间，等水开的时间就是休息。喝的时候不看手机。",
    durationMin: 8,
    kind: "tea",
    best: ["afternoon", "evening"],
    minGapMin: 8,
  },
  {
    id: "shoulders",
    title: "转转手腕和肩膀",
    detail: "十次肩绕环，十次手腕绕环，再轻轻按一按虎口。专为久坐打字的人准备。",
    durationMin: 4,
    kind: "hands",
    best: ["morning", "afternoon", "evening"],
    minGapMin: 3,
  },
  {
    id: "green",
    title: "远眺一株绿色植物",
    detail: "办公室的绿萝、窗外的行道树都可以。让睫状肌从近距离对焦里松开。",
    durationMin: 5,
    kind: "view",
    best: ["morning", "afternoon"],
    minGapMin: 4,
  },
  {
    id: "stairs",
    title: "到楼梯间走两层",
    detail: "不用跑步。用舒适的节奏上下两层，回来时会有一点温热，脑子更清楚。",
    durationMin: 10,
    kind: "walk",
    best: ["noon", "afternoon"],
    minGapMin: 10,
  },
  {
    id: "sun-window",
    title: "站到有阳光的窗边一会儿",
    detail: "如果来不及下楼，开一扇窗也很好。让风和光线切进下午的节奏。",
    durationMin: 6,
    kind: "sun",
    best: ["morning", "afternoon"],
    minGapMin: 5,
  },
  {
    id: "eyes",
    title: "让眼睛离开屏幕五分钟",
    detail: "用掌心轻轻覆在闭上的眼睛上，不施压。感受黑暗和温度，再慢慢睁开。",
    durationMin: 5,
    kind: "breath",
    best: ["afternoon", "evening"],
    minGapMin: 5,
  },
];

export function mergeBusy(events: CalendarEvent[]): Array<{ start: number; end: number }> {
  const sorted = [...events]
    .map((e) => ({ start: minutesOf(e.start), end: minutesOf(e.end) }))
    .filter((e) => e.end > e.start)
    .sort((a, b) => a.start - b.start);

  const merged: Array<{ start: number; end: number }> = [];
  for (const cur of sorted) {
    const last = merged[merged.length - 1];
    if (!last || cur.start > last.end) merged.push({ ...cur });
    else last.end = Math.max(last.end, cur.end);
  }
  return merged;
}

export function findGaps(
  events: CalendarEvent[],
  workStart = "08:00",
  workEnd = "19:00",
): Gap[] {
  if (events.length === 0) return [];
  const start = minutesOf(workStart);
  const end = minutesOf(workEnd);
  const busy = mergeBusy(events);
  const gaps: Gap[] = [];
  const toHHmm = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

  let cursor = start;
  for (const b of busy) {
    if (b.start > cursor) {
      const minutes = b.start - cursor;
      if (minutes >= 5) {
        gaps.push({ start: toHHmm(cursor), end: toHHmm(b.start), minutes });
      }
    }
    cursor = Math.max(cursor, b.end);
  }
  if (end > cursor) {
    const minutes = end - cursor;
    if (minutes >= 5) {
      gaps.push({ start: toHHmm(cursor), end: toHHmm(end), minutes });
    }
  }
  return gaps;
}

export function currentOrNextGap(gaps: Gap[], nowHHmm: string): Gap | null {
  const now = minutesOf(nowHHmm);
  const current = gaps.find((g) => minutesOf(g.start) <= now && now < minutesOf(g.end));
  if (current) return current;
  return gaps.find((g) => minutesOf(g.start) >= now) ?? null;
}

export function isNowInEvent(events: CalendarEvent[], nowHHmm: string) {
  const now = minutesOf(nowHHmm);
  return events.some((e) => minutesOf(e.start) <= now && now < minutesOf(e.end));
}

function scoreActivity(
  a: RestActivity,
  ctx: {
    tod: TimeOfDay;
    gapMin: number;
    doneIds: string[];
  },
) {
  let s = 10;
  if (a.best.includes(ctx.tod)) s += 8;
  if (a.durationMin <= ctx.gapMin) s += 6;
  else s -= Math.min(12, a.durationMin - ctx.gapMin);
  if (a.minGapMin > ctx.gapMin) s -= 20;
  if (ctx.doneIds.includes(a.id)) s -= 7;
  return s;
}

export function recommendActivities(opts: {
  nowHHmm: string;
  gap: Gap | null;
  restLogs: RestLog[];
  limit?: number;
}): RestActivity[] {
  const tod = slotOf(opts.nowHHmm);
  const gapMin = opts.gap?.minutes ?? 20;
  const doneIds = opts.restLogs.filter((l) => l.completed).map((l) => l.activityId);
  return [...ACTIVITIES]
    .map((a) => ({
      a,
      s: scoreActivity(a, { tod, gapMin, doneIds }),
    }))
    .sort((x, y) => y.s - x.s || x.a.id.localeCompare(y.a.id))
    .slice(0, opts.limit ?? 3)
    .map((x) => x.a);
}

export function pickActivityPage(
  ranked: RestActivity[],
  page: number,
  size = 3,
): RestActivity[] {
  if (ranked.length === 0) return [];
  if (ranked.length <= size) {
    const start = ((page % ranked.length) + ranked.length) % ranked.length;
    return ranked.map((_, i) => ranked[(start + i) % ranked.length]);
  }
  const pages = Math.ceil(ranked.length / size);
  const p = ((page % pages) + pages) % pages;
  return ranked.slice(p * size, p * size + size);
}

export function activityById(id: string) {
  return ACTIVITIES.find((a) => a.id === id);
}

export function kindLabel(kind: RestActivity["kind"]) {
  switch (kind) {
    case "sun":
      return "日光";
    case "snack":
      return "小食";
    case "view":
      return "风景";
    case "stretch":
      return "伸展";
    case "breath":
      return "呼吸";
    case "walk":
      return "走动";
    case "tea":
      return "茶歇";
    case "hands":
      return "放松";
  }
}
