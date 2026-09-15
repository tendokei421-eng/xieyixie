#!/usr/bin/env node
/** Permissions, exact alarms, rest-done sound, launcher icon, native prompt. */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
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
  "android.permission.USE_EXACT_ALARM",
  "android.permission.VIBRATE",
  "android.permission.WAKE_LOCK",
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

const rawDir = join(root, "android", "app", "src", "main", "res", "raw");
mkdirSync(rawDir, { recursive: true });
const chimeSrc = join(root, "public", "sounds", "rest-done.mp3");
if (existsSync(chimeSrc)) {
  copyFileSync(chimeSrc, join(rawDir, "rest_done.mp3"));
  console.log("patch-android-notify: copied rest_done.mp3");
}

const iconSrc = [
  join(root, "branding", "launcher.png"),
  join(root, "public", "icon-512.png"),
  join(root, "public", "buddy", "happy.png"),
].find((p) => existsSync(p));

if (iconSrc) {
  const resDir = join(root, "android", "app", "src", "main", "res");
  const names = ["ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png"];
  let iconCopies = 0;
  for (const dirName of existsSync(resDir) ? readdirSync(resDir) : []) {
    if (!dirName.startsWith("mipmap")) continue;
    const dir = join(resDir, dirName);
    if (dirName === "mipmap-anydpi") {
      rmSync(dir, { recursive: true, force: true });
      continue;
    }
    if (dirName.includes("anydpi")) {
      for (const name of names) {
        const extra = join(dir, name);
        if (existsSync(extra)) unlinkSync(extra);
      }
      continue;
    }
    for (const name of names) {
      copyFileSync(iconSrc, join(dir, name));
      iconCopies += 1;
    }
  }
  const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@android:color/white"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  const v26 = join(resDir, "mipmap-anydpi-v26");
  mkdirSync(v26, { recursive: true });
  for (const name of names) {
    const extra = join(v26, name);
    if (existsSync(extra)) unlinkSync(extra);
  }
  writeFileSync(join(v26, "ic_launcher.xml"), adaptive);
  writeFileSync(join(v26, "ic_launcher_round.xml"), adaptive);
  console.log(`patch-android-notify: launcher icon from ${iconSrc} (${iconCopies} files)`);
}

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

const src = readFileSync(main, "utf8");
const pkgMatch = src.match(/package\s+([\w.]+)\s*;/) ?? src.match(/package\s+([\w.]+)/);
const pkg = pkgMatch?.[1] ?? "com.tendokei.xieyixie";
const javaPath = main.replace(/MainActivity\.kt$/, "MainActivity.java");

writeFileSync(
  javaPath,
  `package ${pkg};

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    createRestChannel();
    requestPostNotifications();
  }

  private void createRestChannel() {
    if (Build.VERSION.SDK_INT < 26) return;
    NotificationManager manager = getSystemService(NotificationManager.class);
    if (manager == null) return;
    NotificationChannel channel =
        new NotificationChannel("rest-end", "休息结束", NotificationManager.IMPORTANCE_HIGH);
    channel.setDescription("休息计时结束提醒");
    channel.enableVibration(true);
    channel.setVibrationPattern(new long[] {500, 140, 500, 140, 500, 140, 500, 140, 500, 140, 800});
    channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
    Uri sound = Uri.parse("android.resource://" + getPackageName() + "/raw/rest_done");
    AudioAttributes attrs =
        new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_NOTIFICATION)
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .build();
    channel.setSound(sound, attrs);
    manager.createNotificationChannel(channel);
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
    unlinkSync(main);
  } catch {
    /* keep both if delete fails */
  }
}

console.log(`patch-android-notify: MainActivity + rest-end channel → ${javaPath}`);
