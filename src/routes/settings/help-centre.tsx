import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/help-centre")({
  head: () => ({ meta: [{ title: "Help Centre — STYLAR" }] }),
  component: HelpCentrePage,
});

const FAQS = [
  {
    category: "Orders",
    items: [
      { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking email. You can also view your order status in Profile → Cart." },
      { q: "Can I change or cancel my order?", a: "Orders can be cancelled within 1 hour of placing. After that, please contact our support team." },
      { q: "What is the return policy?", a: "We offer free returns within 30 days of delivery for unworn items with original tags attached." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Apple Pay, and PayPal." },
      { q: "Is my payment information secure?", a: "Yes — all payments are processed through encrypted, PCI-compliant gateways. We never store card details." },
    ],
  },
  {
    category: "Stylar AI",
    items: [
      { q: "How does Stylar AI work?", a: "Stylar AI analyses your style preferences, body measurements, and occasion requirements to curate personalised outfit recommendations." },
      { q: "Can I improve my recommendations?", a: "Yes — the more you like, save and interact with outfits, the better Stylar AI learns your taste." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "How do I change my password?", a: "Go to Profile → Edit Profile → Security. You'll be prompted to verify your email before setting a new password." },
      { q: "How do I delete my account?", a: "Contact us at support@stylar.ai. Account deletion is permanent and processed within 7 business days." },
    ],
  },
];

function HelpCentrePage() {
  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Help Centre</h1>
      </div>

      <div className="px-5 pt-4">
        {/* Search */}
        <div className="relative mb-5">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for help…"
            className="w-full border border-border bg-secondary pl-9 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Quick links */}
        {!search && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { icon: "📦", label: "Track Order" },
              { icon: "↩️", label: "Returns" },
              { icon: "💳", label: "Payments" },
              { icon: "🤖", label: "Stylar AI" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSearch(item.label)}
                className="border border-border py-4 flex flex-col items-center gap-1.5 hover:border-gold hover:text-gold transition-colors group"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="eyebrow text-[8px] group-hover:text-gold">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* FAQ accordion */}
        {filtered.map((cat) => (
          <div key={cat.category} className="mb-4">
            <p className="eyebrow text-[9px] mb-2 pt-2 border-t border-border">{cat.category}</p>
            <div className="space-y-1">
              {cat.items.map((item) => {
                const key = `${cat.category}-${item.q}`;
                const open = openItem === key;
                return (
                  <div key={key} className="border border-border">
                    <button
                      type="button"
                      onClick={() => setOpenItem(open ? null : key)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                    >
                      <span className="text-sm text-foreground pr-4">{item.q}</span>
                      <span className="text-muted-foreground flex-shrink-0 transition-transform" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
                    </button>
                    {open && (
                      <div className="px-4 pb-4 border-t border-border/60">
                        <p className="text-xs text-muted-foreground leading-relaxed pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">No results for "{search}"</p>
        )}

        {/* Still need help? */}
        <div className="border border-border p-4 mt-4 text-center">
          <p className="text-sm text-foreground mb-1">Still need help?</p>
          <p className="text-xs text-muted-foreground mb-3">Our team is available Mon–Fri, 9am–6pm EST</p>
          <Link
            to="/settings/contact-us"
            className="eyebrow text-[9px] text-gold hover:opacity-70 transition-opacity"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}
