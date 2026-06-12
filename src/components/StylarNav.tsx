import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Atelier" },
  { to: "/generate", label: "Generate" },
  { to: "/saved", label: "Wardrobe" },
] as const;

export function StylarNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-[0.3em] sm:text-[1.6rem]">
            STYLAR
          </span>
          <span className="h-1 w-1 rounded-full bg-gold" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="eyebrow group relative transition-colors hover:text-foreground"
                style={active ? { color: "var(--foreground)" } : undefined}
              >
                {l.label}
                <span
                  className="absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/onboarding"
          className="eyebrow border border-border px-4 py-2 transition-colors hover:border-gold hover:text-gold"
        >
          Profile
        </Link>
      </div>

      {/* mobile nav */}
      <nav className="flex items-center justify-around border-t border-border py-3 md:hidden">
        {links.map((l) => {
          const active = path === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className="eyebrow"
              style={active ? { color: "var(--gold)" } : undefined}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
