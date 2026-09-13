export type CalendarEvent = {
  id: string;
  date: string;
  start: string;
  end: string;
  title: string;
  detail: string;
};

export type RestLog = {
  id: string;
  date: string;
  activityId: string;
  startedAt: string;
  durationMin: number;
  completed: boolean;
};

export type ActiveRest = {
  activityId: string;
  startedAt: string;
  durationMin: number;
};

export type Mood = "tired" | "calm" | "spark" | "rest" | "happy";

export type TimeOfDay = "morning" | "noon" | "afternoon" | "evening";

export type ActivityKind =
  | "sun"
  | "snack"
  | "view"
  | "stretch"
  | "breath"
  | "walk"
  | "tea"
  | "hands";

export type RestActivity = {
  id: string;
  title: string;
  detail: string;
  durationMin: number;
  kind: ActivityKind;
  best: TimeOfDay[];
  minGapMin: number;
};

export type Gap = {
  start: string;
  end: string;
  minutes: number;
};
