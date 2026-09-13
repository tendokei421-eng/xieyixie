# 歇一歇

工作中记得歇一歇。在手机上安排每天的日程，空闲时晒晒太阳、看看窗外、慢慢呼吸。

这是一款**面向手机的 Web 应用**（PWA）：一屏高度、底部导航、大按钮，可添加到主屏幕当 App 用。日程保存在本机浏览器，不需要登录。

- 源码：https://github.com/tendokei421-eng/xieyixie
- 独立使用（开启 Pages 后）：https://tendokei421-eng.github.io/xieyixie/

## 能做什么

- **歇一歇**：看今天的松弛度，小人表情会跟着变；按当前节奏推荐一小段休息
- **今天**：按日期添加、编辑、复制、删除日程（题目、起止时间、详细内容）
- 有安排时才会标出可歇的空隙
- 休息开始后全屏倒计时，结束后记入今天已歇的次数

## 在手机上独立使用

GitHub 会把软件发布成一个网页。第一次需要你在仓库里打开 Pages：

1. 打开 [Pages 设置](https://github.com/tendokei421-eng/xieyixie/settings/pages)
2. **Build and deployment → Source** 选 **GitHub Actions**
3. 打开 [Actions](https://github.com/tendokei421-eng/xieyixie/actions) → **发布歇一歇** → 重新运行最近一次

完成后用手机浏览器打开：

**https://tendokei421-eng.github.io/xieyixie/**

然后：

- **iPhone / iPad**（Safari）：分享 → 添加到主屏幕
- **Android**（Chrome）：菜单 ⋮ → 安装应用 / 添加到主屏幕

加到主屏幕后，会以独立窗口打开，没有浏览器地址栏。日程只存在这台手机上。

以后每次把代码推到 `main`，GitHub 会自动重新发布。

这不是应用商店里的安装包（不走 App Store / 应用宝）。用 GitHub 能做到的「独立 App」，就是加到主屏幕的这种。



## 技术栈

React 19、TanStack Start、Tailwind CSS v4、Zustand。

## 目录

```text
src/routes/          页面（歇一歇、今天）
src/components/      小人、日程表、休息倒计时、底部导航
src/lib/             日程、空隙、休息建议、松弛度
public/buddy/        五种表情的透明 PNG
.github/workflows/   自动发布到 GitHub Pages
```
