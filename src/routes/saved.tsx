import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { StylarNav } from "@/components/StylarNav";
import { OUTFITS, type Outfit, type OutfitItem, type Category } from "@/lib/stylar";
import fi1 from "@/FashionAsset/FI-1.jpg";
import fi2 from "@/FashionAsset/FI-2.avif";
import fi3 from "@/FashionAsset/FI-3.avif";
import fi4 from "@/FashionAsset/FI-4.jpg";
import fi5 from "@/FashionAsset/FI-5.avif";
import fi6 from "@/FashionAsset/FI-6.avif";
import fi7 from "@/FashionAsset/FI-7.webp";
import fi8 from "@/FashionAsset/FI-8.avif";
import fi9 from "@/FashionAsset/FI-9.jpg";
import fi10 from "@/FashionAsset/FI-10.webp";
import fi11 from "@/FashionAsset/FI-11.jpg";
import fi12 from "@/FashionAsset/FI-12.webp";
import fi13 from "@/FashionAsset/FI-13.webp";
import fi14 from "@/FashionAsset/FI-14.jpg";
import fi15 from "@/FashionAsset/FI-15.webp";
import fi16 from "@/FashionAsset/FI-16.jpg";
import fi17 from "@/FashionAsset/FI-17.jpg";
import fi18 from "@/FashionAsset/FI-18.jpg";
import fi19 from "@/FashionAsset/FI-19.jpg";
import fi20 from "@/FashionAsset/FI-20.jpg";
import fi21 from "@/FashionAsset/FI-21.webp";
import fi22 from "@/FashionAsset/FI-22.jpg";
import fi23 from "@/FashionAsset/FI-23.jpg";
import fi24 from "@/FashionAsset/FI-24.jpg";

const FASHION_IMAGES = [
  fi1, fi2, fi3, fi4, fi5, fi6, fi7, fi8, fi9, fi10, fi11, fi12,
  fi13, fi14, fi15, fi16, fi17, fi18, fi19, fi20, fi21, fi22, fi23, fi24,
];

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "For You — STYLAR" },
      { name: "description", content: "Discover looks curated by Stylar AI, tuned to your taste." },
    ],
  }),
  component: ForYouPage,
});

// Alternate aspect ratios for Pinterest stagger
const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/5]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[2/3]"];

type StyleTab = "All" | "Daily" | "Professional" | "Big Day";

const TAB_CATEGORIES: Record<StyleTab, Category[]> = {
  All: [],
  Daily: ["Casual", "Streetwear", "Minimalist", "Sporty"],
  Professional: ["Business", "Formal"],
  "Big Day": ["Luxury", "Formal"],
};

const TABS: StyleTab[] = ["All", "Daily", "Professional", "Big Day"];

function getSlotItems(outfit: Outfit): { label: string; item: OutfitItem | null }[] {
  const find = (...slots: OutfitItem["slot"][]) =>
    slots.reduce<OutfitItem | null>((found, slot) => found ?? outfit.items.find((i) => i.slot === slot) ?? null, null);
  return [
    { label: "Top", item: find("Top", "Outerwear") },
    { label: "Bottom", item: find("Bottom") },
    { label: "Shoes", item: find("Shoes") },
    { label: "Accessory", item: find("Accessory", "Outerwear") },
  ];
}

function MockOutfitImage({ outfitId }: { outfitId: string }) {
  const globalIdx = OUTFITS.findIndex((o) => o.id === outfitId);
  const src = FASHION_IMAGES[globalIdx % FASHION_IMAGES.length];
  return <img src={src} alt="" className="h-full w-full object-cover" />;
}

/* ── Main For You page ─────────────────────────────────────── */

