import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import stylarLogoUrl from "../assets/STYLAR-NOBG.jpg?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "STYLAR" },
      {
        name: "description",
        content:
          "STYLAR is a private AI atelier curating editorial-grade outfits tailored to your body, palette and life.",
      },
      { name: "author", content: "STYLAR" },
      { property: "og:title", content: "STYLAR" },
      {
        property: "og:description",
        content: "A private AI atelier curating editorial-grade outfits for the way you live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: stylarLogoUrl, type: "image/jpeg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const HIDE_NAV = ["/get-started", "/login", "/signup", "/onboarding"];

const NAV_TABS = [
  { to: "/saved" as const,    label: "For You",  key: "foryou"   },
  { to: "/generate" as const, label: "Generate", key: "generate" },
  { to: "/profile" as const,  label: "Profile",  key: "profile"  },
] as const;

function NavIcon({ tab, active }: { tab: string; active: boolean }) {
  const c = active ? "var(--gold)" : "var(--muted-foreground)";
  if (tab === "foryou") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? c : "none"} stroke={c} strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
  if (tab === "generate") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? c : "none"} stroke={c} strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
    </svg>
  );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={active ? c : "none"}/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (HIDE_NAV.some((p) => path.startsWith(p))) return null;

  return (
    <nav className="flex-shrink-0 flex items-center justify-around border-t bg-background/96 backdrop-blur-2xl" style={{ borderColor: "var(--border)", paddingBottom: "2px" }}>
      {NAV_TABS.map((tab) => {
        const active =
          tab.key === "foryou"
            ? path === "/saved" || path === "/"
            : tab.key === "profile"
            ? path === "/profile" || path.startsWith("/settings")
            : path === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className="flex flex-col items-center gap-0.5 px-7 py-2.5 transition-all active:scale-90"
          >
            <NavIcon tab={tab.key} active={active} />
            <span className="eyebrow text-[8px]" style={{ color: active ? "var(--gold)" : "var(--muted-foreground)" }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="phone-desktop">
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="phone-status-bar">
              <span className="phone-time">9:41</span>
              <div className="phone-dynamic-island" />
              <div className="phone-status-icons">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="5" width="3" height="6" rx="1" opacity="0.3" />
                  <rect x="4.5" y="3.5" width="3" height="7.5" rx="1" opacity="0.6" />
                  <rect x="9" y="2" width="3" height="9" rx="1" opacity="0.85" />
                  <rect x="13" y="0" width="3" height="11" rx="1" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="9.5" r="1.5" fill="currentColor" />
                  <path d="M4.5 7a4.2 4.2 0 0 1 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M1.5 4.5A9 9 0 0 1 13.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35" />
                  <rect x="22" y="3.5" width="2.5" height="5" rx="1.5" fill="currentColor" fillOpacity="0.4" />
                  <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="phone-content">
              <Outlet />
            </div>
            <BottomNav />
            <div className="phone-home-indicator" />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
