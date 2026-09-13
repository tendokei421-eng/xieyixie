import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bell } from "lucide-react";
import { dateKey } from "@/lib/dates";
import {
  REMINDERS,
  canNotify,
  msUntilNextBell,
  nextUnseenReminder,
  notifyReminder,
  reminderActivity,
  reminderKey,
  type ReminderId,
} from "@/lib/reminders";
import { MOOD_SRC } from "@/lib/relaxation";
import { useAppStore } from "@/lib/store";
import { useLockBody } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const AFTER_SPLASH_MS = 1800;

export function ReminderPopup() {
  const hydrated = useAppStore((s) => s.hydrated);
  const seen = useAppStore((s) => s.seenReminderKeys);
  const markSeen = useAppStore((s) => s.markReminderSeen);
  const markNotified = useAppStore((s) => s.markReminderNotified);
  const activeRest = useAppStore((s) => s.activeRest);
  const editorOpen = useAppStore((s) => s.editor.open);
  const startRest = useAppStore((s) => s.startRest);

  const [ready, setReady] = useState(false);
  const [slot, setSlot] = useState<ReminderId | null>(null);
  const [notifyState, setNotifyState] = useState<NotificationPermission | "unsupported">(
    "default",
  );

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => setReady(true), AFTER_SPLASH_MS);
    return () => window.clearTimeout(t);
  }, [hydrated]);

  useEffect(() => {
    setNotifyState(canNotify() ? Notification.permission : "unsupported");
  }, []);

  useEffect(() => {
    if (!ready) return;

    const tick = () => {
      if (useAppStore.getState().activeRest) {
        setSlot(null);
        return;
      }
      const now = new Date();
      const today = dateKey(now);
      const seenKeys = useAppStore.getState().seenReminderKeys;
      const id = nextUnseenReminder(now, seenKeys, today);
      setSlot(id);
      if (!id) return;

      const key = reminderKey(today, id);
      const already = useAppStore.getState().notifiedReminderKeys.includes(key);
      if (!already) {
        notifyReminder(id);
        markNotified(key);
        try {
          navigator.vibrate?.(180);
        } catch {
          /* ignore */
        }
      }
    };

    tick();
    const interval = window.setInterval(tick, 20_000);
    const bell = window.setTimeout(tick, msUntilNextBell() + 400);
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(bell);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready, seen, markNotified]);

  const open = !!slot && !activeRest && !editorOpen;
  useLockBody(open);

  if (!slot) return null;
  const reminder = REMINDERS[slot];
  const activity = reminderActivity(slot);

  const dismiss = () => {
    markSeen(reminderKey(dateKey(), slot));
    setSlot(null);
  };

  const start = () => {
    if (activity) startRest(activity.id, activity.durationMin);
    dismiss();
  };

  const enableNotify = async () => {
    if (!canNotify()) return;
    try {
      const result = await Notification.requestPermission();
      setNotifyState(result);
      if (result === "granted") notifyReminder(slot);
    } catch {
      setNotifyState("denied");
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-fg/35 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          aria-describedby="remind-body"
          className="fixed inset-x-4 top-1/2 z-[90] w-auto max-w-sm -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-card-hover outline-none data-[state=open]:animate-[enter-up_220ms_ease-out] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <img
            src={MOOD_SRC.rest}
            alt=""
            draggable={false}
            className="buddy-float mx-auto h-28 w-auto object-contain"
          />
          <Dialog.Title className="mt-2 text-center font-display text-xl font-semibold">
            {reminder.title}
          </Dialog.Title>
          <p id="remind-body" className="mt-2 text-center text-sm leading-relaxed text-muted">
            {reminder.body}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button size="lg" className="w-full" onClick={start}>
              现在就歇
            </Button>
            <Button size="lg" variant="secondary" className="w-full" onClick={dismiss}>
              知道了
            </Button>
            {notifyState === "default" ? (
              <button
                type="button"
                onClick={() => void enableNotify()}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium text-primary"
              >
                <Bell className="size-3.5" />
                打开系统通知，到点也会提醒
              </button>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
