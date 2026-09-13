import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { HydrateStore } from "@/components/hydrate-store";
import { AppShell } from "@/components/app-shell";
import appCss from "../styles.css?url";

const APP_NAME = "歇一歇";
const BASE = import.meta.env.BASE_URL || "/";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
      },
      { title: APP_NAME },
      { name: "theme-color", content: "#4b9ed1" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "description",
        content: "工作中，记得歇一歇。安排日程，在空闲里晒太阳、看风景、慢慢呼吸。",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: `${BASE}favicon.png` },
      { rel: "icon", type: "image/png", sizes: "192x192", href: `${BASE}icon-192.png` },
      { rel: "icon", type: "image/svg+xml", href: `${BASE}favicon.svg` },
      { rel: "apple-touch-icon", sizes: "180x180", href: `${BASE}apple-touch-icon.png` },
      { rel: "apple-touch-icon-precomposed", href: `${BASE}apple-touch-icon-precomposed.png` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: `${BASE}__grok/manifest.webmanifest` },
      { rel: "apple-touch-icon", href: `${BASE}__grok/icon-180.png` },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <HydrateStore>
            <AppShell>
              <Outlet />
            </AppShell>
          </HydrateStore>
          <Toaster
            position="top-center"
            offset="calc(env(safe-area-inset-top, 0px) + 12px)"
            toastOptions={{
              className: "font-sans !bg-surface !text-fg !border-border",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
