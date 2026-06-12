import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StylarNav } from "@/components/StylarNav";
import { OutfitCard } from "@/components/OutfitCard";
import { loadFeedback, loadSaved, OUTFITS } from "@/lib/stylar";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "The Wardrobe — STYLAR" },
      {
        name: "description",
        content: "Your private collection of saved looks, organised with editorial precision.",
      },
    ],
  }),
  component: Saved,
});

function Saved() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [fbCount, setFbCount] = useState({ likes: 0, looks: 0 });

  useEffect(() => {
    setSavedIds(loadSaved());
    const fb = loadFeedback();
    setFbCount({
      likes: Object.values(fb).filter((v) => v === "like").length,
      looks: Object.keys(fb).length,
    });
  }, []);

  const saved = OUTFITS.filter((o) => savedIds.includes(o.id));

  return (
    <div className="min-h-screen">
      <StylarNav />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-10 sm:pt-20">
        <p className="eyebrow">The Wardrobe</p>
        <h1 className="font-display mt-4 text-5xl leading-[1] sm:text-7xl">
          Your saved looks.
        </h1>
        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          A quiet archive of the silhouettes you've chosen. Stylar studies these to refine
          every future composition.
        </p>
      </section>

      {/* insights */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="hairline grid gap-8 border-y border-border py-10 md:grid-cols-3">
          <Stat label="Saved looks" value={saved.length.toString().padStart(2, "0")} />
          <Stat label="Adored" value={fbCount.likes.toString().padStart(2, "0")} />
          <Stat
            label="Style direction"
            value={
              saved.length === 0
                ? "—"
                : majority(saved.map((s) => s.category))
            }
            small
          />
        </div>
        {saved.length > 1 && (
          <p className="mt-6 text-sm italic text-muted-foreground">
            “Your wardrobe is trending toward{" "}
            <span className="text-gold">{majority(saved.map((s) => s.category)).toLowerCase()}</span>{" "}
            silhouettes.”
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        {saved.length === 0 ? (
          <div className="border border-dashed border-border px-8 py-24 text-center">
            <p className="font-display text-3xl text-muted-foreground">
              Your wardrobe awaits its first look.
            </p>
            <Link
              to="/generate"
              className="eyebrow mt-8 inline-block border border-foreground bg-foreground px-6 py-3 text-primary-foreground hover:bg-gold hover:border-gold hover:text-background"
            >
              Compose now
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((o) => (
              <Link key={o.id} to="/generate">
                <OutfitCard outfit={o} variant="compact" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p
        className="font-display mt-2"
        style={{ fontSize: small ? "1.75rem" : "3rem", lineHeight: 1 }}
      >
        {value}
      </p>
    </div>
  );
}

function majority(arr: string[]): string {
  const counts: Record<string, number> = {};
  for (const a of arr) counts[a] = (counts[a] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
}
