import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import top1 from "@/FashionAsset/top/top-1.jpg";
import trousers1 from "@/FashionAsset/trousers/trousers-1.jpg";
import shoes1 from "@/FashionAsset/shoes/shoes-1.avif";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});

const ORDER_ITEMS = [
  { id: 1, name: "Merino Blend Crewneck", brand: "Uniqlo", price: 59, img: top1 },
  { id: 2, name: "Slim Straight Chino", brand: "COS", price: 89, img: trousers1 },
  { id: 3, name: "Leather Low Trainer", brand: "Veja", price: 160, img: shoes1 },
];

const PAYMENT_METHODS = [
  { id: "visa", label: "Visa", last4: "4242", icon: "💳" },
  { id: "apple", label: "Apple Pay", icon: "" },
  { id: "paypal", label: "PayPal", icon: "🅿" },
];

function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [placed, setPlaced] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price, 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.06);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping + tax - discount;

  function applyPromo() {
    if (promoCode.toLowerCase() === "dasha10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  }

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center animate-fade-up">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--gold)20", border: "2px solid var(--gold)" }}
        >
          <span style={{ color: "var(--gold)", fontSize: "2rem", lineHeight: 1 }}>✓</span>
        </div>
        <p className="eyebrow text-[9px] mb-2">Order Confirmed</p>
        <h1 className="font-display text-[2rem] leading-tight mb-2">Order Placed!</h1>
        <p className="text-xs text-muted-foreground mb-1">Order #ST-2026-04891</p>
        <p className="text-xs text-muted-foreground mb-6">Estimated delivery: Jun 23 – 25</p>
        <div className="border border-border px-5 py-4 mb-8 text-left w-full">
          <p className="eyebrow text-[9px] mb-3">Shipping to</p>
          <p className="text-sm text-foreground">Dasha Taran</p>
          <p className="text-xs text-muted-foreground mt-0.5">24 Fashion Street, Apt 7B</p>
          <p className="text-xs text-muted-foreground">New York, NY 10001</p>
        </div>
        <p className="text-xs text-muted-foreground mb-8">
          A confirmation has been sent to<br />
          <span style={{ color: "var(--gold)" }}>dasha@stylar.ai</span>
        </p>
        <Link
          to="/saved"
          className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground text-center block hover:bg-gold hover:border-gold hover:text-background transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors flex-shrink-0">
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
              <p className="text-sm font-medium text-foreground">Dasha Taran</p>
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
        <div className="space-y-3">
          {ORDER_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="h-12 w-12 flex-shrink-0 border border-border overflow-hidden">
                <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.brand}</p>
              </div>
              <span className="font-mono text-sm flex-shrink-0">RM {item.price}</span>
            </div>
          ))}
        </div>
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
            Invalid promo code. Try DASHA10.
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
          onClick={() => setPlaced(true)}
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
