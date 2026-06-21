import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/saved-address")({
  head: () => ({ meta: [{ title: "Stylar" }] }),
  component: SavedAddressPage,
});

type Address = {
  id: number;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  default: boolean;
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "Dasha Taran",
    line1: "24 Fashion Street",
    line2: "Apt 7B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (212) 555-0192",
    default: true,
  },
  {
    id: 2,
    label: "Studio",
    name: "Dasha Taran",
    line1: "88 Fifth Avenue",
    line2: "Floor 3",
    city: "New York",
    state: "NY",
    zip: "10011",
    country: "United States",
    phone: "+1 (212) 555-0477",
    default: false,
  },
];

function SavedAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  function setDefault(id: number) {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  }

  function remove(id: number) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg flex-1">Saved Address</h1>
        <button type="button" className="eyebrow text-[9px] text-gold hover:opacity-70">+ Add</button>
      </div>

      <div className="px-5 pt-5 space-y-3">
        {addresses.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-12">No saved addresses.</p>
        )}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border p-4 space-y-2 transition-colors"
            style={{ borderColor: addr.default ? "var(--gold)50" : "var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[8px]">{addr.label}</span>
                {addr.default && (
                  <span className="eyebrow text-[7px] border border-gold/40 text-gold px-1.5 py-0.5">Default</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="eyebrow text-[8px] text-muted-foreground hover:text-gold transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(addr.id)}
                  className="eyebrow text-[8px] text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground">{addr.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
              <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} {addr.zip}</p>
              <p className="text-xs text-muted-foreground">{addr.country}</p>
              <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>
            </div>
            {!addr.default && (
              <button
                type="button"
                onClick={() => setDefault(addr.id)}
                className="eyebrow text-[8px] text-muted-foreground hover:text-gold transition-colors"
              >
                Set as default
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="eyebrow w-full border border-dashed border-border py-4 text-[9px] text-muted-foreground hover:border-gold hover:text-gold transition-colors mt-2"
        >
          + Add New Address
        </button>
      </div>
    </div>
  );
}
