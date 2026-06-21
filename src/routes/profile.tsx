import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { StylarNav } from "@/components/StylarNav";
import { OUTFITS, type Outfit } from "@/lib/stylar";
import dtPhoto from "@/FashionAsset/DT.webp";
// Saved looks
import fi3 from "@/FashionAsset/FI-3.avif";
import fi7 from "@/FashionAsset/FI-7.webp";
import fi11 from "@/FashionAsset/FI-11.jpg";
// Wardrobe looks
import fi1 from "@/FashionAsset/FI-1.jpg";
import fi4 from "@/FashionAsset/FI-4.jpg";
import fi6 from "@/FashionAsset/FI-6.avif";
import fi8 from "@/FashionAsset/FI-8.avif";
import fi13 from "@/FashionAsset/FI-13.webp";
import fi16 from "@/FashionAsset/FI-16.jpg";
import fi19 from "@/FashionAsset/FI-19.jpg";
import fi22 from "@/FashionAsset/FI-22.jpg";
import fi24 from "@/FashionAsset/FI-24.jpg";
// Generation history
import fi14 from "@/FashionAsset/FI-14.jpg";
import fi18 from "@/FashionAsset/FI-18.jpg";
import fi23 from "@/FashionAsset/FI-23.jpg";
// Cart & purchase history slot images
import top1 from "@/FashionAsset/top/top-1.jpg";
import top2 from "@/FashionAsset/top/top-2.avif";
import trousers1 from "@/FashionAsset/trousers/trousers-1.jpg";
import trousers2 from "@/FashionAsset/trousers/trousers-2.webp";
import trousers3 from "@/FashionAsset/trousers/trousers-3.webp";
import shoes1 from "@/FashionAsset/shoes/shoes-1.avif";
import shoes2 from "@/FashionAsset/shoes/shoes-2.jpg";
import shoes3 from "@/FashionAsset/shoes/shoes-3.jpg";

const SAVED_LOOK_IMAGES = [fi3, fi7, fi11];

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      { name: "description", content: "Your personal STYLAR atelier profile." },
    ],
  }),
  component: ProfilePage,
});

const SAVED_LOOKS = OUTFITS.filter((o) =>
  ["soft-cashmere-hours", "midnight-silk", "lecture-circuit"].includes(o.id),
);

const CART_ITEMS = [
  { id: 1, name: "Merino Blend Crewneck", brand: "Uniqlo", price: "RM 59", img: top1 },
  { id: 2, name: "Slim Straight Chino", brand: "COS", price: "RM 89", img: trousers1 },
  { id: 3, name: "Leather Low Trainer", brand: "Veja", price: "RM 160", img: shoes1 },
];

const WARDROBE_EDITS = ["Evening", "Office", "Weekend", "Travel", "Ceremony"];

type WardrobeLook = { img: string; title: string; desc: string; category: string };

const WARDROBE_LOOKS: Record<string, WardrobeLook[]> = {
  evening: [
    { img: fi1, title: "Riviera After Dark", desc: "Linen blazer over a silk cami and tailored shorts — resort-formal for warm evenings.", category: "Luxury" },
    { img: fi13, title: "Midnight Silk", desc: "Structured tailoring meets liquid silk — a study in contrast.", category: "Formal" },
  ],
  office: [
    { img: fi4, title: "Cool Authority", desc: "Elevated workwear anchored by a structured blazer and clean, uninterrupted lines.", category: "Business" },
    { img: fi16, title: "Power Neutral", desc: "Tonal layering in stone and slate — boardroom-ready, effortlessly.", category: "Business" },
  ],
  weekend: [
    { img: fi6, title: "Campus Ease", desc: "Soft volumes and washed tones — the weekend's starting line.", category: "Casual" },
    { img: fi19, title: "Sunday Wardrobe", desc: "Unhurried dressing in warm ivory and sand — a soft landing.", category: "Casual" },
  ],
  travel: [
    { img: fi8, title: "City Uniform", desc: "One palette, endless cities. A minimal uniform that travels without effort.", category: "Minimalist" },
    { img: fi22, title: "Wet Weekend", desc: "Technical meets minimal — rain-ready without the bulk.", category: "Casual" },
  ],
  ceremony: [
    { img: fi11, title: "Garden Ceremony", desc: "Soft florals and airy silhouettes — ceremony dressing that moves.", category: "Formal" },
    { img: fi24, title: "Ivory Occasion", desc: "Understated luxury in ivory and cream — the quiet confidence of occasion dressing.", category: "Luxury" },
  ],
};

