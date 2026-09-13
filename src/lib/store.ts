import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActiveRest, CalendarEvent, RestLog } from "./types";
import { dateKey, hhmmOf, minutesOf, nowHHmm } from "./dates";
import { uid } from "./utils";

type EditorState =
  | { open: false }
  | { open: true; mode: "create" | "edit"; draft: CalendarEvent };

type AppState = {
  hydrated: boolean;
  initialized: boolean;
  selectedDate: string;
  events: CalendarEvent[];
  restLogs: RestLog[];
  activeRest: ActiveRest | null;
  editor: EditorState;
  setHydrated: (v: boolean) => void;
  setSelectedDate: (date: string) => void;
  addEvent: (e: CalendarEvent) => void;
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;
  copyEvent: (id: string) => CalendarEvent | null;
  eventsOn: (date: string) => CalendarEvent[];
  seedTodayIfEmpty: () => void;
  openCreate: (partial?: Partial<CalendarEvent>) => void;
  openEdit: (id: string) => void;
  openDuplicate: (id: string) => void;
  closeEditor: () => void;
  saveEditor: (incoming?: CalendarEvent) => { ok: true } | { ok: false; error: string };
  startRest: (activityId: string, durationMin: number) => void;
  completeRest: () => void;
  cancelRest: () => void;
  restLogsOn: (date: string) => RestLog[];
};

function defaultDraft(date: string): CalendarEvent {
  const now = minutesOf(nowHHmm());
  const start = Math.ceil((now + 5) / 15) * 15;
  const end = start + 60;
  return {
    id: uid(),
    date,
    start: hhmmOf(Math.min(start, 22 * 60)),
    end: hhmmOf(Math.min(end, 23 * 60)),
    title: "",
    detail: "",
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      initialized: false,
      selectedDate: dateKey(),
      events: [],
      restLogs: [],
      activeRest: null,
      editor: { open: false },
      setHydrated: (v) => set({ hydrated: v }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      addEvent: (e) => set({ events: [...get().events, e] }),
      updateEvent: (id, patch) =>
        set({
          events: get().events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        }),
      removeEvent: (id) =>
        set({
          events: get().events.filter((e) => e.id !== id),
          editor: { open: false },
        }),
      copyEvent: (id) => {
        const src = get().events.find((e) => e.id === id);
        if (!src) return null;
        const copy: CalendarEvent = {
          ...src,
          id: uid(),
          title: src.title.endsWith("（副本）") ? src.title : `${src.title}（副本）`,
        };
        set({ events: [...get().events, copy] });
        return copy;
      },
      eventsOn: (date) =>
        get()
          .events.filter((e) => e.date === date)
          .slice()
          .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)),
      seedTodayIfEmpty: () => {
        if (get().initialized) return;
        set({ initialized: true, selectedDate: dateKey() });
      },
      openCreate: (partial) => {
        const date = partial?.date ?? get().selectedDate;
        set({
          editor: {
            open: true,
            mode: "create",
            draft: { ...defaultDraft(date), ...partial, id: uid(), date },
          },
        });
      },
      openEdit: (id) => {
        const src = get().events.find((e) => e.id === id);
        if (!src) return;
        set({ editor: { open: true, mode: "edit", draft: { ...src } } });
      },
      openDuplicate: (id) => {
        const src = get().events.find((e) => e.id === id);
        if (!src) return;
        set({
          editor: {
            open: true,
            mode: "create",
            draft: {
              ...src,
              id: uid(),
              title: src.title.endsWith("（副本）") ? src.title : `${src.title}（副本）`,
            },
          },
        });
      },
      closeEditor: () => set({ editor: { open: false } }),
      saveEditor: (incoming) => {
        const editor = get().editor;
        if (!editor.open) return { ok: false, error: "没有待保存的日程" };
        const d = incoming ?? editor.draft;
        if (!d.title.trim()) return { ok: false, error: "请填写题目" };
        if (!d.start || !d.end) return { ok: false, error: "请填写起止时间" };
        if (minutesOf(d.end) <= minutesOf(d.start)) {
          return { ok: false, error: "结束时间需晚于开始时间" };
        }
        const next: CalendarEvent = {
          ...d,
          title: d.title.trim(),
          detail: d.detail.trim(),
        };
        if (editor.mode === "create") {
          set({ events: [...get().events, next], editor: { open: false } });
        } else {
          set({
            events: get().events.map((e) => (e.id === next.id ? next : e)),
            editor: { open: false },
          });
        }
        return { ok: true };
      },
      startRest: (activityId, durationMin) =>
        set({
          activeRest: {
            activityId,
            durationMin,
            startedAt: new Date().toISOString(),
          },
        }),
      completeRest: () => {
        const active = get().activeRest;
        if (!active) return;
        const log: RestLog = {
          id: uid(),
          date: dateKey(),
          activityId: active.activityId,
          startedAt: active.startedAt,
          durationMin: active.durationMin,
          completed: true,
        };
        set({
          restLogs: [...get().restLogs, log],
          activeRest: null,
        });
      },
      cancelRest: () => set({ activeRest: null }),
      restLogsOn: (date) => get().restLogs.filter((l) => l.date === date),
    }),
    {
      name: "xieyixie-v2",
      skipHydration: true,
      partialize: (s) => ({
        initialized: s.initialized,
        selectedDate: s.selectedDate,
        events: s.events,
        restLogs: s.restLogs,
        activeRest: s.activeRest,
      }),
    },
  ),
);
