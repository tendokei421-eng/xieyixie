#!/usr/bin/env node
/** Insert notification permissions into the generated AndroidManifest. */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const manifest = join(process.cwd(), "android", "app", "src", "main", "AndroidManifest.xml");
if (!existsSync(manifest)) {
  console.error("patch-android-notify: android/app/src/main/AndroidManifest.xml not found");
  process.exit(1);
}

let xml = readFileSync(manifest, "utf8");
const perms = [
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.SCHEDULE_EXACT_ALARM",
  "android.permission.VIBRATE",
];

let added = 0;
for (const perm of perms) {
  if (xml.includes(perm)) continue;
  if (!xml.includes("<application")) {
    console.error("patch-android-notify: no <application> tag");
    process.exit(1);
  }
  xml = xml.replace(
    "<application",
    `    <uses-permission android:name="${perm}" />\n    <application`,
  );
  added += 1;
}

writeFileSync(manifest, xml);
console.log(`patch-android-notify: added ${added} permission(s) → ${manifest}`);
