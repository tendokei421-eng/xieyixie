import {
  addDays,
  format,
  isToday,
  parse,
  parseISO,
  startOfWeek,
} from "date-fns";
import { zhCN } from "date-fns/locale";

export function dateKey(d: Date = new Date()) {
  return format(d, "yyyy-MM-dd");
}

export function parseDateKey(key: string) {
  return parseISO(`${key}T12:00:00`);
}

export function formatDayTitle(key: string) {
  const d = parseDateKey(key);
  if (isToday(d)) return `今天 · ${format(d, "M月d日 EEEE", { locale: zhCN })}`;
  return format(d, "M月d日 EEEE", { locale: zhCN });
}

export function formatShortDay(key: string) {
  return format(parseDateKey(key), "M/d");
}

export function weekdayLabel(key: string) {
  return format(parseDateKey(key), "EEEEE", { locale: zhCN });
}

export function minutesOf(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function hhmmOf(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function nowHHmm(d = new Date()) {
  return format(d, "HH:mm");
}

export function parseHHmmOnDate(date: string, hhmm: string) {
  return parse(`${date} ${hhmm}`, "yyyy-MM-dd HH:mm", new Date());
}

export function weekKeys(around: string) {
  const start = startOfWeek(parseDateKey(around), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => dateKey(addDays(start, i)));
}

export function timeOfDay(hhmm: string): "morning" | "noon" | "afternoon" | "evening" {
  const m = minutesOf(hhmm);
  if (m < 11 * 60) return "morning";
  if (m < 14 * 60) return "noon";
  if (m < 18 * 60) return "afternoon";
  return "evening";
}

export function durationLabel(min: number) {
  if (min < 60) return `${min} 分钟`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest ? `${h} 小时 ${rest} 分钟` : `${h} 小时`;
}
