#!/usr/bin/env node
/**
 * Windows-safe Capacitor web build.
 *
 * GitHub Pages already produces a working static SPA (with index.html).
 * Reuse that build, then finish-capacitor rewrites /xieyixie/ → /.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, ...extraEnv },
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} ${args.join(" ")} killed by ${signal}`));
        return;
      }
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
        return;
      }
      resolve();
    });
  });
}

await run("node", [join("scripts", "with-app-env.mjs"), "vite", "build"], {
  DEPLOY_TARGET: "github-pages",
});
await run("node", [join("scripts", "finish-pages.mjs")]);
await run("node", [join("scripts", "finish-capacitor.mjs")]);