function ForYouPage() {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Outfit | null>(null);
  const [activeTab, setActiveTab] = useState<StyleTab>("All");
  const [loadingMore, setLoadingMore] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleLoadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => setLoadingMore(false), 4000);
  }

  useEffect(() => {
    const el = document.querySelector(".phone-content") as HTMLDivElement | null;
    contentRef.current = el;
  }, []);

  const filteredOutfits = useMemo(() => {
    const cats = TAB_CATEGORIES[activeTab];
    if (cats.length === 0) return OUTFITS;
    return OUTFITS.filter((o) => cats.includes(o.category));
  }, [activeTab]);

  function openDetail(outfit: Outfit) {
    setSelected(outfit);
    contentRef.current?.scrollTo({ top: 0 });
  }

  function closeDetail() {
    setSelected(null);
    contentRef.current?.scrollTo({ top: 0 });
  }

  function toggleLike(id: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (selected) {
    return (
      <OutfitDetailView
        outfit={selected}
        liked={liked.has(selected.id)}
        onToggleLike={() => toggleLike(selected.id)}
        onClose={closeDetail}
      />
    );
  }

  return (
    <div className="min-h-screen pb-6">
      <StylarNav />

      <div className="px-4 pt-5 pb-2">
        <p className="eyebrow text-[8px]" style={{ color: "var(--gold)" }}>Stylar AI · Curated</p>
        <h1 className="font-display mt-1.5 text-[2.1rem] leading-tight">For You</h1>
        <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
          Like what speaks to you — Stylar learns your taste.
        </p>
      </div>

      {/* Style tabs */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="flex overflow-x-auto no-scrollbar px-2">
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  contentRef.current?.scrollTo({ top: 0 });
                }}
                className="flex-shrink-0 px-3 py-3 transition-all relative"
              >
                <span
                  className="eyebrow text-[9px] transition-colors"
                  style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {tab}
                </span>
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full" style={{ background: "var(--gold)" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinterest masonry grid */}
      <div className="px-1.5 pt-1.5">
        <div style={{ columnCount: 2, columnGap: "6px" }}>
          {filteredOutfits.map((outfit, i) => {
            const isLiked = liked.has(outfit.id);
            const aspectClass = ASPECTS[i % ASPECTS.length];

            return (
              <div
                key={outfit.id}
                onClick={() => openDetail(outfit)}
                style={{ breakInside: "avoid", marginBottom: "6px", cursor: "pointer", display: "block" }}
                className="relative overflow-hidden group active:opacity-90 transition-opacity"
              >
                <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                  <MockOutfitImage outfitId={outfit.id} />

                  {/* Gradient layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-3 pointer-events-none">
                    <p className="eyebrow text-[6.5px] text-white/55 mb-0.5">{outfit.category}</p>
                    <p className="font-display text-[0.88rem] text-white leading-tight">{outfit.title}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleLike(outfit.id, e)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition-all z-10 active:scale-90"
                    style={{
                      background: isLiked ? "var(--gold)" : "rgba(0,0,0,0.38)",
                      border: isLiked ? "none" : "1px solid rgba(255,255,255,0.2)",
                    }}
                    aria-label={isLiked ? "Unlike" : "Like"}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24"
                      fill={isLiked ? "#000" : "none"}
                      stroke={isLiked ? "#000" : "rgba(255,255,255,0.9)"}
                      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="py-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="eyebrow flex items-center gap-2.5 border px-10 py-3 text-[9px] transition-all active:scale-95"
            style={{
              borderColor: loadingMore ? "var(--gold)" : "var(--border)",
              color: loadingMore ? "var(--gold)" : "var(--muted-foreground)",
              background: loadingMore ? "oklch(0.78 0.11 82 / 0.06)" : "transparent",
            }}
          >
            {loadingMore ? (
              <>
                <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" opacity="0.2"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                </svg>
                Curating more looks
              </>
            ) : "Load More"}
          </button>
          {!loadingMore && (
            <p className="eyebrow text-[7px] text-muted-foreground/40">Updated daily by Stylar AI</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Detail view ───────────────────────────────────────────── */

function OutfitDetailView({
  outfit,
  liked,
  onToggleLike,
  onClose,
}: {
  outfit: Outfit;
  liked: boolean;
  onToggleLike: () => void;
  onClose: () => void;
}) {
  const [itemLiked, setItemLiked] = useState<Set<string>>(new Set());
  const slotItems = getSlotItems(outfit);

  function toggleItemLike(label: string) {
    setItemLiked((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  return (
    <div className="min-h-screen animate-fade-up">
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/92 backdrop-blur-xl border-b border-border">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          For You
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLike}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-all active:scale-90"
            style={{
              borderColor: liked ? "var(--gold)" : "var(--border)",
              background: liked ? "var(--gold)" : "transparent",
            }}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg width="13" height="13" viewBox="0 0 24 24"
              fill={liked ? "#000" : "none"}
              stroke={liked ? "#000" : "var(--muted-foreground)"}
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            type="button"
            className="eyebrow text-[9px] border border-border px-3 py-1.5 hover:border-gold hover:text-gold transition-colors active:scale-95"
          >
            Save
          </button>
        </div>
      </div>

      {/* Hero mock image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <MockOutfitImage outfitId={outfit.id} />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <span className="eyebrow text-[7px] text-gold/80">{outfit.category}</span>
          <h2 className="font-display text-[1.9rem] leading-tight text-foreground mt-0.5">{outfit.title}</h2>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <p className="eyebrow text-[9px]">AI Confidence · {outfit.confidence}%</p>
          </div>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div>
          <p className="eyebrow text-[8px] mb-2" style={{ color: "var(--gold)" }}>About this look</p>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{outfit.story}</p>
        </div>

        <div className="border-l-2 pl-4" style={{ borderColor: "oklch(0.78 0.11 82 / 0.4)" }}>
          <p className="eyebrow text-[7px] mb-1.5 text-muted-foreground/60">Why it works</p>
          <p className="text-[13px] italic text-foreground/75 leading-relaxed">"{outfit.insight}"</p>
        </div>

        <div>
          <p className="eyebrow text-[8px] mb-2.5" style={{ color: "var(--gold)" }}>Style Direction</p>
          <div className="flex flex-wrap gap-1.5">
            {[outfit.category, ...outfit.occasions].map((tag) => (
              <span key={tag} className="eyebrow text-[7.5px] border px-2.5 py-1 text-muted-foreground" style={{ borderColor: "var(--border)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-[8px] mb-3" style={{ color: "var(--gold)" }}>Palette</p>
          <div className="flex gap-4">
            {outfit.palette.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1.5">
                <span className="h-9 w-9 border border-border shadow-sm" style={{ backgroundColor: c.hex }} />
                <span className="text-[8px] text-muted-foreground text-center leading-tight">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-[8px] mb-3" style={{ color: "var(--gold)" }}>The Pieces</p>
          <div className="grid grid-cols-2 gap-2.5">
            {slotItems.map(({ label, item }) => (
              <PieceCard
                key={label}
                label={label}
                item={item}
                liked={itemLiked.has(label)}
                onToggleLike={() => toggleItemLike(label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2×2 piece card ────────────────────────────────────────── */

const SLOT_BG: Record<string, string> = {
  Top: "#2b2d31",
  Bottom: "#c8bca8",
  Shoes: "#3e2418",
  Accessory: "#c9b48a",
};

function PieceCard({
  label,
  item,
  liked,
  onToggleLike,
}: {
  label: string;
  item: OutfitItem | null;
  liked: boolean;
  onToggleLike: () => void;
}) {
  return (
    <div className="border border-border overflow-hidden">
      <div
        className="relative w-full aspect-square flex items-center justify-center"
        style={{ backgroundColor: SLOT_BG[label] ?? "#1a1a1a" }}
      >
        <span className="eyebrow text-[7px] text-white/40">{label}</span>
        <button
          type="button"
          onClick={onToggleLike}
          className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full backdrop-blur-sm transition-all"
          style={{
            background: liked ? "var(--gold)" : "rgba(0,0,0,0.4)",
            border: liked ? "none" : "1px solid rgba(255,255,255,0.2)",
          }}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <span
            className="text-[10px] leading-none select-none"
            style={{ color: liked ? "#000" : "rgba(255,255,255,0.7)" }}
          >
            {liked ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="p-2.5 space-y-1">
        {item ? (
          <>
            <p className="text-xs font-medium text-foreground leading-tight line-clamp-1">{item.name}</p>
            <p className="text-[10px] text-muted-foreground">{item.brand}</p>
            <div className="flex items-center justify-between pt-0.5">
              <span className="font-mono text-[10px]">{item.price}</span>
              <a
                href={item.link}
                onClick={(e) => e.preventDefault()}
                className="eyebrow text-[8px] text-gold hover:opacity-70 transition-opacity"
              >
                Shop →
              </a>
            </div>
          </>
        ) : (
          <p className="text-[10px] text-muted-foreground italic py-1">Not in this look</p>
        )}
      </div>
    </div>
  );
}
