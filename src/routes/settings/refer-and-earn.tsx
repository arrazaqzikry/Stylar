import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/refer-and-earn")({
  head: () => ({ meta: [{ title: "Refer & Earn — STYLAR" }] }),
  component: ReferAndEarnPage,
});

const REFERRAL_CODE = "DASHA20";
const STEPS = [
  { num: 1, title: "Share your code", desc: "Send your unique referral code to a friend." },
  { num: 2, title: "They join STYLAR", desc: "Your friend signs up using your code." },
  { num: 3, title: "Both earn rewards", desc: "You get $20 credit. They get 20% off their first order." },
];

function ReferAndEarnPage() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard?.writeText(REFERRAL_CODE).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Refer & Earn</h1>
      </div>

      <div className="px-5 pt-6">
        {/* Hero */}
        <div
          className="border p-6 text-center mb-6"
          style={{ borderColor: "var(--gold)30", background: "var(--gold)08" }}
        >
          <p className="eyebrow text-[9px] mb-1">Your Reward</p>
          <p className="font-display text-4xl text-gold leading-none mb-1">$20</p>
          <p className="text-xs text-muted-foreground">per successful referral</p>
        </div>

        {/* Referral code */}
        <div className="mb-6">
          <p className="eyebrow mb-3">Your Code</p>
          <div className="flex items-center border border-border overflow-hidden">
            <div className="flex-1 px-4 py-3.5 bg-secondary">
              <span className="font-mono text-lg text-gold tracking-widest">{REFERRAL_CODE}</span>
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="eyebrow text-[9px] px-4 py-3.5 border-l border-border hover:text-gold transition-colors flex-shrink-0"
              style={{ color: copied ? "var(--gold)" : "var(--muted-foreground)" }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-6">
          <p className="eyebrow mb-3">How it works</p>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs"
                  style={{ background: "var(--gold)15", color: "var(--gold)", border: "1px solid var(--gold)40" }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium">{step.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your referrals stats */}
        <div className="border border-border p-4 mb-6">
          <p className="eyebrow text-[9px] mb-3">Your Referrals</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-display text-2xl text-gold">3</p>
              <p className="eyebrow text-[8px] mt-1">Sent</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">1</p>
              <p className="eyebrow text-[8px] mt-1">Joined</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">$20</p>
              <p className="eyebrow text-[8px] mt-1">Earned</p>
            </div>
          </div>
        </div>

        {/* Share button */}
        <button
          type="button"
          className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors"
        >
          Share Your Code
        </button>

        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          Credits expire 12 months after being issued. One redemption per new user.
        </p>
      </div>
    </div>
  );
}
