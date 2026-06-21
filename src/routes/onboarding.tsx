import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BUDGETS,
  CATEGORIES,
  COLOR_SWATCHES,
  loadProfile,
  type Profile,
  saveProfile,
  SKIN_TONES,
} from "@/lib/stylar";
import { StylarNav } from "@/components/StylarNav";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      {
        name: "description",
        content: "Compose your private style profile so Stylar can dress you with precision.",
      },
    ],
  }),
  component: Onboarding,
});

const STEPS = [
  "Height",
  "Weight",
  "Skin tone",
  "Style",
  "Loved colours",
  "Avoided colours",
  "Budget",
] as const;

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Profile>({});

  useEffect(() => {
    loadProfile().then(setP);
  }, []);

  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  async function next() {
    if (step === total - 1) {
      await saveProfile({ ...p, completed: true });
      nav({ to: "/generate" });
    } else {
      setStep(step + 1);
    }
  }
  function back() {
    if (step === 0) nav({ to: "/" });
    else setStep(step - 1);
  }
  function update<K extends keyof Profile>(k: K, v: Profile[K]) {
    setP({ ...p, [k]: v });
  }
  function toggleArr(key: "styles" | "favoriteColors" | "dislikedColors", v: string) {
    const cur = (p[key] as string[] | undefined) ?? [];
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    setP({ ...p, [key]: next });
  }

  return (
    <div className="min-h-screen">
      <StylarNav />

      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-20">
        {/* progress */}
        <div className="flex items-center justify-between">
          <p className="eyebrow">
            Chapter {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="eyebrow">{STEPS[step]}</p>
        </div>
        <div className="hairline mt-3 h-px w-full overflow-hidden">
          <div
            className="h-px bg-gold transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div key={step} className="animate-fade-up mt-20">
          {step === 0 && (
            <FieldText
              title="What is your height?"
              caption="Proportion guides every silhouette we propose."
              value={p.height ?? ""}
              placeholder="e.g. 5'9 or 175cm"
              onChange={(v) => update("height", v)}
            />
          )}
          {step === 1 && (
            <FieldText
              title="And your weight?"
              caption="Used only to balance fit and tailoring."
              value={p.weight ?? ""}
              placeholder="e.g. 68 kg"
              onChange={(v) => update("weight", v)}
            />
          )}
          {step === 2 && (
            <FieldSwatch
              title="Your skin tone."
              caption="So palettes flatter, never compete."
              options={SKIN_TONES}
              selected={p.skinTone}
              onSelect={(name) => update("skinTone", name)}
            />
          )}
          {step === 3 && (
            <FieldChips
              title="Which categories define you?"
              caption="Select as many as feel true."
              options={CATEGORIES}
              selected={p.styles ?? []}
              onToggle={(v) => toggleArr("styles", v)}
            />
          )}
          {step === 4 && (
            <FieldColors
              title="Colours you love."
              caption="Stylar will lean toward these."
              selected={p.favoriteColors ?? []}
              onToggle={(v) => toggleArr("favoriteColors", v)}
            />
          )}
          {step === 5 && (
            <FieldColors
              title="Colours to avoid."
              caption="We'll keep these out of your wardrobe."
              selected={p.dislikedColors ?? []}
              onToggle={(v) => toggleArr("dislikedColors", v)}
            />
          )}
          {step === 6 && (
            <FieldChips
              title="Your budget per look?"
              caption="A guide, never a rule."
              options={BUDGETS}
              selected={p.budget ? [p.budget] : []}
              onToggle={(v) => update("budget", v)}
              single
            />
          )}
        </div>

        <div className="hairline mt-20 flex items-center justify-between pt-6">
          <button type="button"
            onClick={back}
            className="eyebrow border border-border px-5 py-3 transition-colors hover:border-foreground"
          >
            ← Back
          </button>
          <button type="button"
            onClick={next}
            className="eyebrow border border-foreground bg-foreground px-7 py-3 text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background"
          >
            {step === total - 1 ? "Enter atelier" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Heading({ title, caption }: { title: string; caption: string }) {
  return (
    <div>
      <h1 className="font-display text-5xl leading-tight sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

function FieldText({
  title,
  caption,
  value,
  placeholder,
  onChange,
}: {
  title: string;
  caption: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Heading title={title} caption={caption} />
      <input
        autoFocus
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="font-display mt-14 w-full border-0 border-b border-border bg-transparent pb-3 text-4xl text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function FieldSwatch({
  title,
  caption,
  options,
  selected,
  onSelect,
}: {
  title: string;
  caption: string;
  options: { name: string; hex: string }[];
  selected?: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div>
      <Heading title={title} caption={caption} />
      <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {options.map((o) => {
          const active = selected === o.name;
          return (
            <button type="button"
              key={o.name}
              onClick={() => onSelect(o.name)}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span
                className="h-20 w-20 border transition-all"
                style={{
                  backgroundColor: o.hex,
                  borderColor: active ? "var(--gold)" : "var(--border)",
                  transform: active ? "scale(1.06)" : undefined,
                }}
              />
              <span
                className="eyebrow"
                style={active ? { color: "var(--gold)" } : undefined}
              >
                {o.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldChips({
  title,
  caption,
  options,
  selected,
  onToggle,
  single,
}: {
  title: string;
  caption: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
  single?: boolean;
}) {
  return (
    <div>
      <Heading title={title} caption={caption} />
      <div className="mt-14 flex flex-wrap gap-3">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button type="button"
              key={o}
              onClick={() => onToggle(o)}
              className="eyebrow border px-5 py-3 transition-all"
              style={{
                borderColor: active ? "var(--gold)" : "var(--border)",
                color: active ? "var(--gold)" : undefined,
              }}
            >
              {single && active ? "● " : ""}{o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldColors({
  title,
  caption,
  selected,
  onToggle,
}: {
  title: string;
  caption: string;
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <Heading title={title} caption={caption} />
      <div className="mt-14 flex flex-wrap gap-3">
        {COLOR_SWATCHES.map((c) => {
          const active = selected.includes(c.name);
          return (
            <button type="button"
              key={c.name}
              onClick={() => onToggle(c.name)}
              className="flex items-center gap-3 border px-3 py-2 transition-all"
              style={{ borderColor: active ? "var(--gold)" : "var(--border)" }}
            >
              <span
                className="h-6 w-6 border border-border"
                style={{ backgroundColor: c.hex }}
              />
              <span
                className="eyebrow"
                style={active ? { color: "var(--gold)" } : undefined}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
