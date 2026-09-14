#!/usr/bin/env node
/** Insert notification permissions and request them from MainActivity. */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manifest = join(root, "android", "app", "src", "main", "AndroidManifest.xml");
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
console.log(`patch-android-notify: added ${added} permission(s)`);

function findMainActivity(dir) {
  if (!existsSync(dir)) return null;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const next = join(dir, name.name);
    if (name.isDirectory()) {
      const hit = findMainActivity(next);
      if (hit) return hit;
    } else if (name.name === "MainActivity.java" || name.name === "MainActivity.kt") {
      return next;
    }
  }
  return null;
}

const javaRoot = join(root, "android", "app", "src", "main", "java");
const main = findMainActivity(javaRoot);
if (!main) {
  console.warn("patch-android-notify: MainActivity not found");
  process.exit(0);
}

const pkgMatch = readFileSync(main, "utf8").match(/package\s+([\w.]+)\s*;/);
const pkg = pkgMatch?.[1] ?? "com.tendokei.xieyixie";

writeFileSync(
  main.replace(/MainActivity\.kt$/, "MainActivity.java"),
  `package ${pkg};

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    requestPostNotifications();
  }

  private void requestPostNotifications() {
    if (Build.VERSION.SDK_INT < 33) return;
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
        == PackageManager.PERMISSION_GRANTED) {
      return;
    }
    ActivityCompat.requestPermissions(
        this, new String[] {Manifest.permission.POST_NOTIFICATIONS}, 42101);
  }
}
`,
);

if (main.endsWith(".kt")) {
  try {
    const { unlinkSync } = await import("node:fs");
    unlinkSync(main);
  } catch {
    /* keep both if delete fails */
  }
}

console.log(`patch-android-notify: MainActivity requests POST_NOTIFICATIONS → ${main}`);
