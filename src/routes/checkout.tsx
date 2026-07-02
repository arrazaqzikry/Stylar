import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getCheckoutItems, removeItemsFromCart, clearCheckoutItems } from "@/lib/cart-store";

const _elMods = import.meta.glob("../../Element/**/*.{jpg,jpeg,webp,avif,png}", { eager: true }) as Record<string, { default: string }>;
const ELEMENT_IMAGE_POOL: string[] = Object.values(_elMods).map((m) => m.default);
function pickElement(seed: string): string {
  if (!ELEMENT_IMAGE_POOL.length) return "";
  const hash = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ELEMENT_IMAGE_POOL[Math.abs(hash) % ELEMENT_IMAGE_POOL.length];
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});


const PAYMENT_METHODS = [
  { id: "visa", label: "Visa", last4: "4242", icon: "💳" },
  { id: "apple", label: "Apple Pay", icon: "" },
  { id: "paypal", label: "PayPal", icon: "🅿" },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const [orderItems] = useState(getCheckoutItems);
  const [selectedPayment, setSelectedPayment] = useState("visa");

  useEffect(() => {
    if (orderItems.length === 0) navigate({ to: "/cart" });
  }, []);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [placed, setPlaced] = useState(false);

  const subtotal = orderItems.reduce((s, i) => s + parseInt(i.price.replace(/\D/g, ""), 10), 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.06);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping + tax - discount;

  function applyPromo() {
    if (promoCode.toLowerCase() === "ariana10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  }

  if (placed) {
    return (
      <div className="min-h-screen px-5 pb-12 animate-fade-up">
        {/* Top success badge */}
        <div className="pt-12 pb-8 text-center">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "oklch(0.78 0.11 82 / 0.12)", border: "1.5px solid var(--gold)" }}
          >
            <span style={{ color: "var(--gold)", fontSize: "1.6rem", lineHeight: 1 }}>✓</span>
          </div>
          <p className="eyebrow text-[9px] mb-1.5" style={{ color: "var(--gold)" }}>Order Confirmed</p>
          <h1 className="font-display text-[2rem] leading-tight">Order Placed!</h1>
          <p className="text-[11px] text-muted-foreground mt-1.5">#ST-2026-04891 · Jul 3, 2026</p>
        </div>

        {/* Tracking timeline */}
        <div className="border border-border px-5 py-5 mb-5">
          <p className="eyebrow text-[8px] mb-5" style={{ color: "var(--gold)" }}>Order Tracking</p>
          {([
            { label: "Order Confirmed", detail: "Jul 3 · 9:41am", done: true },
            { label: "Being Packed", detail: "Est. Jul 4", done: false },
            { label: "Shipped", detail: "Est. Jul 5", done: false },
            { label: "Delivered", detail: "Est. Jul 6 – 8", done: false },
          ] as const).map((step, i, arr) => (
            <div key={step.label} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <div
                  className="h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: step.done ? "var(--gold)" : "var(--border)",
                    background: step.done ? "var(--gold)" : "transparent",
                  }}
                >
                  {step.done && (
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--background)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="w-px my-1"
                    style={{ background: step.done ? "var(--gold)" : "var(--border)", minHeight: "28px" }}
                  />
                )}
              </div>
              <div className="pb-5">
                <p
                  className="text-[12px] leading-tight font-medium"
                  style={{ color: step.done ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping address */}
        <div className="border border-border px-5 py-4 mb-5">
          <p className="eyebrow text-[8px] mb-3 text-muted-foreground">Shipping to</p>
          <p className="text-sm text-foreground">Ariana Sofea</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">24 Fashion Street, Apt 7B</p>
          <p className="text-[11px] text-muted-foreground">New York, NY 10001</p>
        </div>

        <p className="text-[11px] text-muted-foreground text-center mb-8">
          Confirmation sent to{" "}
          <span style={{ color: "var(--gold)" }}>ariana@stylar.com</span>
        </p>

        <div className="flex flex-col gap-2.5">
          <Link
            to="/saved"
            className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground text-center block hover:bg-gold hover:border-gold hover:text-background transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="eyebrow w-full border border-border py-3.5 text-xs text-muted-foreground text-center block hover:border-gold hover:text-gold transition-colors"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/cart" className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <h1 className="font-display text-lg">Checkout</h1>
      </div>

      {/* Delivery Address */}
      <section className="px-5 py-5 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow">Delivery</p>
          <button type="button" className="eyebrow text-[9px] text-gold hover:opacity-70">
            Change
          </button>
        </div>
        <div className="border border-border p-4 space-y-1">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-gold text-sm">📍</span>
            <div>
              <p className="text-sm font-medium text-foreground">Ariana Sofea</p>
              <p className="text-xs text-muted-foreground mt-0.5">24 Fashion Street, Apt 7B</p>
              <p className="text-xs text-muted-foreground">New York, NY 10001, United States</p>
              <p className="text-xs text-muted-foreground">+1 (212) 555-0192</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border mt-2">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-[9px]">Standard Shipping</p>
              <p className="eyebrow text-[9px] text-gold">Free · 3–5 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="px-5 py-5 border-b border-border">
        <p className="eyebrow mb-3">Payment Method</p>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((pm) => (
            <button
              key={pm.id}
              type="button"
              onClick={() => setSelectedPayment(pm.id)}
              className="w-full flex items-center gap-3 border p-3.5 transition-all text-left"
              style={{
                borderColor: selectedPayment === pm.id ? "var(--gold)" : "var(--border)",
                backgroundColor: selectedPayment === pm.id ? "var(--gold)08" : "transparent",
              }}
            >
              <div
                className="h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: selectedPayment === pm.id ? "var(--gold)" : "var(--border)",
                }}
              >
                {selectedPayment === pm.id && (
                  <span className="h-2 w-2 rounded-full bg-gold block" />
                )}
              </div>
              <span className="text-sm">{pm.icon}</span>
              <span className="text-sm text-foreground flex-1">
                {pm.label}
                {pm.last4 && (
                  <span className="text-muted-foreground ml-1">···· {pm.last4}</span>
                )}
              </span>
              {selectedPayment === pm.id && (
                <span className="eyebrow text-[8px] text-gold">Selected</span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mt-2 eyebrow text-[9px] text-muted-foreground hover:text-gold transition-colors"
        >
          + Add new card
        </button>
      </section>

      {/* Order Summary */}
      <section className="px-5 py-5 border-b border-border">
        <p className="eyebrow mb-3">Order Summary</p>
        {orderItems.length === 0 ? (
          <p className="eyebrow text-[9px] text-muted-foreground/50 py-4 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 border border-border overflow-hidden">
                  <img src={item.img ?? pickElement(item.seed ?? "")} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                </div>
                <span className="font-mono text-sm flex-shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Promo Code */}
      <section className="px-5 py-5 border-b border-border">
        <p className="eyebrow mb-3">Promo Code</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError(false);
            }}
            placeholder="Enter code"
            className="flex-1 border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="button"
            onClick={applyPromo}
            className="eyebrow text-[9px] border border-border px-4 py-2 hover:border-gold hover:text-gold transition-colors"
          >
            Apply
          </button>
        </div>
        {promoApplied && (
          <p className="text-[10px] mt-1.5" style={{ color: "var(--gold)" }}>
            ✓ Code applied — 10% off
          </p>
        )}
        {promoError && (
          <p className="text-[10px] mt-1.5 text-destructive">
            Invalid promo code. Try ARIANA10.
          </p>
        )}
      </section>

      {/* Price breakdown */}
      <section className="px-5 py-5 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Subtotal</span>
          <span className="font-mono text-sm">RM {subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Shipping</span>
          <span className="font-mono text-sm text-gold">Free</span>
        </div>
        {promoApplied && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Discount (10%)</span>
            <span className="font-mono text-sm" style={{ color: "var(--gold)" }}>–RM {discount}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">SST (6%)</span>
          <span className="font-mono text-sm">RM {tax}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="eyebrow text-[10px]">Total</span>
          <span className="font-mono text-base font-medium">RM {total}</span>
        </div>
      </section>

      {/* Place order */}
      <section className="px-5 pt-5">
        <button
          type="button"
          onClick={() => { removeItemsFromCart(orderItems.map((i) => i.id)); clearCheckoutItems(); setPlaced(true); }}
          className="eyebrow w-full border border-foreground bg-foreground py-4 text-xs text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background"
        >
          Place Order · RM {total}
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          Your order is protected by STYLAR's Secure Checkout.<br />
          By placing an order you agree to our{" "}
          <Link to="/settings/terms-of-service" className="underline hover:text-gold">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
