import { addDays } from "date-fns";
import { dateKey, parseDateKey } from "./dates";
import { publicUrl } from "./asset";
import { activityById } from "./recommendations";

export type ReminderId = "noon" | "evening";

export type Reminder = {
  id: ReminderId;
  hour: number;
  minute: number;
  title: string;
  body: string;
  activityId: string;
};

export const REMINDERS: Record<ReminderId, Reminder> = {
  noon: {
    id: "noon",
    hour: 12,
    minute: 0,
    title: "中午了，歇一歇",
    body: "离开工位一下。下楼晒晒太阳，或慢慢吃一点健康零食。把眼睛从屏幕上拿开几分钟。",
    activityId: "sun-walk",
  },
  evening: {
    id: "evening",
    hour: 18,
    minute: 0,
    title: "傍晚了，歇一歇",
    body: "今天已经坐了很久。看看窗外，伸个懒腰，把肩膀松开。剩下的事，稍后再说。",
    activityId: "window",
  },
};

export function reminderKey(date: string, id: ReminderId) {
  return `${date}:${id}`;
}

export function parseReminderKey(key: string) {
  const [date, id] = key.split(":");
  return { date, id: id as ReminderId };
}

/** Latest due, unseen reminder for this clock. After 18:00 prefers evening. */
export function nextUnseenReminder(
  now: Date,
  seen: Iterable<string>,
  date = dateKey(now),
): ReminderId | null {
  const seenSet = seen instanceof Set ? seen : new Set(seen);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const due: ReminderId[] = [];
  if (minutes >= 18 * 60) due.push("evening");
  if (minutes >= 12 * 60) due.push("noon");
  return due.find((id) => !seenSet.has(reminderKey(date, id))) ?? null;
}

export function pruneReminderKeys(keys: string[], today = dateKey()) {
  const cutoff = dateKey(addDays(parseDateKey(today), -10));
  return keys.filter((key) => (key.split(":")[0] ?? "") >= cutoff);
}

export function msUntilNextBell(now = new Date()) {
  const candidates = [12, 18].map((hour) => {
    const next = new Date(now);
    next.setHours(hour, 0, 0, 0);
    if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
    return next.getTime() - now.getTime();
  });
  return Math.min(...candidates);
}

export function reminderActivity(id: ReminderId) {
  return activityById(REMINDERS[id].activityId);
}

export function canNotify() {
  return typeof Notification !== "undefined";
}

export function notifyReminder(id: ReminderId) {
  if (!canNotify() || Notification.permission !== "granted") return;
  const r = REMINDERS[id];
  try {
    const n = new Notification(r.title, {
      body: r.body,
      icon: publicUrl("/icon-192.png"),
      tag: `xieyixie-${dateKey()}-${id}`,
      silent: false,
    });
    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch {
    /* some browsers require a service worker for Notification */
  }
}
