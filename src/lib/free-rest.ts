import { activityById } from "./recommendations";
import type { RestActivity } from "./types";

export const FREE_REST_ID = "free-rest";

export const FREE_REST: RestActivity = {
  id: FREE_REST_ID,
  title: "自由休息",
  detail: "按你定的时间歇一会儿。到点会震动、响铃，熄屏也会提醒。",
  durationMin: 10,
  kind: "breath",
  best: ["morning", "noon", "afternoon", "evening"],
  minGapMin: 0,
};

export function restActivityById(id: string) {
  if (id === FREE_REST_ID) return FREE_REST;
  return activityById(id);
}
