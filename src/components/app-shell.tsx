import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventEditor } from "@/components/event-editor";
import { RestSession } from "@/components/rest-session";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <div className="mx-auto flex min-h-svh max-w-lg flex-col">
        <main className="flex-1 px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))]">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-6 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          <div className="mx-auto flex max-w-md items-center justify-around">
            <NavLink to="/" icon={Leaf} label="歇一歇" />
            <NavLink to="/today" icon={CalendarDays} label="今天" />
          </div>
        </nav>
      </div>
      <EventEditor />
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
        "inline-flex min-w-20 flex-col items-center gap-0.5 rounded-md px-3 py-1 text-xs font-medium transition-colors duration-150",
        active ? "text-primary" : "text-muted hover:text-fg",
      )}
    >
      <Icon className={cn("size-5", active && "text-primary")} />
      {label}
    </Link>
  );
}
