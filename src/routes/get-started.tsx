import { createFileRoute, Link } from "@tanstack/react-router";
import stylarLogo from "@/assets/STYLAR-NOBG.jpg";
import getStartedPic from "@/assets/getstarted.jpg";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      { name: "description", content: "Start your personal atelier journey with STYLAR." },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
  return (
    <div className="h-full flex flex-col items-center justify-between px-6 py-8 overflow-hidden">
      {/* Top left logo */}
      <div className="w-full flex items-center gap-2 mb-4">
        <img src={stylarLogo} alt="STYLAR" className="h-8 w-8 object-contain" />
        <span className="font-display text-sm tracking-[0.3em]">STYLAR</span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
        {/* Hero image */}
        <div className="w-full max-w-[240px] aspect-[3/4] overflow-hidden rounded-sm">
          <img src={getStartedPic} alt="Get Started" className="w-full h-full object-cover" />
        </div>

        {/* Tagline */}
        <div className="text-center max-w-[320px] space-y-4">
          <h2 className="font-display text-[1.9rem] leading-tight text-foreground">
            Find Your Style in a Click
          </h2>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Stylar builds your outfit for you and lets you shop the missing pieces instantly in just one tap.
          </p>
        </div>

        {/* Feature boxes */}
        <div className="w-full grid grid-cols-3 gap-2">
          {[
            { title: "AI Outfit", sub: "Generation" },
            { title: "Personal", sub: "Taste Engine" },
            { title: "Instant", sub: "Checkout" },
          ].map((f) => (
            <div
              key={f.title}
              className="border border-gold/25 px-2 py-3 flex flex-col items-center gap-1 text-center"
            >
              <span className="eyebrow text-[8px] tracking-widest text-gold">{f.title}</span>
              <span className="eyebrow text-[8px] tracking-widest text-muted-foreground">{f.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full space-y-3">
        <Link
          to="/login"
          className="eyebrow block w-full border border-foreground bg-foreground py-3.5 text-center text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors"
        >
          Get Started
        </Link>
        <p className="text-[9px] text-muted-foreground text-center leading-relaxed">
          By continuing you agree to our{" "}
          <Link to="/settings/terms-of-service" className="underline hover:text-gold">Terms</Link>
          {" & "}
          <Link to="/settings/privacy-policy" className="underline hover:text-gold">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