const GEN_HISTORY = [
  { id: "g1", date: "Jun 20, 2026", style: "Formal", img: fi14, title: "The Evening Edit", desc: "A sharp tonal look composed for a formal dinner setting — tailored, restrained, powerful." },
  { id: "g2", date: "Jun 18, 2026", style: "Casual", img: fi18, title: "Weekend Soft", desc: "Effortless weekend dressing in warm neutrals. Curated for a casual coastal outing." },
  { id: "g3", date: "Jun 15, 2026", style: "Business", img: fi23, title: "The Architect", desc: "A structured silhouette in cool greys — composed for the modern workspace." },
];

type PurchaseOrder = {
  id: string;
  date: string;
  total: string;
  items: { name: string; brand: string; price: string; type: string; img: string }[];
};

const PURCHASE_HISTORY: PurchaseOrder[] = [
  {
    id: "ord-001",
    date: "Jun 15, 2026",
    total: "RM 308",
    items: [
      { name: "Leather Low Trainer", brand: "Veja", price: "RM 160", type: "Shoes", img: shoes1 },
      { name: "Slim Straight Chino", brand: "COS", price: "RM 89", type: "Bottom", img: trousers1 },
      { name: "Merino Crewneck", brand: "Uniqlo", price: "RM 59", type: "Top", img: top1 },
    ],
  },
  {
    id: "ord-002",
    date: "May 28, 2026",
    total: "RM 520",
    items: [
      { name: "Oxford Brogue", brand: "Church's", price: "RM 390", type: "Shoes", img: shoes2 },
      { name: "Tailored Trouser", brand: "COS", price: "RM 130", type: "Bottom", img: trousers2 },
    ],
  },
  {
    id: "ord-003",
    date: "May 10, 2026",
    total: "RM 1,150",
    items: [
      { name: "Strappy Sandal", brand: "By Far", price: "RM 380", type: "Shoes", img: shoes3 },
      { name: "Bias Silk Skirt", brand: "Anine Bing", price: "RM 390", type: "Bottom", img: trousers3 },
      { name: "Single-Button Blazer", brand: "Saint Laurent", price: "RM 380", type: "Top", img: top2 },
    ],
  },
];

