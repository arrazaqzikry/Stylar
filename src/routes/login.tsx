import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import stylarLogo from "@/assets/STYLAR-NOBG.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "STYLAR" },
      { name: "description", content: "Sign in to your STYLAR personal atelier." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden px-6 py-5">
      {/* Back + Logo */}
      <Link
        to="/get-started"
        className="self-start mb-5 inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </Link>

      <div className="flex items-center gap-2.5 mb-6">
        <img src={stylarLogo} alt="STYLAR" className="h-7 w-7 object-contain" />
        <span className="font-display text-xl tracking-[0.3em]">STYLAR</span>
      </div>

      {/* Heading */}
      <div className="mb-5">
        <h1 className="font-display text-[1.6rem] leading-tight">Welcome back.</h1>
        <p className="text-[11px] text-muted-foreground mt-1">Sign in to your personal atelier.</p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-3 flex-1" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="eyebrow text-[9px] text-muted-foreground block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-border bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="eyebrow text-[9px] text-muted-foreground block">Password</label>
            <button type="button" className="eyebrow text-[9px] text-muted-foreground hover:text-gold transition-colors">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-border bg-secondary px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {showPass ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Log In button */}
        <Link
          to="/saved"
          className="eyebrow block w-full border border-foreground bg-foreground py-3 text-center text-xs text-primary-foreground hover:bg-gold hover:border-gold hover:text-background transition-colors mt-1"
        >
          Log In
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-border" />
          <span className="eyebrow text-[8px] text-muted-foreground">or continue with</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-border py-2.5 text-muted-foreground hover:border-gold hover:text-gold transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="eyebrow text-[9px]">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-border py-2.5 text-muted-foreground hover:border-gold hover:text-gold transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="eyebrow text-[9px]">Apple</span>
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-[11px] text-muted-foreground mt-auto pt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold hover:opacity-70 transition-opacity">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
