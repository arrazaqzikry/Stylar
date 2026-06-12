import heroLook from "@/assets/hero-look.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import look4 from "@/assets/look-4.jpg";

export type Category =
  | "Casual"
  | "Streetwear"
  | "Formal"
  | "Business"
  | "Minimalist"
  | "Luxury"
  | "Sporty";

export type Occasion =
  | "Date night"
  | "Interview"
  | "University"
  | "Wedding"
  | "Casual outing"
  | "Business meeting";

export type Weather = "Hot" | "Mild" | "Cold" | "Rain";

export interface Profile {
  height?: string;
  weight?: string;
  skinTone?: string;
  styles?: Category[];
  favoriteColors?: string[];
  dislikedColors?: string[];
  budget?: string;
  completed?: boolean;
}

export interface OutfitItem {
  slot: "Top" | "Bottom" | "Outerwear" | "Shoes" | "Accessory";
  name: string;
  brand: string;
  price: string;
  link: string;
}

export interface Outfit {
  id: string;
  title: string;
  image: string;
  category: Category;
  occasions: Occasion[];
  weather: Weather[];
  intensity: number; // 1–5
  palette: { name: string; hex: string }[];
  story: string;
  insight: string;
  confidence: number; // 0–100
  items: OutfitItem[];
}

export const OUTFITS: Outfit[] = [
  {
    id: "the-quiet-architect",
    title: "The Quiet Architect",
    image: heroLook,
    category: "Minimalist",
    occasions: ["Business meeting", "Interview", "Date night"],
    weather: ["Mild", "Cold"],
    intensity: 4,
    palette: [
      { name: "Graphite", hex: "#2b2d31" },
      { name: "Onyx", hex: "#0d0d0f" },
      { name: "Ash", hex: "#7c7e83" },
    ],
    story:
      "A long charcoal coat anchors a column of black — a silhouette built for stillness and presence.",
    insight: "Vertical lines elongate proportion; cool tones complement neutral undertones.",
    confidence: 96,
    items: [
      { slot: "Outerwear", name: "Wool Overcoat", brand: "The Row", price: "$2,890", link: "#" },
      { slot: "Top", name: "Merino Turtleneck", brand: "Lemaire", price: "$420", link: "#" },
      { slot: "Bottom", name: "Pleated Wide Trouser", brand: "Studio Nicholson", price: "$510", link: "#" },
      { slot: "Shoes", name: "Leather Derby", brand: "Common Projects", price: "$540", link: "#" },
    ],
  },
  {
    id: "soft-cashmere-hours",
    title: "Soft Cashmere Hours",
    image: look2,
    category: "Luxury",
    occasions: ["Casual outing", "University", "Date night"],
    weather: ["Mild", "Cold"],
    intensity: 3,
    palette: [
      { name: "Cream", hex: "#efe8d8" },
      { name: "Sand", hex: "#c9b89a" },
      { name: "Bone", hex: "#e7dfd0" },
    ],
    story: "Tonal neutrals layered for quiet luxury — texture does the talking.",
    insight: "Warm cream lifts skin undertone; relaxed tailoring balances proportion.",
    confidence: 92,
    items: [
      { slot: "Top", name: "Brushed Cashmere Knit", brand: "Khaite", price: "$980", link: "#" },
      { slot: "Bottom", name: "Pleated Camel Trouser", brand: "Toteme", price: "$490", link: "#" },
      { slot: "Shoes", name: "Pointed Mule", brand: "Aeyde", price: "$320", link: "#" },
    ],
  },
  {
    id: "midnight-silk",
    title: "Midnight Silk",
    image: look3,
    category: "Formal",
    occasions: ["Wedding", "Date night", "Business meeting"],
    weather: ["Mild"],
    intensity: 5,
    palette: [
      { name: "Jet", hex: "#0a0a0c" },
      { name: "Champagne", hex: "#c9b48a" },
      { name: "Bronze", hex: "#806548" },
    ],
    story: "Structured tailoring meets liquid silk — a study in contrast.",
    insight: "Champagne against black creates editorial drama and frames the face.",
    confidence: 94,
    items: [
      { slot: "Top", name: "Single-Button Blazer", brand: "Saint Laurent", price: "$2,490", link: "#" },
      { slot: "Bottom", name: "Bias Silk Skirt", brand: "Anine Bing", price: "$390", link: "#" },
      { slot: "Shoes", name: "Strappy Heel", brand: "Manolo Blahnik", price: "$795", link: "#" },
      { slot: "Accessory", name: "Gold Cuff", brand: "Sophie Buhai", price: "$650", link: "#" },
    ],
  },
  {
    id: "city-uniform",
    title: "City Uniform",
    image: look4,
    category: "Streetwear",
    occasions: ["University", "Casual outing"],
    weather: ["Mild", "Rain"],
    intensity: 2,
    palette: [
      { name: "Camel", hex: "#b08a5a" },
      { name: "Indigo", hex: "#3b4a66" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "An oversized trench softens denim — easy proportions, considered colour.",
    insight: "Earth tones harmonise with warm undertones; relaxed fit reads modern, not heavy.",
    confidence: 89,
    items: [
      { slot: "Outerwear", name: "Cotton Trench", brand: "Burberry", price: "$2,190", link: "#" },
      { slot: "Top", name: "Heavyweight Tee", brand: "Lady White Co.", price: "$95", link: "#" },
      { slot: "Bottom", name: "Straight Leg Denim", brand: "AGOLDE", price: "$220", link: "#" },
      { slot: "Shoes", name: "Low Leather Sneaker", brand: "Veja", price: "$160", link: "#" },
    ],
  },
];

export const CATEGORIES: Category[] = [
  "Casual",
  "Streetwear",
  "Formal",
  "Business",
  "Minimalist",
  "Luxury",
  "Sporty",
];

export const OCCASIONS: Occasion[] = [
  "Date night",
  "Interview",
  "University",
  "Wedding",
  "Casual outing",
  "Business meeting",
];

export const WEATHERS: Weather[] = ["Hot", "Mild", "Cold", "Rain"];

export const SKIN_TONES = [
  { name: "Porcelain", hex: "#f3dcc4" },
  { name: "Ivory", hex: "#e8c4a0" },
  { name: "Honey", hex: "#c89674" },
  { name: "Caramel", hex: "#a3704a" },
  { name: "Bronze", hex: "#7a4d2e" },
  { name: "Espresso", hex: "#3e2418" },
];

export const COLOR_SWATCHES = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "Ivory", hex: "#f1ece2" },
  { name: "Camel", hex: "#b08a5a" },
  { name: "Charcoal", hex: "#2b2d31" },
  { name: "Olive", hex: "#5b5a3a" },
  { name: "Navy", hex: "#172033" },
  { name: "Burgundy", hex: "#4a1d24" },
  { name: "Sage", hex: "#8a9a82" },
  { name: "Rust", hex: "#8a4a2a" },
  { name: "Sand", hex: "#d8c8a8" },
];

