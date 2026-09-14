import { useEffect, useState, type ReactNode } from "react";
import { MOOD_SRC } from "@/lib/relaxation";
import { useAppStore } from "@/lib/store";
import { SplashScreen } from "@/components/splash-screen";

const BUDDY_SRCS = Object.values(MOOD_SRC);
const EXIT_MS = 280;
const BAR_SETTLE_MS = 360;
const HARD_CAP_MS = 8000;

function isNativeApp() {
  if (typeof window === "undefined") return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor;
  return cap?.isNativePlatform?.() === true;
}

function hideNativeSplash() {
  const cap = (
    window as unknown as {
      Capacitor?: { Plugins?: { SplashScreen?: { hide?: () => Promise<void> } } };
    }
  ).Capacitor;
  void cap?.Plugins?.SplashScreen?.hide?.();
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([promise, sleep(ms).then(() => undefined)]);
}

export function HydrateStore({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(8);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const bump = (n: number) => {
      if (!cancelled) setProgress((p) => Math.max(p, n));
    };

    const started = performance.now();
    const minSplashMs = isNativeApp() ? 2200 : 900;
    hideNativeSplash();

    const run = async () => {
      bump(14);

      const fonts =
        typeof document !== "undefined" && document.fonts?.ready
          ? document.fonts.ready.then(() => bump(28)).catch(() => bump(28))
          : Promise.resolve().then(() => bump(28));

      const storage = Promise.resolve(useAppStore.persist.rehydrate())
        .catch(() => undefined)
        .then(() => bump(55));

      const images = (async () => {
        let loaded = 0;
        await Promise.all(
          BUDDY_SRCS.map(async (src) => {
            await preloadImage(src);
            loaded += 1;
            bump(55 + Math.round((loaded / BUDDY_SRCS.length) * 27));
          }),
        );
      })();

      await Promise.all([
        withTimeout(fonts, 2000),
        withTimeout(storage, 2500),
        withTimeout(images, 2500),
      ]);

      if (cancelled) return;
      try {
        useAppStore.getState().seedTodayIfEmpty();
      } catch {
        /* demo seed is optional */
      }
      useAppStore.getState().setHydrated(true);
      bump(94);

      const elapsed = performance.now() - started;
      await sleep(Math.max(0, minSplashMs - elapsed));
      if (cancelled) return;

      bump(100);
      await sleep(BAR_SETTLE_MS);
      if (cancelled) return;

      setLeaving(true);
      await sleep(EXIT_MS);
      if (!cancelled) setVisible(false);
    };

    const cap = window.setTimeout(() => {
      if (cancelled) return;
      try {
        useAppStore.getState().seedTodayIfEmpty();
      } catch {
        /* ignore */
      }
      useAppStore.getState().setHydrated(true);
      setProgress(100);
      setLeaving(true);
      window.setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, EXIT_MS);
    }, HARD_CAP_MS);

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <>
      {visible ? <SplashScreen progress={progress} leaving={leaving} /> : null}
      <div className="h-full" aria-hidden={visible && !leaving ? true : undefined}>
        {children}
      </div>
    </>
  );
}
