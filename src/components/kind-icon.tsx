import {
  Coffee,
  Cookie,
  Footprints,
  Hand,
  PersonStanding,
  Sun,
  Trees,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { ActivityKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAP: Record<ActivityKind, LucideIcon> = {
  sun: Sun,
  snack: Cookie,
  view: Trees,
  stretch: PersonStanding,
  breath: Wind,
  walk: Footprints,
  tea: Coffee,
  hands: Hand,
};

export function KindIcon({
  kind,
  className,
}: {
  kind: ActivityKind;
  className?: string;
}) {
  const Icon = MAP[kind];
  return <Icon className={cn("size-4", className)} strokeWidth={2} />;
}
