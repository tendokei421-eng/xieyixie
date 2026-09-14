#!/usr/bin/env node
/**
 * Copy the working GitHub Pages static tree into capacitor-www/
 * and rewrite /xieyixie/ to / so the Android WebView can load assets.
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PAGES_BASE = "/xieyixie/";
const OUT = join(ROOT, "capacitor-www");

const TEXT_EXT = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".webmanifest",
  ".txt",
  ".svg",
  ".map",
  ".xml",
]);

function extname(file) {
  const i = file.lastIndexOf(".");
  return i >= 0 ? file.slice(i).toLowerCase() : "";
}

function findIndexDir(dir) {
  if (!existsSync(dir)) return null;
  if (existsSync(join(dir, "index.html"))) return dir;
  if (existsSync(join(dir, "_shell.html"))) return dir;
  try {
    for (const name of readdirSync(dir)) {
      const next = join(dir, name);
      if (statSync(next).isDirectory()) {
        const found = findIndexDir(next);
        if (found) return found;
      }
    }
  } catch {
    return null;
  }
  return null;
}

const candidates = [
  join(ROOT, "pages-dist"),
  join(ROOT, "dist/client"),
  join(ROOT, "dist"),
  join(ROOT, ".output/public"),
];

const src =
  candidates.find((dir) => existsSync(join(dir, "index.html"))) ||
  candidates.map(findIndexDir).find(Boolean);

if (!src) {
  console.error("finish-capacitor: no index.html or _shell.html in", candidates.join(", "));
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(src, OUT, { recursive: true });

if (!existsSync(join(OUT, "index.html")) && existsSync(join(OUT, "_shell.html"))) {
  copyFileSync(join(OUT, "_shell.html"), join(OUT, "index.html"));
}

if (existsSync(join(OUT, "index.html"))) {
  copyFileSync(join(OUT, "index.html"), join(OUT, "404.html"));
}

function rewriteTree(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      rewriteTree(full);
      continue;
    }
    if (!TEXT_EXT.has(extname(name))) continue;
    const before = readFileSync(full, "utf8");
    const after = before.split(PAGES_BASE).join("/");
    if (after !== before) writeFileSync(full, after);
  }
}

rewriteTree(OUT);

if (!existsSync(join(OUT, "index.html"))) {
  console.error("finish-capacitor: still no index.html in", OUT);
  process.exit(1);
}

console.log(`finish-capacitor: ${src} → ${OUT}`);
