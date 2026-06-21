import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/language")({
  head: () => ({ meta: [{ title: "Language — STYLAR" }] }),
  component: LanguagePage,
});

const LANGUAGES = [
  { code: "en-US", label: "English", region: "United States" },
  { code: "en-GB", label: "English", region: "United Kingdom" },
  { code: "fr-FR", label: "Français", region: "France" },
  { code: "es-ES", label: "Español", region: "España" },
  { code: "de-DE", label: "Deutsch", region: "Deutschland" },
  { code: "it-IT", label: "Italiano", region: "Italia" },
  { code: "ja-JP", label: "日本語", region: "Japan" },
  { code: "zh-CN", label: "中文", region: "Mainland China" },
  { code: "ko-KR", label: "한국어", region: "South Korea" },
  { code: "ar-SA", label: "العربية", region: "Saudi Arabia" },
];

function LanguagePage() {
  const [selected, setSelected] = useState("en-US");

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Language</h1>
      </div>

      <div className="px-5 pt-4">
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Select the language you'd like to use in STYLAR. This setting applies to the app interface only.
        </p>

        <div className="divide-y divide-border/60">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <div>
                <p
                  className="text-sm transition-colors"
                  style={{ color: selected === lang.code ? "var(--gold)" : "var(--foreground)" }}
                >
                  {lang.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{lang.region}</p>
              </div>
              <div
                className="h-4 w-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: selected === lang.code ? "var(--gold)" : "var(--border)" }}
              >
                {selected === lang.code && (
                  <span className="h-2 w-2 rounded-full bg-gold block" />
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground mt-6 hover:bg-gold hover:border-gold hover:text-background transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
