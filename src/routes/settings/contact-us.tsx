import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/contact-us")({
  head: () => ({ meta: [{ title: "Contact Us — STYLAR" }] }),
  component: ContactUsPage,
});

const SUBJECTS = [
  "Order Issue",
  "Return or Refund",
  "Payment Problem",
  "Account Help",
  "Stylar AI Feedback",
  "Partnership Enquiry",
  "Other",
];

function ContactUsPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject || !message.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen pb-8">
        <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
          <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </Link>
          <h1 className="font-display text-lg">Contact Us</h1>
        </div>
        <div className="px-5 pt-16 text-center animate-fade-up">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "var(--gold)15", border: "1px solid var(--gold)40" }}
          >
            <span style={{ color: "var(--gold)", fontSize: "1.5rem" }}>✓</span>
          </div>
          <h2 className="font-display text-2xl mb-2">Message Sent</h2>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Thank you for reaching out. Our team will get back to you within 1–2 business days at your registered email address.
          </p>
          <Link
            to="/profile"
            className="eyebrow text-[9px] text-gold hover:opacity-70 transition-opacity"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="eyebrow text-[10px] hover:text-gold transition-colors">←</Link>
        <h1 className="font-display text-lg">Contact Us</h1>
      </div>

      <div className="px-5 pt-5">
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          We'd love to hear from you. Fill in the form below and our team will be in touch shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <div>
            <p className="eyebrow text-[9px] mb-2">Subject</p>
            <div className="space-y-1.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className="w-full text-left border px-4 py-3 text-sm transition-all"
                  style={{
                    borderColor: subject === s ? "var(--gold)" : "var(--border)",
                    color: subject === s ? "var(--gold)" : "var(--foreground)",
                    backgroundColor: subject === s ? "var(--gold)08" : "transparent",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="eyebrow text-[9px] mb-2">Message</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue or question…"
              rows={5}
              className="w-full border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <p className="text-[10px] text-muted-foreground mt-1 text-right">{message.length}/500</p>
          </div>

          <button
            type="submit"
            disabled={!subject || !message.trim()}
            className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send Message
          </button>
        </form>

        {/* Alternative contact */}
        <div className="mt-8 border-t border-border pt-6 space-y-3">
          <p className="eyebrow text-[9px]">Other ways to reach us</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-sm">📧</span>
              <p className="text-xs text-muted-foreground">support@stylar.ai</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">📸</span>
              <p className="text-xs text-muted-foreground">@stylar.official</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">🕐</span>
              <p className="text-xs text-muted-foreground">Mon–Fri, 9am–6pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
