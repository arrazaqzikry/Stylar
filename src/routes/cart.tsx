import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getCart, saveCart, saveCheckoutItems, type CartItem } from "@/lib/cart-store";

const _elMods = import.meta.glob("../../Element/**/*.{jpg,jpeg,webp,avif,png}", { eager: true }) as Record<string, { default: string }>;
const ELEMENT_IMAGE_POOL: string[] = Object.values(_elMods).map((m) => m.default);
function pickElement(seed: string): string {
  if (!ELEMENT_IMAGE_POOL.length) return "";
  const hash = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ELEMENT_IMAGE_POOL[Math.abs(hash) % ELEMENT_IMAGE_POOL.length];
}

function itemImage(item: CartItem): string {
  return item.img ?? pickElement(item.seed ?? "");
}

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Stylar · Cart" },
      { name: "description", content: "Your cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const [phoneScreen, setPhoneScreen] = useState<Element | null>(null);

  useEffect(() => {
    (document.querySelector(".phone-content") as HTMLElement | null)?.scrollTo({ top: 0 });
    setPhoneScreen(document.querySelector(".phone-screen"));
  }, []);

  const [items, setItems] = useState<CartItem[]>(() => getCart());
  const [selected, setSelected] = useState<Set<number>>(() => new Set(getCart().map((i) => i.id)));
  const [pendingRemove, setPendingRemove] = useState<CartItem | null>(null);

  function confirmRemove(item: CartItem) {
    setPendingRemove(item);
  }

  function executeRemove() {
    if (!pendingRemove) return;
    const id = pendingRemove.id;
    const nextItems = items.filter((i) => i.id !== id);
    saveCart(nextItems);
    setItems(nextItems);
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
    setPendingRemove(null);
  }

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleAll() {
    setSelected(selected.size === items.length ? new Set() : new Set(items.map((i) => i.id)));
  }

  const selectedItems = items.filter((i) => selected.has(i.id));
  const selectedTotal = selectedItems.reduce(
    (sum, i) => sum + parseInt(i.price.replace(/\D/g, ""), 10),
    0,
  );

  const brandGroups = items.reduce<Record<string, CartItem[]>>((acc, item) => {
    if (!acc[item.brand]) acc[item.brand] = [];
    acc[item.brand].push(item);
    return acc;
  }, {});
  const storeNames = Object.keys(brandGroups);
  const isMultiStore = storeNames.length > 1;

  function handleCheckout() {
    saveCheckoutItems(selectedItems);
    navigate({ to: "/checkout" });
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center gap-3">
        <p className="eyebrow text-[8px] text-muted-foreground/50">Your cart</p>
        <h2 className="font-display text-[1.8rem] leading-tight">Nothing here yet.</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Add items from the Studio or the For You page.
        </p>
        <div className="flex flex-col gap-2 w-full mt-4">
          <Link
            to="/generate"
            className="eyebrow w-full border border-foreground bg-foreground py-3 text-xs text-primary-foreground text-center block hover:bg-gold hover:border-gold hover:text-background transition-colors"
          >
            Open Studio
          </Link>
          <Link
            to="/saved"
            className="eyebrow w-full border border-border py-3 text-xs text-muted-foreground text-center block hover:border-gold hover:text-gold transition-colors"
          >
            Browse For You
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border flex-shrink-0">
        <Link
          to="/profile"
          className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors flex-shrink-0"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1 className="font-display text-lg flex-1">Cart</h1>
        <span className="eyebrow text-[9px] text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cross-store feature banner */}
      {isMultiStore && (
        <div className="mx-5 mt-4 border px-4 py-4" style={{ borderColor: "oklch(0.78 0.11 82 / 0.35)", background: "oklch(0.78 0.11 82 / 0.04)" }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold)", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p className="eyebrow text-[9px]" style={{ color: "var(--gold)" }}>Cross-Store Shopping</p>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--foreground)" }}>
            {storeNames.length} stores in one checkout —{" "}
            <span className="text-muted-foreground">{storeNames.join(", ")}</span>
          </p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Stylar curates across stores so you don't have to.</p>
        </div>
      )}

      {/* Select-all row */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 flex-shrink-0 mt-3">
        <button type="button" onClick={toggleAll} className="flex items-center gap-2.5">
          <Checkbox checked={selected.size === items.length && items.length > 0} indeterminate={selected.size > 0 && selected.size < items.length} />
          <span className="eyebrow text-[9px] text-muted-foreground">Select all</span>
        </button>
        {selected.size > 0 && (
          <span className="eyebrow text-[9px] text-gold">{selected.size} selected</span>
        )}
      </div>

      {/* Items — grouped by brand when multi-store */}
      <div className="flex-1 pb-36">
        {isMultiStore ? (
          Object.entries(brandGroups).map(([brand, brandItems]) => (
            <div key={brand}>
              {/* Store header */}
              <div
                className="flex items-center gap-3 px-5 py-2.5 border-b border-t border-border/50"
                style={{ background: "oklch(0.78 0.11 82 / 0.035)" }}
              >
                <div
                  className="h-5 w-5 flex items-center justify-center border flex-shrink-0 text-[8px] font-bold"
                  style={{ borderColor: "oklch(0.78 0.11 82 / 0.4)", background: "oklch(0.78 0.11 82 / 0.1)", color: "var(--gold)" }}
                >
                  {brand.charAt(0).toUpperCase()}
                </div>
                <span className="eyebrow text-[9px] tracking-widest" style={{ color: "var(--foreground)" }}>{brand}</span>
                <span className="eyebrow text-[7.5px] text-muted-foreground/50 ml-auto">
                  {brandItems.length} item{brandItems.length !== 1 ? "s" : ""}
                </span>
              </div>
              {/* Brand items */}
              <div className="divide-y divide-border/40">
                {brandItems.map((item) => <CartItemRow key={item.id} item={item} selected={selected} onToggle={toggleSelect} onRemove={confirmRemove} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="divide-y divide-border/40">
            {items.map((item) => <CartItemRow key={item.id} item={item} selected={selected} onToggle={toggleSelect} onRemove={confirmRemove} />)}
          </div>
        )}
      </div>

      {/* Sticky checkout bar — sits at the bottom of phone-content */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-5 py-4 flex-shrink-0 z-40">
        {selectedItems.length === 0 ? (
          <p className="eyebrow text-[9px] text-muted-foreground/50 text-center py-1">
            Select items to checkout
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow text-[9px] text-muted-foreground">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
              </span>
              <span className="font-mono text-sm">RM {selectedTotal}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background"
            >
              Checkout · {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
            </button>
          </>
        )}
      </div>

      {/* Remove confirmation sheet */}
      {pendingRemove && phoneScreen && createPortal(
        <div
          className="absolute inset-0 z-[9999] flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setPendingRemove(null)}
        >
          <div
            className="bg-background border-t border-border px-5 pt-5 pb-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 border border-border overflow-hidden flex-shrink-0">
                <img src={itemImage(pendingRemove)} alt={pendingRemove.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate leading-tight">{pendingRemove.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{pendingRemove.brand} · {pendingRemove.price}</p>
              </div>
            </div>
            <p className="font-display text-base mb-5">Remove from cart?</p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setPendingRemove(null)}
                className="eyebrow flex-1 border border-border py-3.5 text-[9px] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeRemove}
                className="eyebrow flex-1 border border-foreground bg-foreground py-3.5 text-[9px] text-primary-foreground hover:bg-destructive hover:border-destructive transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>,
        phoneScreen,
      )}
    </div>
  );
}

function CartItemRow({
  item,
  selected,
  onToggle,
  onRemove,
}: {
  item: CartItem;
  selected: Set<number>;
  onToggle: (id: number) => void;
  onRemove: (item: CartItem) => void;
}) {
  const isSelected = selected.has(item.id);
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 transition-colors"
      style={{ background: isSelected ? "oklch(0.78 0.11 82 / 0.04)" : "transparent" }}
    >
      <button type="button" onClick={() => onToggle(item.id)} className="flex-shrink-0">
        <Checkbox checked={isSelected} />
      </button>
      <div className="h-14 w-14 flex-shrink-0 border border-border overflow-hidden">
        <img src={itemImage(item)} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate leading-tight">{item.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{item.brand}</p>
        <p className="font-mono text-[11px] mt-1">{item.price}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(item)}
        className="flex-shrink-0 flex h-7 w-7 items-center justify-center text-muted-foreground/50 hover:text-destructive transition-colors"
        aria-label="Remove"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

function Checkbox({ checked, indeterminate = false }: { checked: boolean; indeterminate?: boolean }) {
  const active = checked || indeterminate;
  return (
    <div
      className="h-4 w-4 border flex items-center justify-center flex-shrink-0 transition-all"
      style={{
        borderColor: active ? "var(--gold)" : "var(--border)",
        background: active ? "oklch(0.78 0.11 82 / 0.12)" : "transparent",
      }}
    >
      {indeterminate ? (
        <span className="block h-0.5 w-2" style={{ background: "var(--gold)" }} />
      ) : checked ? (
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : null}
    </div>
  );
}
