import { useEffect, useState } from "react";
import { nowHHmm } from "@/lib/dates";

export function useNow(intervalMs = 20_000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = window.setInterval(tick, intervalMs);
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intervalMs]);

  return { now, hhmm: nowHHmm(now) };
}
