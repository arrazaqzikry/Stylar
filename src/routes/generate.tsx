import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StylarNav } from "@/components/StylarNav";
import {
  fetchGenOutfit,
  GEN_PRICE_RANGES,
  GEN_STYLES,
  GEN_STYLE_LEVELS,
  type GenClimate,
  type GenOutfit,
  type GenPriceRange,
  type GenStyle,
  type GenStyleLevel,
} from "@/lib/stylar";
import top1 from "@/FashionAsset/top/top-1.jpg";
import top2 from "@/FashionAsset/top/top-2.avif";
import top3 from "@/FashionAsset/top/top-3.jpg";
import shoes1 from "@/FashionAsset/shoes/shoes-1.avif";
import shoes2 from "@/FashionAsset/shoes/shoes-2.jpg";
import shoes3 from "@/FashionAsset/shoes/shoes-3.jpg";
import shoes4 from "@/FashionAsset/shoes/shoes-4.webp";
import shoes5 from "@/FashionAsset/shoes/shoes-5.jpg";
import trousers1 from "@/FashionAsset/trousers/trousers-1.jpg";
import trousers2 from "@/FashionAsset/trousers/trousers-2.webp";
import trousers3 from "@/FashionAsset/trousers/trousers-3.webp";
import trousers4 from "@/FashionAsset/trousers/trousers-4.avif";
import acc1 from "@/FashionAsset/accessory/acc-1.jpg";
import acc2 from "@/FashionAsset/accessory/acc-2.jpg";
import acc3 from "@/FashionAsset/accessory/acc-3.jpg";
import acc4 from "@/FashionAsset/accessory/acc-4.jpg";
import acc5 from "@/FashionAsset/accessory/acc-5.jpg";

const SLOT_IMAGES: Record<string, string[]> = {
  Top:       [top1, top2, top3],
  Bottom:    [trousers1, trousers2, trousers3, trousers4],
  Shoes:     [shoes1, shoes2, shoes3, shoes4, shoes5],
  Accessory: [acc1, acc2, acc3, acc4, acc5],
};

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      {
        name: "description",
        content: "Compose a head-to-toe look. Set your style, budget and climate — Stylar does the rest.",
      },
    ],
  }),
  component: Studio,
});

const LOADING_STEPS = [
  "Reading your silhouette…",
  "Analysing palette and climate…",
  "Composing the look…",
  "Refining the final edit…",
  "Almost ready…",
];

type ShopItem = {
  slot: "Top" | "Bottom" | "Shoes" | "Accessory";
  name: string;
  brand: string;
  price: string;
  color: string;
  optional?: boolean;
};

const SHOP_SETS: Record<string, ShopItem[]> = {
  minimal: [
    { slot: "Top", name: "Merino Crewneck", brand: "Uniqlo", price: "RM 59", color: "#2b2d31" },
    { slot: "Bottom", name: "Slim Straight Chino", brand: "COS", price: "RM 89", color: "#c8bca8" },
    { slot: "Shoes", name: "Leather Low Trainer", brand: "Veja", price: "RM 160", color: "#f1ece2" },
    { slot: "Accessory", name: "Canvas Tote", brand: "L.L.Bean", price: "RM 35", color: "#b08a5a", optional: true },
  ],
  balanced: [
    { slot: "Top", name: "Oxford Button-Down", brand: "Everlane", price: "RM 88", color: "#172033" },
    { slot: "Bottom", name: "Tailored Trouser", brand: "COS", price: "RM 130", color: "#2b2d31" },
    { slot: "Shoes", name: "Leather Loafer", brand: "Clarks", price: "RM 145", color: "#7a4d2e" },
    { slot: "Accessory", name: "Crossbody Bag", brand: "Carhartt WIP", price: "RM 65", color: "#5b5a3a", optional: true },
  ],
  mega: [
    { slot: "Top", name: "Single-Button Blazer", brand: "Reiss", price: "RM 380", color: "#0a0a0c" },
    { slot: "Bottom", name: "Tailored Dress Trouser", brand: "Reiss", price: "RM 220", color: "#172033" },
    { slot: "Shoes", name: "Oxford Brogue", brand: "Church's", price: "RM 390", color: "#3e2418" },
    { slot: "Accessory", name: "Silk Pocket Square", brand: "Drake's", price: "RM 75", color: "#c9b48a", optional: true },
  ],
};

function getShopItems(outfit: GenOutfit): ShopItem[] {
  const key = outfit.style?.toLowerCase() as keyof typeof SHOP_SETS;
  return SHOP_SETS[key] ?? SHOP_SETS.balanced;
}

