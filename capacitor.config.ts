import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.tendokei.xieyixie",
  appName: "歇一歇",
  webDir: "capacitor-www",
  server: {
    androidScheme: "https",
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4b9ed1",
      sound: "rest_done",
    },
  },
};

export default config;
