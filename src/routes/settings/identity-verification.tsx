import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/identity-verification")({
  head: () => ({ meta: [{ title: "Identity Verification — STYLAR" }] }),
  component: IdentityVerificationPage,
});

const STEPS = [
  { num: 1, title: "Government ID", desc: "Upload a valid passport, driver's licence or national ID." },
  { num: 2, title: "Selfie Match", desc: "Take a live selfie so we can match it to your document." },
  { num: 3, title: "Review", desc: "Our team verifies your submission within 24 hours." },
];

function IdentityVerificationPage() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Identity Verification</h1>
      </div>

      <div className="px-5 pt-6">
        {/* Status badge */}
        <div className="flex items-center gap-3 border border-border p-4 mb-6">
          <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🪪</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">Not Verified</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Verify your identity to unlock all features</p>
          </div>
          <span className="eyebrow text-[8px] border border-border px-2 py-1 text-muted-foreground">Pending</span>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <p className="eyebrow mb-3">Why verify?</p>
          <div className="space-y-3">
            {[
              { icon: "✓", text: "Access exclusive drops and early releases" },
              { icon: "✓", text: "Higher spending limits and faster checkouts" },
              { icon: "✓", text: "Verified badge on your public profile" },
              { icon: "✓", text: "Priority customer support" },
            ].map((b) => (
              <div key={b.text} className="flex items-start gap-3">
                <span className="text-gold text-xs mt-0.5">{b.icon}</span>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
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

        {!started ? (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors"
          >
            Start Verification
          </button>
        ) : (
          <div className="border border-gold/40 p-4 text-center">
            <p className="text-gold eyebrow text-[9px] mb-1">Verification Started</p>
            <p className="text-xs text-muted-foreground">
              Check your email for next steps. We'll notify you within 24 hours.
            </p>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground text-center mt-4 leading-relaxed">
          Your data is encrypted and handled in accordance with our{" "}
          <Link to="/settings/privacy-policy" className="underline hover:text-gold">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
