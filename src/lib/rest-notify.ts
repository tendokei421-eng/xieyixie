import { publicUrl } from "./asset";
import { activityById } from "./recommendations";
import { playRestChime, primeRestChime, startKeepAlive, stopKeepAlive } from "./rest-chime";
import { useAppStore } from "./store";

export const VIBRATE_PATTERN = [500, 140, 500, 140, 500, 140, 500, 140, 500, 140, 800];
const NOTICE_TAG = "xieyixie-rest-done";
const NATIVE_NOTICE_ID = 42101;
const REST_CHANNEL = "rest-end";

let workerPromise: Promise<ServiceWorkerRegistration | null> | null = null;
let announcedAt = "";
let listening = false;
let pageTimer = 0;

function isEmbeddedPreview() {
  if (typeof window === "undefined") return true;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

type NativeLocalNotifications = {
  requestPermissions: () => Promise<{ display?: string }>;
  checkPermissions?: () => Promise<{ display?: string }>;
  checkExactNotificationSetting?: () => Promise<{ exact_alarm?: string }>;
  changeExactNotificationSetting?: () => Promise<{ exact_alarm?: string }>;
  createChannel?: (channel: {
    id: string;
    name: string;
    description?: string;
    importance?: number;
    visibility?: number;
    vibration?: boolean;
    sound?: string;
  }) => Promise<void>;
  schedule: (opts: {
    notifications: Array<{
      id: number;
      title: string;
      body: string;
      channelId?: string;
      sound?: string;
      schedule?: { at: string | Date; allowWhileIdle?: boolean };
    }>;
  }) => Promise<unknown>;
  cancel: (opts: { notifications: Array<{ id: number }> }) => Promise<unknown>;
};

function nativeLocalNotifications(): NativeLocalNotifications | null {
  if (typeof window === "undefined") return null;
  const cap = (
    window as unknown as {
      Capacitor?: {
        isNativePlatform?: () => boolean;
        Plugins?: { LocalNotifications?: NativeLocalNotifications };
      };
    }
  ).Capacitor;
  if (!cap?.isNativePlatform?.()) return null;
  return cap.Plugins?.LocalNotifications ?? null;
}

async function armNativeNotifications() {
  const ln = nativeLocalNotifications();
  if (!ln) return;
  try {
    await ln.requestPermissions();
  } catch {
    /* denied or plugin missing */
  }
  try {
    await ln.createChannel?.({
      id: REST_CHANNEL,
      name: "休息结束",
      description: "休息计时结束提醒",
      importance: 5,
      visibility: 1,
      vibration: true,
      sound: "rest_done",
    });
  } catch {
    /* channel may already exist */
  }
}

async function scheduleNativeRestEnd(payload: { endAt: number; title: string; body: string }) {
  const ln = nativeLocalNotifications();
  if (!ln) return;
  const when = new Date(payload.endAt);
  if (when.getTime() <= Date.now() + 500) return;
  try {
    await ln.cancel({ notifications: [{ id: NATIVE_NOTICE_ID }] });
    await ln.schedule({
      notifications: [
        {
          id: NATIVE_NOTICE_ID,
          title: payload.title,
          body: payload.body,
          channelId: REST_CHANNEL,
          sound: "rest_done",
          schedule: { at: when.toISOString(), allowWhileIdle: true },
        },
      ],
    });
  } catch {
    try {
      await ln.schedule({
        notifications: [
          {
            id: NATIVE_NOTICE_ID,
            title: payload.title,
            body: payload.body,
            channelId: REST_CHANNEL,
            sound: "rest_done",
            schedule: { at: when, allowWhileIdle: true },
          },
        ],
      });
    } catch {
      /* exact alarm still blocked */
    }
  }
}

async function cancelNativeRestEnd() {
  const ln = nativeLocalNotifications();
  if (!ln) return;
  try {
    await ln.cancel({ notifications: [{ id: NATIVE_NOTICE_ID }] });
  } catch {
    /* ignore */
  }
}

function appIsOpen() {
  return typeof document !== "undefined" && document.visibilityState === "visible";
}

export function registerRestWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return Promise.resolve(null);
  }
  if (isEmbeddedPreview()) {
    void navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const reg of regs) void reg.unregister();
    });
    return Promise.resolve(null);
  }
  listenForForeground();
  if (!workerPromise) {
    workerPromise = navigator.serviceWorker
      .register(publicUrl("/sw.js"), { scope: publicUrl("/") })
      .then(async (reg) => {
        await navigator.serviceWorker.ready;
        navigator.serviceWorker.addEventListener("message", onWorkerMessage);
        return reg;
      })
      .catch(() => null);
  }
  return workerPromise;
}

function listenForForeground() {
  if (listening || typeof document === "undefined") return;
  listening = true;
  const onHidden = () => {
    if (document.visibilityState === "visible") {
      void dismissRestNotice();
      return;
    }
    if (useAppStore.getState().activeRest) startKeepAlive();
  };
  document.addEventListener("visibilitychange", onHidden);
  window.addEventListener("pagehide", () => {
    if (useAppStore.getState().activeRest) startKeepAlive();
  });
  document.addEventListener("freeze", () => {
    if (useAppStore.getState().activeRest) startKeepAlive();
  });
  document.addEventListener("resume", () => {
    const active = useAppStore.getState().activeRest;
    if (!active) return;
    const endAt = new Date(active.startedAt).getTime() + active.durationMin * 60_000;
    if (Date.now() >= endAt) {
      announceRestFinished(active);
      useAppStore.getState().completeRest();
    }
  });
}

