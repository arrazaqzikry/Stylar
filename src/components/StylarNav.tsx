import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import stylarLogo from "@/assets/STYLAR-NOBG.jpg";

type Notif = {
  id: string;
  read: boolean;
  icon: string;
  title: string;
  body: string;
  time: string;
};

const NOTIFICATIONS: Notif[] = [
  {
    id: "n1", read: false, icon: "📦",
    title: "Order Delivered",
    body: "Your order #ord-001 — Veja Leather Low Trainer + 2 items has been delivered to your address.",
    time: "Just now",
  },
  {
    id: "n2", read: false, icon: "✦",
    title: "New Drop: Toteme SS26",
    body: "The new summer linen collection just went live. Limited stock — shop before it sells out.",
    time: "2h ago",
  },
  {
    id: "n3", read: false, icon: "↺",
    title: "Back in Stock",
    body: "Veja Campo in Cloud White is back in your size. Add to cart before it's gone.",
    time: "4h ago",
  },
  {
    id: "n4", read: true, icon: "◈",
    title: "COS Summer Linen Edit",
    body: "12 new pieces from the COS summer collection are now available to browse.",
    time: "Yesterday",
  },
  {
    id: "n5", read: true, icon: "◆",
    title: "Flash Sale — 40% Off",
    body: "Selected basics from Uniqlo, COS, and Everlane. Offer ends midnight tonight.",
    time: "Yesterday",
  },
  {
    id: "n6", read: true, icon: "◉",
    title: "Weekly Style Digest",
    body: "Your personalised Stylar digest for this week is ready to view.",
    time: "2 days ago",
  },
  {
    id: "n7", read: true, icon: "🏷",
    title: "Price Drop Alert",
    body: "The Church's Oxford Brogue you saved dropped by RM 60. Now RM 330 — grab it while it lasts.",
    time: "2 days ago",
  },
  {
    id: "n8", read: true, icon: "✓",
    title: "Order Shipped",
    body: "Your order #ord-002 is on its way. Estimated delivery: Jun 23, 2026.",
    time: "3 days ago",
  },
  {
    id: "n9", read: true, icon: "◐",
    title: "Restock: Theory Linen Blazer",
    body: "The Theory Linen Blazer in your size is back. Only 3 left in stock.",
    time: "3 days ago",
  },
  {
    id: "n10", read: true, icon: "✦",
    title: "New Drop: Anine Bing",
    body: "Anine Bing's Resort 2026 edit has landed. Silk skirts, tailored separates, and more.",
    time: "4 days ago",
  },
  {
    id: "n11", read: true, icon: "◈",
    title: "Everlane Warehouse Sale",
    body: "Up to 50% off on selected Everlane styles. Sale ends Sunday.",
    time: "5 days ago",
  },
  {
    id: "n12", read: true, icon: "📦",
    title: "Order Confirmed",
    body: "Your order #ord-003 — Saint Laurent Blazer + 2 items has been confirmed and is being prepared.",
    time: "5 days ago",
  },
  {
    id: "n13", read: true, icon: "↺",
    title: "Saved Item Restocked",
    body: "Toteme Bias Scarf in Ecru is back. You saved this 2 weeks ago.",
    time: "6 days ago",
  },
  {
    id: "n14", read: true, icon: "◉",
    title: "New Stylar Feature",
    body: "You can now generate outfits for specific climates. Try the new Cold and Mild options in the Studio.",
    time: "1 week ago",
  },
];

const UNREAD_COUNT = NOTIFICATIONS.filter((n) => !n.read).length;

export function StylarNav() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [phoneScreen, setPhoneScreen] = useState<Element | null>(null);

  useEffect(() => {
    setPhoneScreen(document.querySelector(".phone-screen"));
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-4">
        <Link to="/saved" className="flex items-center gap-2">
          <img src={stylarLogo} alt="STYLAR" className="h-7 w-7 object-contain" />
          <span className="font-display text-xl tracking-[0.3em]">STYLAR</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
        </Link>

        {/* Bell */}
        <button
          type="button"
          onClick={() => setNotifOpen(true)}
          className="relative flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-gold transition-colors"
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unread > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-background eyebrow text-[7px] leading-none font-bold">
              {unread}
            </span>
          )}
        </button>
      </div>

      {/* Notifications panel */}
      {notifOpen && phoneScreen && createPortal(
        <div className="absolute inset-x-0 bottom-0 z-[9999] flex flex-col bg-background animate-fade-up" style={{ top: "52px" }}>
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 bg-background/95 backdrop-blur border-b border-border">
            <button
              type="button"
              onClick={() => setNotifOpen(false)}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors flex-shrink-0"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <h2 className="font-display text-lg flex-1">Notifications</h2>
            {unread > 0 && (
              <>
                <span className="eyebrow text-[8px] bg-gold text-background px-2 py-0.5 rounded-full flex-shrink-0">
                  {unread} new
                </span>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="eyebrow text-[9px] text-muted-foreground hover:text-gold transition-colors flex-shrink-0"
                >
                  Mark read
                </button>
              </>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Unread */}
            {notifications.some((n) => !n.read) && (
              <div>
                <p className="eyebrow text-[8px] text-gold/70 px-5 pt-4 pb-2">New</p>
                {notifications.filter((n) => !n.read).map((n) => (
                  <NotifRow key={n.id} notif={n} onPress={() =>
                    setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))
                  } />
                ))}
              </div>
            )}

            {/* Read */}
            {notifications.some((n) => n.read) && (
              <div>
                <p className="eyebrow text-[8px] text-muted-foreground/60 px-5 pt-4 pb-2">Earlier</p>
                {notifications.filter((n) => n.read).map((n) => (
                  <NotifRow key={n.id} notif={n} />
                ))}
              </div>
            )}
          </div>
        </div>,
        phoneScreen,
      )}
    </header>
  );
}

function NotifRow({ notif, onPress }: { notif: Notif; onPress?: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full flex items-start gap-3 px-5 py-3.5 border-b border-border/40 text-left transition-colors hover:bg-secondary/30"
      style={{ backgroundColor: !notif.read ? "var(--gold)06" : undefined }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 h-8 w-8 rounded-full border flex items-center justify-center text-sm mt-0.5"
        style={{
          borderColor: !notif.read ? "var(--gold)" : "var(--border)",
          color: !notif.read ? "var(--gold)" : "var(--muted-foreground)",
        }}
      >
        {notif.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className="text-sm leading-tight"
            style={{ color: !notif.read ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: !notif.read ? 500 : 400 }}
          >
            {notif.title}
          </p>
          <span className="eyebrow text-[7px] text-muted-foreground/60 flex-shrink-0">{notif.time}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
          {notif.body}
        </p>
      </div>

      {/* Unread dot */}
      {!notif.read && (
        <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gold mt-2" />
      )}
    </button>
  );
}
