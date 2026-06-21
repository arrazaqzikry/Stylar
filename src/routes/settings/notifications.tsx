import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/notifications")({
  head: () => ({ meta: [{ title: "Stylar" }] }),
  component: NotificationsPage,
});

type NotifItem = { id: string; label: string; desc: string; enabled: boolean };

const INITIAL_NOTIFS: NotifItem[] = [
  { id: "orders", label: "Order Updates", desc: "Shipping, delivery, and return status", enabled: true },
  { id: "drops", label: "New Style Drops", desc: "Exclusive launches and new collections", enabled: true },
  { id: "ai", label: "AI Recommendations", desc: "Personalised looks from Stylar AI", enabled: true },
  { id: "promos", label: "Promotional Offers", desc: "Discounts, flash sales, vouchers", enabled: false },
  { id: "price", label: "Price Drops", desc: "Alerts when saved items go on sale", enabled: true },
  { id: "community", label: "Community Activity", desc: "Likes, follows and mentions", enabled: false },
  { id: "newsletter", label: "Weekly Newsletter", desc: "Curated editorial every Sunday", enabled: true },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="relative h-6 w-11 rounded-full transition-colors flex-shrink-0"
      style={{ backgroundColor: enabled ? "var(--gold)" : "var(--border)" }}
      aria-label={enabled ? "Disable" : "Enable"}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform"
        style={{ transform: enabled ? "translateX(20px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function NotificationsPage() {
  const [notifs, setNotifs] = useState<NotifItem[]>(INITIAL_NOTIFS);

  function toggle(id: string) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, enabled: !n.enabled } : n));
  }

  const enabledCount = notifs.filter((n) => n.enabled).length;

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg flex-1">Notifications</h1>
        <span className="eyebrow text-[9px] text-muted-foreground">{enabledCount}/{notifs.length} on</span>
      </div>

      <div className="px-5 pt-4">
        <div className="flex items-center justify-between py-3 border-b border-border mb-2">
          <div>
            <p className="text-sm text-foreground font-medium">All Notifications</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Toggle all on or off</p>
          </div>
          <button
            type="button"
            onClick={() => setNotifs((prev) => {
              const allOn = prev.every((n) => n.enabled);
              return prev.map((n) => ({ ...n, enabled: !allOn }));
            })}
            className="eyebrow text-[9px] text-gold hover:opacity-70 transition-opacity"
          >
            {notifs.every((n) => n.enabled) ? "Turn all off" : "Turn all on"}
          </button>
        </div>

        <div className="divide-y divide-border/60">
          {notifs.map((n) => (
            <div key={n.id} className="flex items-center justify-between py-4">
              <div className="flex-1 mr-4">
                <p className="text-sm text-foreground">{n.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              <Toggle enabled={n.enabled} onChange={() => toggle(n.id)} />
            </div>
          ))}
        </div>

        <div className="mt-6 border border-border p-4">
          <p className="eyebrow text-[9px] mb-2">Push Notifications</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Manage push notifications in your device's system settings to control how STYLAR alerts appear on your lock screen.
          </p>
        </div>
      </div>
    </div>
  );
}
