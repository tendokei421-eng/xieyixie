/* 歇一歇 rest-timer worker v2. No fetch handler — do not intercept app assets. */
const TAG = "xieyixie-rest-done";
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

  if (windows.length === 0) {
    // Page is gone — system notification (lock screen if locked, banner if not).
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
        vibrate: [400, 120, 400, 120, 400, 120, 500, 180, 700],
        data: { url: self.registration.scope },
      });
    } catch {
      /* permission may have been revoked */
    }
  } else if (!appOpen) {
    // Backgrounded but page still running: let it play the 5s chime + notify.
    for (const client of windows) {
      client.postMessage({ type: "rest-timer-fired" });
    }
  }
  // App in the foreground: the rest screen finishes itself. No notification.
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
