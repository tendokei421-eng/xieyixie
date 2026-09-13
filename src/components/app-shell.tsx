import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { useLockBody, useVisualViewport } from "@/hooks/use-mobile";
import { EventEditor } from "@/components/event-editor";
import { ReminderPopup } from "@/components/reminder-popup";
import { RestSession } from "@/components/rest-session";

export function AppShell({ children }: { children: ReactNode }) {
  const overlayOpen = useAppStore((s) => s.editor.open || !!s.activeRest);
  const { keyboardOpen } = useVisualViewport();
  useLockBody(overlayOpen);

  return (
    <div className="app-frame">
      <div className="app-col">
        <main className="app-main">{children}</main>
        <nav
          className={cn("app-tabbar", keyboardOpen && "hidden")}
          aria-label="主导航"
        >
          <div className="flex items-stretch justify-around px-2 pt-1">
            <NavLink to="/" icon={Leaf} label="歇一歇" />
            <NavLink to="/today" icon={CalendarDays} label="今天" />
          </div>
        </nav>
      </div>
      <EventEditor />
      <ReminderPopup />
      <RestSession />
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  label,
}: {
  to: "/" | "/today";
  icon: typeof Leaf;
  label: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150",
        active ? "bg-primary-soft text-primary" : "text-muted hover:text-fg",
      )}
    >
      <Icon className="size-6" />
      {label}
    </Link>
  );
}
