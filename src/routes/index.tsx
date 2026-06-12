import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StylarNav } from "@/components/StylarNav";
import { OutfitCard } from "@/components/OutfitCard";
import {
  generateOutfit,
  loadProfile,
  loadSaved,
  OUTFITS,
  type Outfit,
  type Profile,
} from "@/lib/stylar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STYLAR — Your Personal AI Stylist" },
      {
        name: "description",
        content:
          "STYLAR is a private AI atelier that curates head-to-toe looks tailored to your body, climate and occasion.",
      },
      { property: "og:title", content: "STYLAR — Your Personal AI Stylist" },
      {
        property: "og:description",
        content: "An AI atelier curating editorial-grade outfits for the way you live.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [profile, setProfile] = useState<Profile>({});
  const [todays, setTodays] = useState<Outfit | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setTodays(generateOutfit({ intensity: 3 }, p));
    setSavedIds(loadSaved());
  }, []);

  const savedOutfits = useMemo(
    () => OUTFITS.filter((o) => savedIds.includes(o.id)).slice(0, 4),
    [savedIds],
  );

  return (
    <div className="min-h-screen">
      <StylarNav />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div className="animate-fade-up">
            <p className="eyebrow">House of Stylar · Edit N°XII</p>
            <h1 className="font-display mt-6 text-[15vw] leading-[0.95] sm:text-[7rem] lg:text-[9rem]">
              The art of
              <br />
              <span className="italic text-foreground/80">getting dressed.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
            A private atelier of one. Stylar studies your silhouette, palette and rhythm
            of life — then composes a wardrobe with the calm of a couturier.
          </p>
        </div>

        <div className="hairline mt-16 flex flex-wrap items-center justify-between gap-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <p className="eyebrow">
              {profile.completed ? "Atelier signed in" : "Profile awaiting"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/generate"
              className="eyebrow group flex items-center gap-3 border border-foreground bg-foreground px-6 py-4 text-primary-foreground transition-all hover:bg-gold hover:border-gold hover:text-background"
            >
              Compose a look
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            {!profile.completed && (
              <Link
                to="/onboarding"
                className="eyebrow border border-border px-6 py-4 transition-colors hover:border-gold hover:text-gold"
              >
                Begin profile
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* TODAY'S LOOK */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Chapter I</p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">Today's Look</h2>
          </div>
          <div className="hidden text-right text-xs text-muted-foreground sm:block">
            <p>Composed at dawn</p>
            <p className="font-mono mt-1">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {todays && <OutfitCard outfit={todays} />}
      </section>

      {/* WEATHER STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid gap-8 border-y border-border py-12 md:grid-cols-3">
          <div>
            <p className="eyebrow">Climate</p>
            <p className="font-display mt-2 text-3xl">14° · Overcast</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A day that asks for layered wool and softened leather.
            </p>
          </div>
          <div>
            <p className="eyebrow">Suggestion</p>
            <p className="font-display mt-2 text-3xl italic">Tonal layering</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Build warmth without weight — knit beneath structured wool.
            </p>
          </div>
          <div className="flex flex-col items-start justify-between">
            <div>
              <p className="eyebrow">Continue</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Refine today's composition with occasion, weather and intensity.
              </p>
            </div>
            <Link
              to="/generate"
              className="eyebrow mt-4 border border-border px-5 py-3 transition-colors hover:border-gold hover:text-gold"
            >
              Open studio →
            </Link>
          </div>
        </div>
      </section>

      {/* SAVED PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Chapter II</p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">Saved Looks</h2>
          </div>
          <Link
            to="/saved"
            className="eyebrow border-b border-border pb-1 hover:border-gold hover:text-gold"
          >
            View wardrobe →
          </Link>
        </div>

        {savedOutfits.length === 0 ? (
          <div className="border border-dashed border-border px-8 py-20 text-center">
            <p className="font-display text-3xl text-muted-foreground">
              Your wardrobe awaits its first look.
            </p>
            <Link
              to="/generate"
              className="eyebrow mt-8 inline-block border border-border px-6 py-3 hover:border-gold hover:text-gold"
            >
              Compose now
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {savedOutfits.map((o) => (
              <OutfitCard key={o.id} outfit={o} variant="compact" />
            ))}
          </div>
        )}
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="hairline flex flex-wrap items-center justify-between gap-4 pt-8">
          <p className="font-display text-xl tracking-[0.3em]">STYLAR</p>
          <p className="eyebrow">Personal atelier · MMXXVI</p>
        </div>
      </footer>
    </div>
  );
}
