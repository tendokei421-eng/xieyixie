# 歇一歇

工作中记得歇一歇。在手机上安排每天的日程，空闲时晒晒太阳、看看窗外、慢慢呼吸。

这是一款**面向手机的 Web 应用**（PWA）：一屏高度、底部导航、大按钮，可添加到主屏幕当 App 用。日程保存在本机浏览器，不需要登录。

仓库：https://github.com/tendokei421-eng/xieyixie

## 能做什么

- **歇一歇**：看今天的松弛度，小人表情会跟着变；按当前节奏推荐一小段休息
- **今天**：按日期添加、编辑、复制、删除日程（题目、起止时间、详细内容）
- 有安排时才会标出可歇的空隙
- 休息开始后全屏倒计时，结束后记入今天已歇的次数

## 在手机上用

用手机浏览器打开后：

- **iPhone**：分享 → 添加到主屏幕
- **Android**：菜单 → 安装应用 / 添加到主屏幕

加到主屏幕后，会以独立窗口打开，底栏和安全区按手机来排。

## 获取代码

```bash
git clone https://github.com/tendokei421-eng/xieyixie.git
cd xieyixie
```

需要 [Node.js](https://nodejs.org/) 22 或以上。

```bash
npm install
npm run dev
```

浏览器打开终端里提示的地址即可。生产构建：

```bash
npm run build
npm run preview
```

## 技术栈

React 19、TanStack Start、Tailwind CSS v4、Zustand。

## 目录

```text
src/routes/          页面（歇一歇、今天）
src/components/      小人、日程表、休息倒计时、底部导航
src/lib/             日程、空隙、休息建议、松弛度
public/buddy/        五种表情的透明 PNG
```
