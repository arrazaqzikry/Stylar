import { createFileRoute, Link } from "@tanstack/react-router";
import stylarLogo from "@/assets/STYLAR-NOBG.jpg";

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
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border border-gold/30 bg-secondary flex items-center justify-center shadow-[0_0_50px_rgba(180,150,80,0.15)]">
              <img src={stylarLogo} alt="STYLAR" className="h-14 w-14 object-contain" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-gold border-2 border-background" />
          </div>
          <div className="text-center">
            <p className="eyebrow text-[9px] text-muted-foreground mb-1">Personal Atelier</p>
            <h1 className="font-display text-[2.2rem] tracking-[0.3em] leading-none">STYLAR</h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center max-w-[240px] space-y-2.5">
          <p className="font-display text-[1.1rem] leading-snug text-foreground">
            Your wardrobe,<br />reimagined by AI.
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Curated outfits, generated looks, and a wardrobe that's unmistakably yours.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {["AI Outfit Generation", "Personal Taste Engine", "Style Curation"].map((f) => (
            <span key={f} className="eyebrow text-[8px] border border-gold/25 px-3 py-1.5 text-muted-foreground">
              {f}
            </span>
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
