import { useEffect, useState } from "react";

export type VisualViewportState = {
  height: number;
  offsetTop: number;
  keyboardInset: number;
  keyboardOpen: boolean;
};

function readViewport(): VisualViewportState {
  if (typeof window === "undefined") {
    return { height: 0, offsetTop: 0, keyboardInset: 0, keyboardOpen: false };
  }
  const vv = window.visualViewport;
  const height = vv?.height ?? window.innerHeight;
  const offsetTop = vv?.offsetTop ?? 0;
  const keyboardInset = Math.max(0, window.innerHeight - height - offsetTop);
  return {
    height,
    offsetTop,
    keyboardInset,
    keyboardOpen: keyboardInset > 80,
  };
}

export function useVisualViewport() {
  const [state, setState] = useState<VisualViewportState>(readViewport);

  useEffect(() => {
    const update = () => setState(readViewport());
    const vv = window.visualViewport;
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return state;
}

export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [locked]);
}
