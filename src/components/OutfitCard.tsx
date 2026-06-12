import { useEffect, useState } from "react";
import type { Outfit } from "@/lib/stylar";
import { loadFeedback, loadSaved, setFeedback, toggleSaved } from "@/lib/stylar";

interface Props {
  outfit: Outfit;
  variant?: "full" | "compact";
}

export function OutfitCard({ outfit, variant = "full" }: Props) {
  const [saved, setSaved] = useState<string[]>([]);
  const [fb, setFb] = useState<Record<string, "like" | "dislike" | undefined>>({});

  useEffect(() => {
    setSaved(loadSaved());
    setFb(loadFeedback());
  }, []);

  const isSaved = saved.includes(outfit.id);
  const userFb = fb[outfit.id];

  if (variant === "compact") {
    return (
      <div className="group animate-fade-up">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={outfit.image}
            alt={outfit.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4">
          <p className="eyebrow">{outfit.category}</p>
          <h3 className="font-display mt-1 text-xl">{outfit.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <article className="animate-fade-up grid gap-12 lg:grid-cols-[1.05fr_1fr]">
      {/* IMAGE */}
      <div className="relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-5 top-5 flex items-center gap-2 bg-background/70 px-3 py-1.5 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="eyebrow text-foreground">Look No. 01</span>
          </div>
          <div className="absolute bottom-5 right-5 bg-background/70 px-3 py-1.5 backdrop-blur">
            <span className="eyebrow">Confidence · </span>
            <span className="font-mono text-xs text-gold">{outfit.confidence}</span>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex flex-col">
        <p className="eyebrow">{outfit.category} · Curated by Stylar</p>
        <h2 className="font-display mt-3 text-5xl leading-[1.05] sm:text-6xl">
          {outfit.title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          {outfit.story}
        </p>

        {/* insight */}
        <div className="hairline mt-10 pt-6">
          <p className="eyebrow">Why it works</p>
          <p className="font-display mt-2 text-xl italic text-foreground/90">
            “{outfit.insight}”
          </p>
        </div>

        {/* palette */}
        <div className="hairline mt-8 pt-6">
          <p className="eyebrow">Palette</p>
          <div className="mt-4 flex gap-3">
            {outfit.palette.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span
                  className="h-7 w-7 border border-border"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* items */}
        <div className="hairline mt-8 pt-6">
          <p className="eyebrow mb-4">The Look</p>
          <ul className="divide-y divide-border">
            {outfit.items.map((it) => (
              <li
                key={it.slot + it.name}
                className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-4 py-3"
              >
                <span className="eyebrow">{it.slot}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm">{it.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{it.brand}</p>
                </div>
                <a
                  href={it.link}
                  className="font-mono text-xs text-foreground/80 transition-colors hover:text-gold"
                >
                  {it.price}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* actions */}
        <div className="hairline mt-10 flex flex-wrap items-center gap-3 pt-6">
          <button
            onClick={() => setSaved(toggleSaved(outfit.id))}
            className="eyebrow border border-border px-5 py-3 transition-all hover:border-gold hover:text-gold"
            style={isSaved ? { borderColor: "var(--gold)", color: "var(--gold)" } : undefined}
          >
            {isSaved ? "Saved" : "Save Look"}
          </button>
          <button
            onClick={() => setFb(setFeedback(outfit.id, "like"))}
            className="eyebrow border border-border px-5 py-3 transition-all hover:border-foreground"
            style={userFb === "like" ? { borderColor: "var(--foreground)" } : undefined}
          >
            ♡ Adore
          </button>
          <button
            onClick={() => setFb(setFeedback(outfit.id, "dislike"))}
            className="eyebrow border border-border px-5 py-3 transition-all hover:border-foreground"
            style={userFb === "dislike" ? { borderColor: "var(--foreground)" } : undefined}
          >
            Pass
          </button>
        </div>
      </div>
    </article>
  );
}
