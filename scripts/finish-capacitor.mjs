#!/usr/bin/env node
/**
 * After a Capacitor SPA build: copy the static client to capacitor-www/
 * with base "/" so the Android WebView can load assets from the app package.
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BASE = "/";
const OUT = join(ROOT, "capacitor-www");

const candidates = [
  join(ROOT, "dist/client"),
  join(ROOT, "dist"),
  join(ROOT, ".output/public"),
];

const src = candidates.find((dir) => existsSync(join(dir, "index.html")));
if (!src) {
  console.error("finish-capacitor: no index.html in", candidates.join(", "));
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(src, OUT, { recursive: true });

if (existsSync(join(OUT, "index.html"))) {
  copyFileSync(join(OUT, "index.html"), join(OUT, "404.html"));
}

const icon = (file) => `${BASE}${file.replace(/^\//, "")}`;

const manifest = JSON.stringify(
  {
    name: "歇一歇",
    short_name: "歇一歇",
    description: "工作中安排日程，在空闲里休息一下",
    lang: "zh-CN",
    id: BASE,
    start_url: BASE,
    scope: BASE,
    display: "standalone",
    background_color: "#f6f8fb",
    theme_color: "#4b9ed1",
    icons: [
      {
        src: icon("__grok/icon-180.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("icon-512-maskable.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  null,
  2,
);

writeFileSync(join(OUT, "manifest.webmanifest"), manifest);
mkdirSync(join(OUT, "__grok"), { recursive: true });
writeFileSync(join(OUT, "__grok/manifest.webmanifest"), manifest);

console.log(`finish-capacitor: ${src} → ${OUT}`);