const SETTINGS_GROUPS = [
  {
    title: "Account",
    items: [
      { label: "Identity Verification", sub: "Verify your identity", to: "/settings/identity-verification" },
      { label: "Saved Address", sub: "Delivery addresses", to: "/settings/saved-address" },
      { label: "Language", sub: "App language", to: "/settings/language" },
    ],
  },
  {
    title: "App Settings",
    items: [
      { label: "Notifications", sub: "Alerts & preferences", to: "/settings/notifications" },
      { label: "Appearance", sub: "Theme & display", to: "/settings/appearance" },
    ],
  },
  {
    title: "Earn Rewards",
    items: [
      { label: "Refer & Earn", sub: "Share & earn rewards", to: "/settings/refer-and-earn" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Centre", sub: "FAQs & support", to: "/settings/help-centre" },
      { label: "Contact Us", sub: "Reach our team", to: "/settings/contact-us" },
      { label: "Terms of Service", sub: "Legal terms", to: "/settings/terms-of-service" },
      { label: "Privacy Policy", sub: "Data & privacy", to: "/settings/privacy-policy" },
    ],
  },
] as const;

function ProfilePage() {
  const [cartItems, setCartItems] = useState(CART_ITEMS);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [selectedLook, setSelectedLook] = useState<{ outfit: Outfit; img: string } | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [openWardrobe, setOpenWardrobe] = useState<string | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseOrder | null>(null);
  const [phoneScreen, setPhoneScreen] = useState<Element | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: "Dasha Taran",
    username: "dashataran",
    email: "dasha@stylar.com",
    age: "24",
    height: "170 cm",
    weight: "55 kg",
    skinTone: "Light",
    bio: "Model · Fashion Enthusiast · Minimal Aesthetic",
  });
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPhoneScreen(document.querySelector(".phone-screen"));
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace(/\D/g, ""), 10);
  }, 0);

  function handleSaveProfile() {
    setSaveConfirmed(true);
    setTimeout(() => {
      setSaveConfirmed(false);
      setEditProfileOpen(false);
    }, 1800);
  }

  return (
    <div className="min-h-screen pb-8">
      <StylarNav />

      {/* ── Profile header ── */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-display text-2xl tracking-wide">Profile</h1>
          <Link
            to="/settings/appearance"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors text-lg"
            aria-label="Settings"
          >
            ☰
          </Link>
        </div>

        {/* Avatar + stats */}
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <div className="h-[72px] w-[72px] rounded-full border-2 border-gold/50 overflow-hidden">
              <img src={dtPhoto} alt="Dasha Taran" className="h-full w-full object-cover object-top" />
            </div>
            <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-gold border-2 border-background" />
          </div>
          <div className="flex flex-1 justify-around">
            <ProfileStat label="Saved" value="47" />
            <ProfileStat label="Adored" value="128" />
            <ProfileStat label="Generated" value="34" />
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 space-y-0.5">
          <p className="text-sm font-medium text-foreground">{profileForm.name}</p>
          <p className="text-xs text-muted-foreground">@{profileForm.username}</p>
          <p className="text-xs text-muted-foreground">{profileForm.bio}</p>
        </div>

        {/* Social connections */}
        <div className="flex gap-2 mt-4">
          <SocialBtn platform="instagram" />
          <SocialBtn platform="twitter" />
          <SocialBtn platform="threads" />
          <SocialBtn platform="facebook" />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 mt-2.5">
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="eyebrow flex-1 border border-border py-2.5 text-center text-xs transition-colors hover:border-gold hover:text-gold"
          >
            Edit Profile
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="eyebrow flex-1 border border-border py-2.5 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-gold flex items-center justify-center gap-1.5"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share Profile
          </button>
        </div>
      </div>

      {/* ── View Wardrobe ── */}
      <div className="border-t border-border px-5 py-4">
        <p className="eyebrow mb-3">View Wardrobe</p>
        <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
          {WARDROBE_EDITS.map((label) => (
            <button
              type="button"
              key={label}
              onClick={() => setOpenWardrobe(label.toLowerCase())}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div className="h-[52px] w-[52px] rounded-full border-2 border-gold/50 bg-secondary flex items-center justify-center hover:border-gold active:scale-95 transition-all">
                <span className="font-display text-sm text-gold">{label[0]}</span>
              </div>
              <span className="eyebrow text-[9px] text-muted-foreground">{label}</span>
            </button>
          ))}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="h-[52px] w-[52px] rounded-full border border-dashed border-border bg-transparent flex items-center justify-center">
              <span className="text-muted-foreground text-lg leading-none">+</span>
            </div>
            <span className="eyebrow text-[9px] text-muted-foreground">New</span>
          </div>
        </div>
      </div>

      {/* ── Style direction ── */}
      <div className="border-t border-border px-5 py-4">
        <p className="eyebrow mb-3">Style Direction</p>
        <div className="flex flex-wrap gap-2">
          {["Minimalist", "Luxury", "Elevated Basics", "Tonal"].map((tag) => (
            <span key={tag} className="border border-gold/40 px-3 py-1 text-[10px] eyebrow text-gold">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Saved looks grid ── */}
      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow">Saved Looks</p>
          <Link to="/saved" className="eyebrow text-gold hover:opacity-70 text-[10px]">
            Explore →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {SAVED_LOOKS.map((outfit, i) => {
            const img = SAVED_LOOK_IMAGES[i % SAVED_LOOK_IMAGES.length];
            return (
              <button
                type="button"
                key={outfit.id}
                onClick={() => setSelectedLook({ outfit, img })}
                className="group aspect-[3/4] overflow-hidden relative block w-full"
              >
                <img src={img} alt={outfit.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cart ── */}
      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow">Cart · {cartItems.length} items</p>
          <Link to="/checkout" className="eyebrow text-gold hover:opacity-70 text-[10px]">
            Checkout →
          </Link>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-11 w-11 flex-shrink-0 border border-border overflow-hidden">
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm">{item.price}</p>
                    <button
                      type="button"
                      onClick={() => setCartItems((prev) => prev.filter((c) => c.id !== item.id))}
                      className="text-[10px] text-muted-foreground hover:text-gold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="eyebrow">Total</span>
              <span className="font-mono text-sm">RM {cartTotal}</span>
            </div>
            <Link
              to="/checkout"
              className="eyebrow mt-3 w-full border border-foreground bg-foreground py-2.5 text-xs text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background block text-center"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>

      {/* ── Generation History ── */}
      <div className="border-t border-border px-5 py-4">
        <p className="eyebrow mb-3">Generation History</p>
        <div className="space-y-3">
          {GEN_HISTORY.map((item) => (
            <div key={item.id} className="flex gap-3 border border-border/50 p-2.5">
              <div className="w-14 h-[76px] flex-shrink-0 overflow-hidden">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="eyebrow text-[7px] text-gold border border-gold/40 px-1.5 py-0.5">{item.style}</span>
                    <span className="eyebrow text-[7px] text-muted-foreground/60">{item.date}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground leading-tight">{item.title}</p>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Purchase History ── */}
      <div className="border-t border-border px-5 py-4">
        <p className="eyebrow mb-3">Purchase History</p>
        <div className="space-y-2">
          {PURCHASE_HISTORY.map((order) => (
            <button
              type="button"
              key={order.id}
              onClick={() => setSelectedPurchase(order)}
              className="w-full flex items-center justify-between border border-border/50 px-3.5 py-3 hover:border-gold/40 transition-colors group text-left"
            >
              <div>
                <p className="text-sm text-foreground group-hover:text-gold transition-colors">
                  Order #{order.id}
                </p>
                <p className="eyebrow text-[8px] text-muted-foreground mt-0.5">
                  {order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-mono text-sm text-foreground">{order.total}</p>
                <span className="eyebrow text-[8px] text-gold">View →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Settings ── */}
      <div className="border-t border-border px-5 py-4">
        <p className="eyebrow mb-4">Settings</p>
        <div className="space-y-5">
          {SETTINGS_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="eyebrow text-[8px] text-gold/70 mb-1 px-0.5">{group.title}</p>
              <div className="divide-y divide-border/50 border border-border/50">
                {group.items.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="flex items-center justify-between px-3.5 py-3 group bg-secondary/30 hover:bg-secondary/60 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-foreground group-hover:text-gold transition-colors">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-gold transition-colors text-lg leading-none">›</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="eyebrow w-full flex items-center justify-center gap-2 border py-3 text-xs transition-colors"
            style={{ borderColor: "#c0392b40", color: "#e74c3c", background: "#e74c3c08" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#e74c3c18";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e74c3c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#e74c3c08";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b40";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="eyebrow text-[9px] text-muted-foreground/40">STYLAR v1.0 · Personal Atelier MMXXVI</p>
      </div>

      {/* ── Edit Profile (full-screen sheet) ── */}
      {editProfileOpen && phoneScreen && createPortal(
        <div className="absolute inset-x-0 bottom-0 z-[9999] flex flex-col bg-background overflow-y-auto animate-fade-up" style={{ top: "59px" }}>
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-background/95 backdrop-blur border-b border-border">
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <h2 className="font-display text-base">Edit Profile</h2>
            <span className="w-14" />
          </div>

          <div className="px-5 pt-5 pb-10 space-y-5">
            {(
              [
                { key: "name",     label: "Full Name", type: "text",   placeholder: "Your name" },
                { key: "username", label: "Username",  type: "text",   placeholder: "handle", prefix: "@" },
                { key: "email",    label: "Email",     type: "email",  placeholder: "you@example.com" },
                { key: "age",      label: "Age",       type: "number", placeholder: "e.g. 24" },
                { key: "height",   label: "Height",    type: "text",   placeholder: "e.g. 170 cm" },
                { key: "weight",   label: "Weight",    type: "text",   placeholder: "e.g. 55 kg" },
              ] as { key: keyof typeof profileForm; label: string; type: string; placeholder: string; prefix?: string }[]
            ).map(({ key, label, type, placeholder, prefix }) => (
              <div key={key}>
                <p className="eyebrow text-[9px] mb-1.5">{label}</p>
                <div className="flex items-center border border-border focus-within:border-gold transition-colors">
                  {prefix && (
                    <span className="pl-3 text-sm text-muted-foreground select-none">{prefix}</span>
                  )}
                  <input
                    type={type}
                    value={profileForm[key]}
                    onChange={(e) => setProfileForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                  />
                </div>
              </div>
            ))}

            {/* Skin Tone */}
            <div>
              <p className="eyebrow text-[9px] mb-1.5">Skin Tone</p>
              <div className="flex flex-wrap gap-2">
                {["Very Fair", "Fair", "Light", "Medium", "Tan", "Dark", "Deep"].map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setProfileForm((f) => ({ ...f, skinTone: tone }))}
                    className="border px-3 py-1.5 text-[10px] eyebrow transition-all"
                    style={{
                      borderColor: profileForm.skinTone === tone ? "var(--gold)" : "var(--border)",
                      color: profileForm.skinTone === tone ? "var(--gold)" : "var(--muted-foreground)",
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="eyebrow text-[9px] mb-1.5">Bio</p>
              <div className="border border-border focus-within:border-gold transition-colors">
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  placeholder="A short bio..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saveConfirmed}
              className="eyebrow w-full border border-foreground bg-foreground py-3.5 text-xs text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background disabled:opacity-60"
            >
              {saveConfirmed ? "✓ Changes Saved" : "Save Changes"}
            </button>
          </div>
        </div>,
        phoneScreen,
      )}

      {/* ── Wardrobe page (full-screen sheet) ── */}
      {openWardrobe && phoneScreen && createPortal(
        <div className="absolute inset-x-0 bottom-0 z-[9999] flex flex-col bg-background overflow-y-auto animate-fade-up" style={{ top: "59px" }}>
          <div className="sticky top-0 z-10 flex items-center gap-4 px-5 py-4 bg-background/95 backdrop-blur border-b border-border">
            <button
              type="button"
              onClick={() => setOpenWardrobe(null)}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <h2 className="font-display text-lg capitalize">{openWardrobe}</h2>
          </div>
          <div className="px-4 pt-4 pb-10 space-y-5">
            {(WARDROBE_LOOKS[openWardrobe] ?? []).map((look) => (
              <div key={look.title} className="border border-border overflow-hidden">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img src={look.img} alt={look.title} className="h-full w-full object-cover" />
                </div>
                <div className="px-4 py-4 space-y-2">
                  <span className="eyebrow text-[7px] border border-gold/40 text-gold px-1.5 py-0.5">
                    {look.category}
                  </span>
                  <p className="font-display text-xl leading-tight">{look.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{look.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>,
        phoneScreen,
      )}

      {/* ── Saved look detail popup ── */}
      {selectedLook && phoneScreen && createPortal(
        <div
          className="absolute inset-0 z-[9999] flex items-end"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelectedLook(null)}
        >
          <div
            className="w-full bg-background border-t border-border animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={selectedLook.img} alt={selectedLook.outfit.title} className="h-full w-full object-cover" />
            </div>
            <div className="px-5 pt-4 pb-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="eyebrow text-[8px] text-gold">{selectedLook.outfit.category}</span>
                  <h3 className="font-display text-[1.4rem] leading-tight mt-0.5">{selectedLook.outfit.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLook(null)}
                  className="flex-shrink-0 mt-1 flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold" />
                <p className="eyebrow text-[9px]">AI Confidence · {selectedLook.outfit.confidence}%</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedLook.outfit.story}</p>
              <div className="border-l-2 border-gold/50 pl-3">
                <p className="eyebrow text-[8px] mb-1">Why it works</p>
                <p className="text-sm italic text-foreground/80 leading-relaxed">"{selectedLook.outfit.insight}"</p>
              </div>
              <div className="flex items-center gap-4">
                {selectedLook.outfit.palette.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1.5">
                    <span className="h-6 w-6 border border-border" style={{ backgroundColor: c.hex }} />
                    <span className="text-[8px] text-muted-foreground">{c.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/saved"
                onClick={() => setSelectedLook(null)}
                className="eyebrow w-full border border-foreground bg-foreground py-3 text-xs text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background block text-center"
              >
                View Full Look →
              </Link>
            </div>
          </div>
        </div>,
        phoneScreen,
      )}

      {/* ── Purchase detail sheet ── */}
      {selectedPurchase && phoneScreen && createPortal(
        <div
          className="absolute inset-0 z-[9999] flex items-end"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setSelectedPurchase(null)}
        >
          <div
            className="w-full bg-background border-t border-border animate-fade-up overflow-y-auto"
            style={{ maxHeight: "85%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-5 pb-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="eyebrow text-[8px] text-muted-foreground">Order #{selectedPurchase.id}</p>
                  <h3 className="font-display text-[1.3rem] leading-tight mt-0.5">Purchase Detail</h3>
                  <p className="eyebrow text-[8px] text-muted-foreground mt-1">{selectedPurchase.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPurchase(null)}
                  className="flex-shrink-0 mt-1 flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-3 mb-5">
                {selectedPurchase.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 border border-border/50 p-2.5">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-tight">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                      <span className="eyebrow text-[7px] text-muted-foreground/60">{item.type}</span>
                    </div>
                    <p className="font-mono text-sm flex-shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 mb-5">
                <span className="eyebrow">Total Paid</span>
                <span className="font-mono text-base">{selectedPurchase.total}</span>
              </div>

              <button
                type="button"
                className="eyebrow w-full border border-border py-3 text-xs text-muted-foreground hover:border-gold hover:text-gold transition-colors"
              >
                Request Return
              </button>
            </div>
          </div>
        </div>,
        phoneScreen,
      )}

      {/* ── Share Profile popup ── */}
      {shareOpen && phoneScreen && createPortal(
        <div
          className="absolute inset-0 z-[9999] flex items-end"
          style={{ background: "rgba(0,0,0,0.55)", top: "59px" }}
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full bg-background border-t border-border animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-5 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Share Profile</h3>
                <button
                  type="button"
                  onClick={() => setShareOpen(false)}
                  className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Copy link row */}
              <div className="flex items-center gap-3 border border-border px-3.5 py-2.5 mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-muted-foreground">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span className="flex-1 font-mono text-[11px] text-muted-foreground truncate">stylar.ai/@dashataran</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText("https://stylar.ai/@dashataran");
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="eyebrow text-[9px] flex-shrink-0 transition-colors"
                  style={{ color: copySuccess ? "var(--gold)" : "var(--muted-foreground)" }}
                >
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Platform grid */}
              <div className="grid grid-cols-4 gap-3">
                {([
                  { label: "Instagram", bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.7" fill="white" stroke="none"/>
                    </svg>
                  )},
                  { label: "WhatsApp", bg: "#25D366", icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                  )},
                  { label: "X", bg: "#000", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )},
                  { label: "Threads", bg: "#101010", icon: (
                    <svg width="14" height="16" viewBox="0 0 192 192" fill="white">
                      <path d="M96 0C43.0 0 0 43.0 0 96s43.0 96 96 96 96-43.0 96-96S149.0 0 96 0zm47.3 104.3c-.6 13.3-5.0 23.5-12.7 30.7-7.8 7.2-18.5 10.8-31.9 10.8-9.7 0-18.2-2.2-25.2-6.5a42.9 42.9 0 0 1-16.6-18.3c-3.7-7.9-5.5-17.0-5.5-27.0 0-10.2 1.9-19.4 5.7-27.4a43.8 43.8 0 0 1 16.7-18.7c7.1-4.5 15.6-6.8 25.2-6.8 12.0 0 21.5 3.0 28.1 8.9 6.6 5.9 10.3 14.3 11.0 24.8h-15.2c-.6-6.6-2.9-11.6-6.9-15.0-4.0-3.4-9.7-5.1-17.0-5.1-9.1 0-16.3 3.3-21.5 9.8-5.2 6.5-7.8 15.6-7.8 27.2 0 11.4 2.5 20.4 7.6 26.9 5.1 6.5 12.3 9.7 21.7 9.7 7.5 0 13.5-1.9 17.8-5.8 4.3-3.9 6.8-9.5 7.4-16.9H96v-12.6h47.8l-.5 11.3z"/>
                    </svg>
                  )},
                ] as { label: string; bg: string; icon: ReactNode }[]).map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
                  >
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ background: p.bg }}
                    >
                      {p.icon}
                    </div>
                    <span className="eyebrow text-[8px] text-muted-foreground">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        phoneScreen,
      )}

      {/* ── Logout confirmation ── */}
      {logoutOpen && phoneScreen && createPortal(
        <div className="absolute inset-0 z-[9999] flex items-end" style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="w-full bg-background border-t border-border px-6 pt-6 pb-8 space-y-4 animate-fade-up">
            <div className="text-center space-y-1.5">
              <h3 className="font-display text-[1.3rem]">Log out?</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                You'll need to sign back in to access your atelier.
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => setLogoutOpen(false)}
                className="eyebrow flex-1 border border-border py-3 text-xs text-muted-foreground hover:border-gold hover:text-gold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { setLogoutOpen(false); navigate({ to: "/login" }); }}
                className="eyebrow flex-1 border border-foreground bg-foreground py-3 text-xs text-primary-foreground hover:bg-destructive hover:border-destructive transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>,
        phoneScreen,
      )}
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-[1.6rem] leading-none text-foreground">{value}</p>
      <p className="eyebrow mt-1 text-[9px]">{label}</p>
    </div>
  );
}

const SOCIAL_META = {
  instagram: {
    label: "IG",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  twitter: {
    label: "X",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  threads: {
    label: "Threads",
    icon: (
      <svg width="12" height="14" viewBox="0 0 192 192" fill="currentColor">
        <path d="M96 0C43.0 0 0 43.0 0 96s43.0 96 96 96 96-43.0 96-96S149.0 0 96 0zm47.3 104.3c-.6 13.3-5.0 23.5-12.7 30.7-7.8 7.2-18.5 10.8-31.9 10.8-9.7 0-18.2-2.2-25.2-6.5a42.9 42.9 0 0 1-16.6-18.3c-3.7-7.9-5.5-17.0-5.5-27.0 0-10.2 1.9-19.4 5.7-27.4a43.8 43.8 0 0 1 16.7-18.7c7.1-4.5 15.6-6.8 25.2-6.8 12.0 0 21.5 3.0 28.1 8.9 6.6 5.9 10.3 14.3 11.0 24.8h-15.2c-.6-6.6-2.9-11.6-6.9-15.0-4.0-3.4-9.7-5.1-17.0-5.1-9.1 0-16.3 3.3-21.5 9.8-5.2 6.5-7.8 15.6-7.8 27.2 0 11.4 2.5 20.4 7.6 26.9 5.1 6.5 12.3 9.7 21.7 9.7 7.5 0 13.5-1.9 17.8-5.8 4.3-3.9 6.8-9.5 7.4-16.9H96v-12.6h47.8l-.5 11.3z"/>
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
} as const;

function SocialBtn({ platform }: { platform: keyof typeof SOCIAL_META }) {
  const meta = SOCIAL_META[platform];
  return (
    <button type="button" className="flex-1 flex flex-col items-center gap-1 group">
      <div className="h-9 w-9 rounded-full border-2 border-border bg-secondary text-muted-foreground flex items-center justify-center transition-all group-hover:border-gold group-hover:text-gold group-hover:bg-gold/10 active:scale-90">
        {meta.icon}
      </div>
      <span className="eyebrow text-[7px] text-muted-foreground group-hover:text-gold transition-colors">
        {meta.label}
      </span>
    </button>
  );
}
