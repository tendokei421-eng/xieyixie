import { publicUrl } from "./asset";

let chime: HTMLAudioElement | null = null;

function getChime() {
  if (typeof window === "undefined") return null;
  if (!chime) {
    chime = new Audio(publicUrl("/sounds/rest-done.mp3"));
    chime.preload = "auto";
    chime.setAttribute("playsinline", "");
  }
  return chime;
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

export function playRestChime() {
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
  if (!chime) return;
  chime.pause();
  chime.currentTime = 0;
}