function Studio() {
  const [style, setStyle]           = useState<GenStyle>("Daily");
  const [priceRange, setPriceRange] = useState<GenPriceRange>("Budget");
  const [climate, setClimate]       = useState<GenClimate>("Hot");
  const [styleLevel, setStyleLevel] = useState<GenStyleLevel>("Balanced");

  const [loading, setLoading]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [outfit, setOutfit]       = useState<GenOutfit | null>(null);
  const [error, setError]         = useState<string | null>(null);

  const [toast, setToast]         = useState(false);
  const [phoneScreen, setPhoneScreen] = useState<Element | null>(null);

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPhoneScreen(document.querySelector(".phone-screen"));
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (toastTimer.current)  clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(true);
    toastTimer.current = setTimeout(() => setToast(false), 2000);
  }

  async function handleGenerate() {
    setLoading(true);
    setOutfit(null);
    setError(null);
    setProgress(0);
    setStepIndex(0);

    const DURATION = 5000;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / DURATION) * 100, 99));
      setStepIndex(Math.min(
        Math.floor((elapsed / DURATION) * LOADING_STEPS.length),
        LOADING_STEPS.length - 1,
      ));
    }, 80);

    try {
      const [result] = await Promise.all([
        fetchGenOutfit(style, priceRange, styleLevel),
        new Promise<void>((r) => setTimeout(r, DURATION)),
      ]);

      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);

      if (!result) setError("No looks found for this combination. Try different filters.");
      else setOutfit(result);
    } catch {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Toast portal — renders inside phone-screen above all content */}
      {toast && phoneScreen && createPortal(
        <div
          className="absolute inset-x-0 z-[999] flex justify-center pointer-events-none px-6"
          style={{ top: "80px" }}
        >
          <div className="bg-foreground text-primary-foreground px-5 py-3 flex items-center gap-2.5 shadow-2xl animate-fade-up">
            <span style={{ color: "var(--gold)" }}>✓</span>
            <span className="eyebrow text-[10px]">Added to basket</span>
          </div>
        </div>,
        phoneScreen,
      )}

      <StylarNav />

      <section className="px-5 pb-8 pt-8">
        <p className="eyebrow">The Studio</p>
        <h1 className="font-display mt-3 text-[2.2rem] leading-[1]">
          Compose your look.
        </h1>
      </section>

      {/* FILTERS */}
      <section className="px-5">
        <div className="hairline border-b border-border pb-6 pt-4 space-y-6">
          <Control label="Occasion">
            <div className="flex flex-wrap gap-2">
              {GEN_STYLES.map((s) => (
                <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Chip>
              ))}
              <ComingSoonChip>Evening Out</ComingSoonChip>
              <ComingSoonChip>Gym & Active</ComingSoonChip>
              <ComingSoonChip>Travel</ComingSoonChip>
              <ComingSoonChip>Formal Event</ComingSoonChip>
            </div>
          </Control>

          <Control label="Style">
            <div className="flex flex-wrap gap-2">
              {GEN_STYLE_LEVELS.map((l) => (
                <Chip key={l} active={styleLevel === l} onClick={() => setStyleLevel(l)}>{l}</Chip>
              ))}
              <ComingSoonChip>Avant-Garde</ComingSoonChip>
              <ComingSoonChip>Streetwear Edit</ComingSoonChip>
            </div>
          </Control>

          <Control label="Price Range">
            <div className="flex flex-wrap gap-2">
              {GEN_PRICE_RANGES.map((p) => (
                <Chip key={p} active={priceRange === p} onClick={() => setPriceRange(p)}>{p}</Chip>
              ))}
              <ComingSoonChip>Ultra Luxury</ComingSoonChip>
            </div>
          </Control>

          <Control label="Climate">
            <div className="flex flex-wrap gap-2">
              <Chip active={climate === "Hot"} onClick={() => setClimate("Hot")}>Hot</Chip>
              <ComingSoonChip>Mild</ComingSoonChip>
              <ComingSoonChip>Cold</ComingSoonChip>
              <ComingSoonChip>Snowy</ComingSoonChip>
            </div>
          </Control>

          <Control label="Fit Preference">
            <div className="flex flex-wrap gap-2">
              <ComingSoonChip>Fit</ComingSoonChip>
              <ComingSoonChip>Regular</ComingSoonChip>
              <ComingSoonChip>Oversize</ComingSoonChip>
            </div>
          </Control>

          <Control label="Colour Preference">
            <div className="flex flex-wrap gap-2">
              <ComingSoonChip>Neutrals</ComingSoonChip>
              <ComingSoonChip>Earth Tones</ComingSoonChip>
              <ComingSoonChip>Monochrome</ComingSoonChip>
              <ComingSoonChip>Pastels</ComingSoonChip>
              <ComingSoonChip>Bold</ComingSoonChip>
              <ComingSoonChip>Dark Palette</ComingSoonChip>
            </div>
          </Control>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="eyebrow w-full border border-foreground bg-foreground py-4 text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Composing…" : "Generate Outfit"}
          </button>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="px-5 py-16">
          <p className="eyebrow mb-5 text-center">Stylar AI</p>
          <div className="h-px w-full bg-border overflow-hidden">
            <div
              className="h-px bg-gold"
              style={{ width: `${progress}%`, transition: "width 80ms linear" }}
            />
          </div>
          <p className="font-display mt-6 text-center text-xl italic text-muted-foreground">
            {LOADING_STEPS[stepIndex]}
          </p>
          <p className="font-mono mt-3 text-center text-xs text-muted-foreground/50">
            {Math.round(progress)}%
          </p>
        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="px-5 py-16 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
        </section>
      )}

      {/* RESULT */}
      {!loading && outfit && (
        <>
          <section className="px-5 py-10">
            <GenOutfitCard outfit={outfit} />
          </section>

          {/* SHOP THE LOOK */}
          <section className="px-5 pb-10">
            <div className="hairline pt-6 mb-6">
              <p className="eyebrow">Shop the Look</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Each piece curated to complete this edit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {getShopItems(outfit).map((item) => (
                <ShopItemCard key={item.slot} item={item} onAddToBasket={showToast} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* EMPTY STATE */}
      {!loading && !outfit && !error && (
        <section className="px-5 py-16">
          <div className="border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl text-muted-foreground">
              Set your filters and press Generate.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function ShopItemCard({ item, onAddToBasket }: { item: ShopItem; onAddToBasket?: () => void }) {
  const [inBasket, setInBasket] = useState(false);

  const slotImage = useMemo(() => {
    const pool = SLOT_IMAGES[item.slot] ?? SLOT_IMAGES.Top;
    const hash = item.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return pool[hash % pool.length];
  }, [item.slot, item.name]);

  return (
    <div className="border border-border flex flex-col">
      <div className="w-full aspect-square overflow-hidden relative">
        <img src={slotImage} alt={item.slot} className="h-full w-full object-cover" />
        {item.optional && (
          <span className="absolute bottom-1.5 left-1.5 eyebrow text-[7px] bg-background/70 text-muted-foreground px-1.5 py-0.5 backdrop-blur-sm">
            Optional
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs font-medium text-foreground leading-tight">{item.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{item.brand}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-mono text-xs text-foreground">{item.price}</span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="eyebrow text-[9px] text-gold hover:opacity-70 transition-opacity"
          >
            Checkout →
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!inBasket) {
              setInBasket(true);
              onAddToBasket?.();
            } else {
              setInBasket(false);
            }
          }}
          className="eyebrow text-[9px] w-full py-2 border transition-all"
          style={{
            borderColor: inBasket ? "var(--gold)" : "var(--border)",
            color: inBasket ? "var(--gold)" : "var(--muted-foreground)",
            backgroundColor: inBasket ? "var(--gold)15" : "transparent",
          }}
        >
          {inBasket ? "✓ In basket" : "+ Add to basket"}
        </button>
      </div>
    </div>
  );
}

function GenOutfitCard({ outfit }: { outfit: GenOutfit }) {
  return (
    <article className="animate-fade-up space-y-6">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
        <img
          src={outfit.image_url}
          alt={outfit.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 bg-background/70 px-3 py-1.5 backdrop-blur">
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="eyebrow text-foreground text-[9px]">Stylar AI · Curated</span>
        </div>
      </div>

      <div>
        <p className="eyebrow">{outfit.style} · Generated by Stylar</p>
        <h2 className="font-display mt-2 text-3xl leading-[1.05]">{outfit.name}</h2>

        <div className="hairline mt-6 pt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="eyebrow text-[9px]">Price Range</p>
            <p className="font-display mt-1 text-xl">{outfit.price_range}</p>
          </div>
          <div>
            <p className="eyebrow text-[9px]">Style Direction</p>
            <p className="font-display mt-1 text-xl italic text-foreground/80">{outfit.style}</p>
          </div>
        </div>

        <div className="hairline mt-6 pt-4 space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This look was composed by Stylar AI based on your selected occasion,
            price range and climate — refined using what Stylar has learned from
            your likes and saved looks.
          </p>
          <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
            The more you like and save in <span className="text-gold">For You</span>,
            the more personal your generations become.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="eyebrow mt-6 border border-border px-5 py-3 transition-colors hover:border-gold hover:text-gold"
        >
          ↑ Regenerate
        </button>
      </div>
    </article>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </div>
  );
}

function ComingSoonChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button
        type="button"
        disabled
        className="border px-3 py-2 text-xs cursor-not-allowed select-none"
        style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", opacity: 0.35 }}
      >
        {children}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="bg-foreground text-background px-2.5 py-1.5 whitespace-nowrap shadow-lg">
          <span className="eyebrow text-[8px]">Coming Soon</span>
        </div>
        <div className="w-0 h-0 mx-auto" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid var(--foreground)" }} />
      </div>
    </div>
  );
}

function Chip({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border px-3 py-2 text-xs transition-all disabled:cursor-not-allowed disabled:opacity-35"
      style={{
        borderColor: active ? "var(--gold)" : "var(--border)",
        color: active ? "var(--gold)" : "var(--muted-foreground)",
      }}
    >
      {children}
    </button>
  );
}
