import { publicUrl } from "./asset";
import { activityById } from "./recommendations";
import { playRestChime, primeRestChime, startKeepAlive, stopKeepAlive } from "./rest-chime";
import { useAppStore } from "./store";

const VIBRATE_PATTERN = [400, 120, 400, 120, 400, 120, 500, 180, 700];

let workerPromise: Promise<ServiceWorkerRegistration | null> | null = null;
let announcedAt = "";

function appIsOpen() {
  return typeof document !== "undefined" && document.visibilityState === "visible";
}

export function registerRestWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return Promise.resolve(null);
  }
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

/** Must run inside the tap that starts a rest so iOS allows audio + permission. */
export function armRestAlerts() {
  primeRestChime();
  startKeepAlive();
  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    try {
      void Notification.requestPermission();
    } catch {
      /* ignore */
    }
  }
  void registerRestWorker();
}

export function beginRest(activityId: string, durationMin: number) {
  armRestAlerts();
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
  const reg = await registerRestWorker();
  postToWorker(reg, { type: "schedule-rest-end", ...payload });
}

export function cancelRestEnd() {
  stopKeepAlive();
  const worker = navigator.serviceWorker?.controller;
  worker?.postMessage({ type: "cancel-rest-end" });
  void registerRestWorker().then((reg) => postToWorker(reg, { type: "cancel-rest-end" }));
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
  void showBackgroundNotice(payload);
}

async function showBackgroundNotice(payload: { title: string; body: string }) {
  if (appIsOpen()) return;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;

  const reg = await registerRestWorker();
  try {
    if (reg) {
      await reg.showNotification(payload.title, {
        body: payload.body,
        icon: publicUrl("/icon-192.png"),
        badge: publicUrl("/icon-192.png"),
        lang: "zh-CN",
        tag: "xieyixie-rest-done",
        renotify: true,
        requireInteraction: true,
        silent: true,
        vibrate: VIBRATE_PATTERN,
      } as NotificationOptions);
    } else {
      const n = new Notification(payload.title, {
        body: payload.body,
        icon: publicUrl("/icon-192.png"),
        tag: "xieyixie-rest-done",
        silent: true,
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    }
  } catch {
    /* best-effort on Safari */
  }
}

function onWorkerMessage(event: MessageEvent) {
  if (event.data?.type !== "rest-timer-fired") return;
  const active = useAppStore.getState().activeRest;
  if (!active) return;
  announceRestFinished(active);
  useAppStore.getState().completeRest();
}
