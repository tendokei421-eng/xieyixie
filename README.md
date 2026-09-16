# 歇一歇

工作中记得歇一歇。在手机上安排每天的日程，空闲时晒晒太阳、看看窗外、慢慢呼吸。

## 能做什么

**歇一歇**：看今天的松弛度，小人表情会跟着变；按当前节奏推荐一小段休息
**今天**：按日期添加、编辑、复制、删除日程（题目、起止时间、详细内容）
有安排时才会标出可歇的空隙
休息开始后全屏倒计时，结束后记入今天已歇的次数

## 技术栈

React 19、TanStack Start、Tailwind CSS v4、Zustand。

## 目录

```text
src/routes/          页面（歇一歇、今天）
src/components/      小人、日程表、休息倒计时、底部导航
src/lib/             日程、空隙、休息建议、松弛度
public/buddy/        五种表情的透明 PNG
.github/workflows/   自动发布到 GitHub Pages、打包安卓 APK
docs/ANDROID.md      把网页打成可安装的安卓 App
capacitor.config.ts  安卓包名与网页目录
```
