# 把「歇一歇」打成安卓 App

网页版仍然用 GitHub Pages。下面把同一份界面打进可以下载安装的 `.apk`。

- 应用名：歇一歇
- 包名：`com.tendokei.xieyixie`（装过之后不要改，改了就是另一个应用）
- 网页输出目录：`capacitor-www/`（路径是 `/`，不是网页版的 `/xieyixie/`）

日程存在 App 自己的存储里，和手机浏览器 / 「添加到主屏幕」里的数据不是同一份。

---

## 方式一：在 GitHub 上点一下，下载调试版 APK

不需要本机安装 Android Studio。打出来的是 **debug 包**，可以自己装，不适合长期对外分发。

1. 把最新代码推到 `main`。
2. 打开 [Actions](https://github.com/tendokei421-eng/xieyixie/actions)。
3. 左侧选 **打包安卓 APK** → **Run workflow** → 选 `main` → Run。
4. 等任务变绿，打开那一次运行，下载产物 **xieyixie-debug**。
5. 解压得到 `.apk`，传到安卓手机打开安装。
6. 若提示未知来源，允许该文件管理器或浏览器安装。

微信里直接发 APK 可能被拦截，用网盘或数据线更稳。

---

## 方式二：本机打正式包（推荐自己长期用）

### 1. 安装环境

- [Node.js 22](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Android Studio](https://developer.android.com/studio)（会附带 Java，不必另装 JDK）

打开 Android Studio → **Tools → SDK Manager**：

- SDK Platforms：勾选 Android 15 (API 35) 或更新
- SDK Tools：Android SDK Build-Tools、Android SDK Platform-Tools

### 2. 拉代码并构建网页

```bash
git clone https://github.com/tendokei421-eng/xieyixie.git
cd xieyixie
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android
npm run build:capacitor
```

成功后应出现 `capacitor-www/index.html`。用编辑器打开它，资源路径应是 `/assets/...`，不能是 `/xieyixie/assets/...`。

### 3. 生成安卓工程

第一次：

```bash
npx cap add android
npx cap sync
```

以后每次改了界面或 `capacitor.config.ts`：

```bash
npm run build:capacitor
npx cap sync
```

### 4. 在手机或模拟器上运行

```bash
npx cap open android
```

真机：打开开发者选项和 USB 调试，用数据线连上，Android Studio 顶部选中手机，点绿色 Run。

模拟器：Device Manager 里建一台 API 24 及以上的虚拟机，再点 Run。

### 5. 打可发给别人的签名包

1. Android Studio：**Build → Generate Signed App Bundle or APK**
2. 选 **APK**
3. 第一次创建密钥库（`.jks`），密码和别名自己记下来，文件备份好
4. 选 **release**
5. 完成后一般在 `android/app/release/app-release.apk`

密钥库丢了，以后的包无法覆盖安装，用户必须卸载重装，App 里的日程会清空。

---

## 改成「打开网上的网页」而不是打进包里

适合已经发布了 Pages、只想先验证能不能装。

打开 `capacitor.config.ts`，取消这一行的注释：

```ts
url: "https://tendokei421-eng.github.io/xieyixie/",
```

然后：

```bash
npx cap sync
```

重新 Run 或重打 APK。之后只要网页发布成功，App 重开就是新版；没有网络时打不开。

---

## 常见问题

**白屏**  
多半是误用了 `npm run build:pages`。必须用 `npm run build:capacitor`。

**`webDir` 不存在**  
先跑 `npm run build:capacitor`，再 `npx cap add android` / `npx cap sync`。

**和已安装应用签名冲突**  
卸载旧包再装。debug 包和 release 包签名不同，不能互相覆盖。

**iPhone**  
这套流程只出安卓包。iPhone 继续用 Safari「添加到主屏幕」。
