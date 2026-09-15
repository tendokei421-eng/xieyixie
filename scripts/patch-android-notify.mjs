#!/usr/bin/env node
/** Permissions, exact alarms, rest-done sound, launcher icon, native alarm. */
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
import { dirname, join } from "node:path";

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
  "android.permission.RECEIVE_BOOT_COMPLETED",
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

const receiverBlock = `        <receiver android:name=".RestEndReceiver" android:exported="false">
            <intent-filter>
                <action android:name="com.tendokei.xieyixie.REST_END" />
            </intent-filter>
        </receiver>`;

if (!xml.includes("RestEndReceiver")) {
  xml = xml.replace("</application>", `${receiverBlock}\n    </application>`);
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
const javaDir = dirname(main);
const javaPath = join(javaDir, "MainActivity.java");

writeFileSync(
  join(javaDir, "RestAlarm.java"),
  `package ${pkg};

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public final class RestAlarm {
  public static final int REQ = 42101;
  public static final String ACTION = "com.tendokei.xieyixie.REST_END";

  private RestAlarm() {}

  public static void schedule(Context ctx, long at, String title, String body) {
    AlarmManager am = ctx.getSystemService(AlarmManager.class);
    if (am == null) return;
    PendingIntent pi = pending(ctx, title, body);
    if (Build.VERSION.SDK_INT >= 31 && !am.canScheduleExactAlarms()) {
      am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
      return;
    }
    if (Build.VERSION.SDK_INT >= 23) {
      am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
    } else {
      am.setExact(AlarmManager.RTC_WAKEUP, at, pi);
    }
  }

  public static void cancel(Context ctx) {
    AlarmManager am = ctx.getSystemService(AlarmManager.class);
    if (am == null) return;
    am.cancel(pending(ctx, "歇一歇", "这段休息结束了"));
  }

  private static PendingIntent pending(Context ctx, String title, String body) {
    Intent i = new Intent(ctx, RestEndReceiver.class);
    i.setAction(ACTION);
    i.putExtra("title", title);
    i.putExtra("body", body);
    int flags = PendingIntent.FLAG_UPDATE_CURRENT;
    if (Build.VERSION.SDK_INT >= 23) flags |= PendingIntent.FLAG_IMMUTABLE;
    return PendingIntent.getBroadcast(ctx, REQ, i, flags);
  }
}
`,
);

writeFileSync(
  join(javaDir, "RestEndReceiver.java"),
  `package ${pkg};

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class RestEndReceiver extends BroadcastReceiver {
  private static final String CHANNEL = "rest-end-v3";
  private static final long[] VIBRATE = {500, 140, 500, 140, 500, 140, 500, 140, 500, 140, 800};

  @Override
  public void onReceive(Context context, Intent intent) {
    String title = intent.getStringExtra("title");
    String body = intent.getStringExtra("body");
    if (title == null || title.isEmpty()) title = "歇一歇";
    if (body == null || body.isEmpty()) body = "这段休息结束了";
    ensureChannel(context);
    Intent open = new Intent(context, MainActivity.class);
    open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
    int flags = PendingIntent.FLAG_UPDATE_CURRENT;
    if (Build.VERSION.SDK_INT >= 23) flags |= PendingIntent.FLAG_IMMUTABLE;
    PendingIntent content = PendingIntent.getActivity(context, 42102, open, flags);
    NotificationCompat.Builder builder =
        new NotificationCompat.Builder(context, CHANNEL)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setAutoCancel(true)
            .setContentIntent(content)
            .setVibrate(VIBRATE)
            .setSound(Uri.parse("android.resource://" + context.getPackageName() + "/raw/rest_done"));
    try {
      NotificationManagerCompat.from(context).notify(42101, builder.build());
    } catch (SecurityException ignored) {
    }
    vibrate(context);
    playChime(context);
  }

  private void ensureChannel(Context context) {
    if (Build.VERSION.SDK_INT < 26) return;
    NotificationManager manager = context.getSystemService(NotificationManager.class);
    if (manager == null) return;
    NotificationChannel channel =
        new NotificationChannel(CHANNEL, "休息结束", NotificationManager.IMPORTANCE_HIGH);
    channel.setDescription("休息计时结束提醒");
    channel.enableVibration(true);
    channel.setVibrationPattern(VIBRATE);
    channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
    Uri sound = Uri.parse("android.resource://" + context.getPackageName() + "/raw/rest_done");
    AudioAttributes attrs =
        new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_ALARM)
            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
            .build();
    channel.setSound(sound, attrs);
    manager.createNotificationChannel(channel);
  }

  private void vibrate(Context context) {
    try {
      Vibrator vibrator;
      if (Build.VERSION.SDK_INT >= 31) {
        VibratorManager vm = context.getSystemService(VibratorManager.class);
        vibrator = vm == null ? null : vm.getDefaultVibrator();
      } else {
        vibrator = context.getSystemService(Vibrator.class);
      }
      if (vibrator == null) return;
      if (Build.VERSION.SDK_INT >= 26) {
        vibrator.vibrate(VibrationEffect.createWaveform(VIBRATE, -1));
      } else {
        vibrator.vibrate(VIBRATE, -1);
      }
    } catch (Exception ignored) {
    }
  }

  private void playChime(Context context) {
    try {
      MediaPlayer player = MediaPlayer.create(context, R.raw.rest_done);
      if (player == null) return;
      player.setOnCompletionListener(MediaPlayer::release);
      player.start();
    } catch (Exception ignored) {
    }
  }
}
`,
);

writeFileSync(
  join(javaDir, "RestAlarmPlugin.java"),
  `package ${pkg};

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "RestAlarm")
public class RestAlarmPlugin extends Plugin {
  @PluginMethod
  public void schedule(PluginCall call) {
    Long at = call.getLong("at");
    if (at == null) {
      call.reject("at required");
      return;
    }
    String title = call.getString("title", "歇一歇");
    String body = call.getString("body", "这段休息结束了");
    RestAlarm.schedule(getContext(), at, title, body);
    call.resolve();
  }

  @PluginMethod
  public void cancel(PluginCall call) {
    RestAlarm.cancel(getContext());
    call.resolve();
  }
}
`,
);

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
    registerPlugin(RestAlarmPlugin.class);
    super.onCreate(savedInstanceState);
    createRestChannel();
    requestPostNotifications();
  }

  private void createRestChannel() {
    if (Build.VERSION.SDK_INT < 26) return;
    NotificationManager manager = getSystemService(NotificationManager.class);
    if (manager == null) return;
    NotificationChannel channel =
        new NotificationChannel("rest-end-v3", "休息结束", NotificationManager.IMPORTANCE_HIGH);
    channel.setDescription("休息计时结束提醒");
    channel.enableVibration(true);
    channel.setVibrationPattern(new long[] {500, 140, 500, 140, 500, 140, 500, 140, 500, 140, 800});
    channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
    Uri sound = Uri.parse("android.resource://" + getPackageName() + "/raw/rest_done");
    AudioAttributes attrs =
        new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_ALARM)
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

console.log(`patch-android-notify: MainActivity + RestAlarm → ${javaPath}`);