async function dismissRestNotice() {
  try {
    await cancelNativeRestEnd();
    const reg = await registerRestWorker();
    const notes = await reg?.getNotifications?.({ tag: NOTICE_TAG });
    notes?.forEach((n) => n.close());
  } catch {
    /* ignore */
  }
}

export async function enableAppPermissions() {
  await armNativeNotifications();
  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch {
      /* ignore */
    }
  }
  primeRestChime();
  try {
    navigator.vibrate?.([80, 50, 80]);
  } catch {
    /* iOS has no vibrate */
  }
  try {
    await navigator.storage?.persist?.();
  } catch {
    /* optional */
  }
  await registerRestWorker();
}

export async function armRestAlerts() {
  await enableAppPermissions();
  startKeepAlive();
}

export async function beginRest(activityId: string, durationMin: number) {
  await armRestAlerts();
  useAppStore.getState().startRest(activityId, durationMin);
}

export function vibrateRestDone() {
  try {
    navigator.vibrate?.(VIBRATE_PATTERN);
  } catch {
    /* iOS Safari has no vibrate */
  }
}

function payloadFor(active: { activityId: string; startedAt: string; durationMin: number }) {
  const activity = activityById(active.activityId);
  return {
    endAt: new Date(active.startedAt).getTime() + active.durationMin * 60_000,
    title: "歇一歇",
    body: activity ? `${activity.title}，结束了` : "这段休息结束了",
    key: active.startedAt,
  };
}

function postToWorker(
  reg: ServiceWorkerRegistration | null | undefined,
  message: Record<string, unknown>,
) {
  const worker = reg?.active ?? navigator.serviceWorker?.controller;
  worker?.postMessage(message);
}

export async function scheduleRestEnd(active: {
  activityId: string;
  startedAt: string;
  durationMin: number;
}) {
  announcedAt = "";
  const payload = payloadFor(active);
  if (pageTimer) window.clearTimeout(pageTimer);
  pageTimer = window.setTimeout(() => {
    const current = useAppStore.getState().activeRest;
    if (!current || current.startedAt !== active.startedAt) return;
    announceRestFinished(current);
    useAppStore.getState().completeRest();
  }, Math.max(0, payload.endAt - Date.now()));

  await scheduleNativeRestEnd(payload);

  const reg = await registerRestWorker();
  postToWorker(reg, { type: "schedule-rest-end", ...payload });

  if (nativeLocalNotifications()) return;

  try {
    const Trigger = (window as unknown as { TimestampTrigger?: new (t: number) => unknown })
      .TimestampTrigger;
    if (reg && Trigger && "showTrigger" in Notification.prototype) {
      await reg.showNotification(payload.title, {
        body: payload.body,
        icon: publicUrl("/icon-192.png"),
        badge: publicUrl("/icon-192.png"),
        lang: "zh-CN",
        tag: NOTICE_TAG,
        renotify: true,
        requireInteraction: true,
        vibrate: VIBRATE_PATTERN,
        timestamp: payload.endAt,
        data: { url: publicUrl("/") },
        showTrigger: new Trigger(payload.endAt),
      } as NotificationOptions);
    }
  } catch {
    /* Notification Triggers unavailable */
  }
}

export function cancelRestEnd() {
  stopKeepAlive();
  if (pageTimer) {
    window.clearTimeout(pageTimer);
    pageTimer = 0;
  }
  void cancelNativeRestEnd();
  const worker = navigator.serviceWorker?.controller;
  worker?.postMessage({ type: "cancel-rest-end" });
  void registerRestWorker().then((reg) => {
    postToWorker(reg, { type: "cancel-rest-end" });
    void reg
      ?.getNotifications?.({ tag: NOTICE_TAG })
      .then((notes) => notes.forEach((n) => n.close()))
      .catch(() => undefined);
  });
}

export function announceRestFinished(active: {
  activityId: string;
  startedAt: string;
  durationMin: number;
}) {
  const payload = payloadFor(active);
  if (announcedAt === payload.key) return;
  announcedAt = payload.key;
  playRestChime();
  if (appIsOpen()) return;
  vibrateRestDone();
  window.setTimeout(() => vibrateRestDone(), 1600);
  void showBackgroundNotice(payload);
}

async function showBackgroundNotice(payload: { title: string; body: string }) {
  if (appIsOpen()) return;
  if (nativeLocalNotifications()) return;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;

  const options = {
    body: payload.body,
    icon: publicUrl("/icon-192.png"),
    badge: publicUrl("/icon-192.png"),
    lang: "zh-CN",
    tag: NOTICE_TAG,
    renotify: true,
    requireInteraction: true,
    silent: false,
    vibrate: VIBRATE_PATTERN,
    data: { url: publicUrl("/") },
  } as NotificationOptions;

  const reg = await registerRestWorker();
  try {
    if (reg) {
      await reg.showNotification(payload.title, options);
    } else {
      const n = new Notification(payload.title, options);
      n.onclick = () => {
        window.focus();
        n.close();
      };
    }
  } catch {
    try {
      const n = new Notification(payload.title, options);
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch {
      /* ignore */
    }
  }
}

function onWorkerMessage(event: MessageEvent) {
  if (event.data?.type !== "rest-timer-fired") return;
  const active = useAppStore.getState().activeRest;
  if (!active) return;
  announceRestFinished(active);
  useAppStore.getState().completeRest();
}
