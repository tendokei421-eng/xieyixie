import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Bundled-asset mode (default): the APK contains capacitor-www/.
 * First run `npm run build:capacitor`, then `npx cap add android` / `npx cap sync`.
 *
 * To wrap the live GitHub Pages site instead, uncomment `server.url`
 * and keep Pages published at that address.
 */
const config: CapacitorConfig = {
  appId: "com.tendokei.xieyixie",
  appName: "歇一歇",
  webDir: "capacitor-www",
  server: {
    androidScheme: "https",
    // url: "https://tendokei421-eng.github.io/xieyixie/",
  },
};

export default config;
