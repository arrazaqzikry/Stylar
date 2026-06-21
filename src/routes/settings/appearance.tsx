import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/appearance")({
  head: () => ({ meta: [{ title: "Stylar" }] }),
  component: AppearancePage,
});

function AppearancePage() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [density, setDensity] = useState<"compact" | "regular" | "spacious">("regular");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Appearance</h1>
      </div>

      <div className="px-5 pt-5 space-y-8">
        {/* Theme */}
        <div>
          <p className="eyebrow mb-3">Theme</p>
          <div className="grid grid-cols-3 gap-2">
            {(["dark", "light", "system"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className="border p-4 flex flex-col items-center gap-2 transition-all"
                style={{
                  borderColor: theme === t ? "var(--gold)" : "var(--border)",
                  backgroundColor: theme === t ? "var(--gold)10" : "transparent",
                }}
              >
                <span className="text-xl">
                  {t === "dark" ? "🌑" : t === "light" ? "☀️" : "⚙️"}
                </span>
                <span
                  className="eyebrow text-[8px] capitalize"
                  style={{ color: theme === t ? "var(--gold)" : "var(--muted-foreground)" }}
                >
                  {t}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            STYLAR's signature dark mode is always active by default for the best visual experience.
          </p>
        </div>

        {/* Text size */}
        <div>
          <p className="eyebrow mb-3">Text Size</p>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFontSize(f)}
                className="flex-1 border py-3 transition-all"
                style={{
                  borderColor: fontSize === f ? "var(--gold)" : "var(--border)",
                  color: fontSize === f ? "var(--gold)" : "var(--muted-foreground)",
                }}
              >
                <span
                  className="font-sans font-medium block text-center"
                  style={{ fontSize: f === "small" ? "10px" : f === "medium" ? "13px" : "16px" }}
                >
                  Aa
                </span>
                <span className="eyebrow text-[8px] block text-center mt-1 capitalize">{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display density */}
        <div>
          <p className="eyebrow mb-3">Display Density</p>
          <div className="space-y-2">
            {(["compact", "regular", "spacious"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDensity(d)}
                className="w-full flex items-center justify-between border p-3.5 transition-all text-left"
                style={{
                  borderColor: density === d ? "var(--gold)" : "var(--border)",
                  backgroundColor: density === d ? "var(--gold)08" : "transparent",
                }}
              >
                <div>
                  <p className="text-sm capitalize" style={{ color: density === d ? "var(--gold)" : "var(--foreground)" }}>
                    {d}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {d === "compact" ? "More content, less spacing" : d === "regular" ? "Balanced layout" : "Airy, relaxed layout"}
                  </p>
                </div>
                <div
                  className="h-4 w-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: density === d ? "var(--gold)" : "var(--border)" }}
                >
                  {density === d && <span className="h-2 w-2 rounded-full bg-gold block" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors"
        >
          Save Appearance
        </button>
      </div>
    </div>
  );
}
