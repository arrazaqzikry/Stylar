import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StylarNav } from "@/components/StylarNav";
import { OutfitCard } from "@/components/OutfitCard";
import {
  BUDGETS,
  generateOutfit,
  loadProfile,
  OCCASIONS,
  type Occasion,
  type Outfit,
  type Profile,
  styleIntensityLabel,
  type Weather,
  WEATHERS,
} from "@/lib/stylar";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "The Studio — STYLAR" },
      {
        name: "description",
        content: "Compose a head-to-toe look. Set occasion, weather and style intensity — Stylar does the rest.",
      },
    ],
  }),
  component: Studio,
});

function Studio() {
  const [profile, setProfile] = useState<Profile>({});
  const [occasion, setOccasion] = useState<Occasion>("Casual outing");
  const [weather, setWeather] = useState<Weather>("Mild");
  const [intensity, setIntensity] = useState(3);
  const [budget, setBudget] = useState<string>(BUDGETS[1]);
  const [seed, setSeed] = useState(0);
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const computed = useMemo(
    () => generateOutfit({ occasion, weather, intensity, budget }, profile),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [occasion, weather, intensity, budget, seed, profile],
  );

  useEffect(() => {
    setOutfit(computed);
  }, [computed]);

  return (
    <div className="min-h-screen">
      <StylarNav />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-10 sm:pt-20">
        <p className="eyebrow">The Studio</p>
        <h1 className="font-display mt-4 text-5xl leading-[1] sm:text-7xl">
          Compose your look.
        </h1>
      </section>

      {/* CONTROLS */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="hairline grid gap-10 border-b border-border py-10 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {/* occasion */}
          <Control label="Occasion">
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <Chip
                  key={o}
                  active={occasion === o}
                  onClick={() => setOccasion(o)}
                >
                  {o}
                </Chip>
              ))}
            </div>
          </Control>

          {/* weather */}
          <Control label="Climate">
            <div className="flex flex-wrap gap-2">
              {WEATHERS.map((w) => (
                <Chip key={w} active={weather === w} onClick={() => setWeather(w)}>
                  {w}
                </Chip>
              ))}
            </div>
          </Control>

          {/* budget */}
          <Control label="Budget">
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </Control>

          {/* shuffle */}
          <Control label=" ">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="eyebrow h-full border border-foreground bg-foreground px-6 py-4 text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background"
            >
              Recompose
            </button>
          </Control>
        </div>

        {/* intensity slider */}
        <div className="hairline border-b border-border py-10">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Style intensity</p>
            <p className="font-display text-2xl">
              <span className="text-gold">{intensity}</span>{" "}
              <span className="text-muted-foreground"> · </span>
              <span className="italic">{styleIntensityLabel(intensity)}</span>
            </p>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="stylar-range mt-6 w-full"
          />
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>Minimal</span>
            <span>Clean</span>
            <span>Balanced</span>
            <span>Trend</span>
            <span>Runway</span>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
        {outfit && <OutfitCard outfit={outfit} />}
      </section>

      <style>{`
        .stylar-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 24px;
        }
        .stylar-range::-webkit-slider-runnable-track {
          height: 1px;
          background: var(--border);
        }
        .stylar-range::-moz-range-track {
          height: 1px;
          background: var(--border);
        }
        .stylar-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: var(--gold);
          border: 3px solid var(--background);
          margin-top: -9px;
          cursor: pointer;
          box-shadow: 0 0 0 1px var(--gold);
        }
        .stylar-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: var(--gold);
          border: 3px solid var(--background);
          cursor: pointer;
          box-shadow: 0 0 0 1px var(--gold);
        }
      `}</style>
    </div>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="border px-3 py-2 text-xs transition-all"
      style={{
        borderColor: active ? "var(--gold)" : "var(--border)",
        color: active ? "var(--gold)" : "var(--muted-foreground)",
      }}
    >
      {children}
    </button>
  );
}
