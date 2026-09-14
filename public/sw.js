/* 歇一歇 rest-timer worker v4. No fetch handler — do not intercept app assets. */
const TAG = "xieyixie-rest-done";
const VIBRATE = [500, 140, 500, 140, 500, 140, 500, 140, 500, 140, 800];
let restTimer = 0;
let pending = null;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "cancel-rest-end") {
    clearRestTimer();
    pending = null;
    return;
  }
  if (data.type === "schedule-rest-end") {
    clearRestTimer();
    pending = data;
    const delay = Math.max(0, Number(data.endAt) - Date.now());
    restTimer = setTimeout(() => {
      void fireRestEnd(pending);
    }, delay);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(openApp());
});

function clearRestTimer() {
  if (restTimer) {
    clearTimeout(restTimer);
    restTimer = 0;
  }
}

function iconUrl(file) {
  try {
    return new URL(file, self.registration.scope).href;
  } catch {
    return file;
  }
}

async function fireRestEnd(payload) {
  if (!payload) return;
  const windows = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  const appOpen = windows.some((client) => client.visibilityState === "visible");

  for (const client of windows) {
    client.postMessage({ type: "rest-timer-fired" });
  }

  if (appOpen) {
    pending = null;
    return;
  }

  // Locked / screen off → lock-screen notice.
  // Screen on, app in background → banner / heads-up.
  // The OS chooses from the lock state; the Web API cannot force one or the other.
  try {
    await self.registration.showNotification(payload.title || "歇一歇", {
      body: payload.body || "这段休息结束了",
      icon: iconUrl("icon-192.png"),
      badge: iconUrl("icon-192.png"),
      lang: "zh-CN",
      tag: TAG,
      renotify: true,
      requireInteraction: true,
      silent: false,
      vibrate: VIBRATE,
      data: { url: self.registration.scope },
    });
  } catch {
    /* permission may have been revoked */
  }
  pending = null;
}

async function openApp() {
  const windows = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (const client of windows) {
    if ("focus" in client) return client.focus();
  }
  if (self.clients.openWindow) {
    return self.clients.openWindow(self.registration.scope);
  }
}
