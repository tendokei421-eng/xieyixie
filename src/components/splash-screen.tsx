import { cn } from "@/lib/utils";

function stageLabel(progress: number) {
  if (progress < 28) return "唤醒中";
  if (progress < 55) return "读取今天的日程";
  if (progress < 86) return "准备休息建议";
  if (progress < 100) return "马上就好";
  return "可以歇了";
}

export function SplashScreen({
  progress,
  leaving,
}: {
  progress: number;
  leaving: boolean;
}) {
  const pct = Math.max(0, Math.min(100, progress));

  return (
    <div
      className={cn("splash-overlay", leaving && "is-leaving")}
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
    >
      <div className="flex flex-col items-center px-6">
        <img
          src="/buddy/rest.png"
          alt=""
          className="buddy-float h-40 w-auto object-contain"
        />
        <p className="mt-2 font-display text-2xl font-semibold tracking-tight">歇一歇</p>
        <p className="mt-1 text-sm text-muted">{stageLabel(pct)}</p>

        <div className="mt-6 w-44">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-label="软件加载进度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
          >
            <div
              className="splash-fill h-full rounded-full bg-primary"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </div>
          <p className="mt-2 text-center text-xs tabular-nums text-subtle">
            {Math.round(pct)}%
          </p>
        </div>
      </div>
    </div>
  );
}