export const BUDGETS = ["Under $200", "$200 – $600", "$600 – $1,500", "$1,500+"];

// ---------- storage helpers ----------
const PROFILE_KEY = "stylar.profile";
const SAVED_KEY = "stylar.saved";
const FEEDBACK_KEY = "stylar.feedback";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
  } catch {
    return {};
  }
}
export function saveProfile(p: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function loadSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}
export function toggleSaved(id: string): string[] {
  const cur = loadSaved();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}

export type Feedback = Record<string, "like" | "dislike" | undefined>;
export function loadFeedback(): Feedback {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "{}");
  } catch {
    return {};
  }
}
export function setFeedback(id: string, value: "like" | "dislike") {
  const cur = loadFeedback();
  cur[id] = cur[id] === value ? undefined : value;
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(cur));
  return cur;
}

// ---------- recommendation engine ----------
export interface GenerateInput {
  occasion?: Occasion;
  weather?: Weather;
  intensity: number;
  budget?: string;
}

export function generateOutfit(input: GenerateInput, profile: Profile): Outfit {
  const feedback = loadFeedback();
  const scored = OUTFITS.map((o) => {
    let score = 100 - Math.abs(o.intensity - input.intensity) * 12;
    if (input.occasion && o.occasions.includes(input.occasion)) score += 14;
    if (input.weather && o.weather.includes(input.weather)) score += 10;
    if (profile.styles?.includes(o.category)) score += 8;
    if (feedback[o.id] === "like") score += 6;
    if (feedback[o.id] === "dislike") score -= 30;
    return { o, score: score + Math.random() * 4 };
  }).sort((a, b) => b.score - a.score);

  const chosen = scored[0].o;
  return {
    ...chosen,
    confidence: Math.min(99, Math.max(72, Math.round(scored[0].score))),
  };
}

export function styleIntensityLabel(n: number) {
  return (
    [
      "Minimal",
      "Casual Clean",
      "Balanced Style",
      "Trend Focused",
      "High Fashion",
    ][Math.max(0, Math.min(4, n - 1))] || "Balanced Style"
  );
}
