import { publicUrl } from "./asset";

let chime: HTMLAudioElement | null = null;
let keepAlive: HTMLAudioElement | null = null;

function getChime() {
  if (typeof window === "undefined") return null;
  if (!chime) {
    chime = new Audio(publicUrl("/sounds/rest-done.mp3"));
    chime.preload = "auto";
    chime.setAttribute("playsinline", "");
  }
  return chime;
}

function getKeepAlive() {
  if (typeof window === "undefined") return null;
  if (!keepAlive) {
    keepAlive = new Audio(publicUrl("/sounds/keep-alive.wav"));
    keepAlive.loop = true;
    keepAlive.preload = "auto";
    keepAlive.volume = 0.02;
    keepAlive.setAttribute("playsinline", "");
  }
  return keepAlive;
}

function markPlaying() {
  try {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "正在歇一歇",
      artist: "歇一歇",
      artwork: [
        { src: publicUrl("/icon-192.png"), sizes: "192x192", type: "image/png" },
        { src: publicUrl("/icon-512.png"), sizes: "512x512", type: "image/png" },
      ],
    });
    navigator.mediaSession.playbackState = "playing";
  } catch {
    /* mediaSession is optional */
  }
}

/** Call while a user gesture is still warm so iOS will allow playback later. */
export function primeRestChime() {
  const audio = getChime();
  if (!audio) return;
  audio.muted = true;
  const play = audio.play();
  if (!play) return;
  void play
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    })
    .catch(() => {
      audio.muted = false;
    });
}

/** Quiet loop so mobile browsers keep the rest timer alive in the background. */
export function startKeepAlive() {
  const audio = getKeepAlive();
  if (!audio) return;
  try {
    audio.currentTime = 0;
    audio.volume = 0.02;
    void audio.play().then(markPlaying).catch(() => undefined);
  } catch {
    /* autoplay policies can still block */
  }
}

export function stopKeepAlive() {
  if (!keepAlive) return;
  keepAlive.pause();
  keepAlive.currentTime = 0;
  try {
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none";
  } catch {
    /* ignore */
  }
}

export function playRestChime() {
  stopKeepAlive();
  const audio = getChime();
  if (!audio) return;
  try {
    audio.pause();
    audio.muted = false;
    audio.currentTime = 0;
    audio.volume = 1;
    void audio.play().catch(() => undefined);
  } catch {
    /* autoplay policies can still block; rest UI already shows done */
  }
}

export function stopRestChime() {
  stopKeepAlive();
  if (!chime) return;
  chime.pause();
  chime.currentTime = 0;
}
