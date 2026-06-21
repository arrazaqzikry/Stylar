import heroLook from "@/assets/hero-look.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import look4 from "@/assets/look-4.jpg";
import { supabase, getSessionId } from "@/lib/supabase";

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
  // ── DATE NIGHT ────────────────────────────────────────────────────────────
  {
    id: "riviera-after-dark",
    title: "Riviera After Dark",
    image: look3,
    category: "Luxury",
    occasions: ["Date night"],
    weather: ["Hot"],
    intensity: 4,
    palette: [
      { name: "Sand", hex: "#d8c8a8" },
      { name: "Bronze", hex: "#7a4d2e" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "Linen blazer over a silk cami and tailored shorts — resort-formal for warm evenings.",
    insight: "Warm neutrals reflect evening light beautifully; breathable fabrics keep composure past midnight.",
    confidence: 91,
    items: [
      { slot: "Outerwear", name: "Linen Blazer", brand: "Theory", price: "$495", link: "#" },
      { slot: "Top", name: "Silk Cami", brand: "Vince", price: "$195", link: "#" },
      { slot: "Bottom", name: "Wide-Leg Linen Short", brand: "Toteme", price: "$320", link: "#" },
      { slot: "Shoes", name: "Strappy Sandal", brand: "By Far", price: "$380", link: "#" },
    ],
  },
  {
    id: "midnight-silk",
    title: "Midnight Silk",
    image: look3,
    category: "Formal",
    occasions: ["Date night"],
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
    id: "velvet-rendezvous",
    title: "Velvet Rendezvous",
    image: heroLook,
    category: "Luxury",
    occasions: ["Date night"],
    weather: ["Cold"],
    intensity: 4,
    palette: [
      { name: "Burgundy", hex: "#4a1d24" },
      { name: "Onyx", hex: "#0d0d0f" },
      { name: "Rose Gold", hex: "#c4a882" },
    ],
    story: "Deep velvet blazer over black — warmth wears well after dark.",
    insight: "Rich jewel tones elevate winter dressing; velvet adds texture without bulk.",
    confidence: 90,
    items: [
      { slot: "Top", name: "Velvet Blazer", brand: "Ralph Lauren", price: "$890", link: "#" },
      { slot: "Top", name: "Ribbed Silk Cami", brand: "Vince", price: "$195", link: "#" },
      { slot: "Bottom", name: "Slim Tailored Trouser", brand: "Equipment", price: "$290", link: "#" },
      { slot: "Shoes", name: "Heeled Ankle Boot", brand: "Isabel Marant", price: "$650", link: "#" },
    ],
  },
  {
    id: "storm-romance",
    title: "Storm Romance",
    image: heroLook,
    category: "Minimalist",
    occasions: ["Date night"],
    weather: ["Rain"],
    intensity: 4,
    palette: [
      { name: "Jet", hex: "#0a0a0c" },
      { name: "Slate", hex: "#4a4e5a" },
      { name: "Dove", hex: "#b0b2b8" },
    ],
    story: "A sleek belted trench over a column of black — romance that doesn't check the weather.",
    insight: "Monochrome dressing elongates the silhouette; water-resistant outerwear adds function without compromise.",
    confidence: 88,
    items: [
      { slot: "Outerwear", name: "Belted Trench", brand: "A.P.C.", price: "$680", link: "#" },
      { slot: "Top", name: "Ribbed Turtleneck", brand: "COS", price: "$120", link: "#" },
      { slot: "Bottom", name: "Tailored Straight Trouser", brand: "COS", price: "$150", link: "#" },
      { slot: "Shoes", name: "Chelsea Boot", brand: "Dr. Martens", price: "$200", link: "#" },
    ],
  },

  // ── INTERVIEW ─────────────────────────────────────────────────────────────
  {
    id: "cool-authority",
    title: "Cool Authority",
    image: heroLook,
    category: "Business",
    occasions: ["Interview"],
    weather: ["Hot"],
    intensity: 3,
    palette: [
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Sand", hex: "#d8c8a8" },
      { name: "Ash", hex: "#7c7e83" },
    ],
    story: "Lightweight linen tailoring in breathable neutrals — credible without the weight.",
    insight: "Loose-weave fabrics allow air circulation; neutral tones read polished under any office lighting.",
    confidence: 87,
    items: [
      { slot: "Outerwear", name: "Linen Blazer", brand: "COS", price: "$175", link: "#" },
      { slot: "Top", name: "Cotton Oxford Shirt", brand: "Everlane", price: "$88", link: "#" },
      { slot: "Bottom", name: "Linen Trouser", brand: "COS", price: "$130", link: "#" },
      { slot: "Shoes", name: "Leather Loafer", brand: "Mango", price: "$120", link: "#" },
    ],
  },
  {
    id: "the-quiet-architect",
    title: "The Quiet Architect",
    image: heroLook,
    category: "Minimalist",
    occasions: ["Interview"],
    weather: ["Mild"],
    intensity: 4,
    palette: [
      { name: "Graphite", hex: "#2b2d31" },
      { name: "Onyx", hex: "#0d0d0f" },
      { name: "Ash", hex: "#7c7e83" },
    ],
    story: "A long charcoal coat anchors a column of black — a silhouette built for stillness and presence.",
    insight: "Vertical lines elongate proportion; cool tones project quiet confidence in any room.",
    confidence: 96,
    items: [
      { slot: "Outerwear", name: "Wool Overcoat", brand: "The Row", price: "$2,890", link: "#" },
      { slot: "Top", name: "Merino Turtleneck", brand: "Lemaire", price: "$420", link: "#" },
      { slot: "Bottom", name: "Pleated Wide Trouser", brand: "Studio Nicholson", price: "$510", link: "#" },
      { slot: "Shoes", name: "Leather Derby", brand: "Common Projects", price: "$540", link: "#" },
    ],
  },
  {
    id: "frost-presence",
    title: "Frost Presence",
    image: heroLook,
    category: "Business",
    occasions: ["Interview"],
    weather: ["Cold"],
    intensity: 3,
    palette: [
      { name: "Charcoal", hex: "#2b2d31" },
      { name: "Cream", hex: "#efe8d8" },
      { name: "Midnight", hex: "#172033" },
    ],
    story: "Structured wool blazer over a fine knit — authority layered against the cold.",
    insight: "Wool provides insulation without sacrificing a polished silhouette; neutral tones read sharp.",
    confidence: 89,
    items: [
      { slot: "Outerwear", name: "Wool Blazer", brand: "Theory", price: "$590", link: "#" },
      { slot: "Top", name: "Fine Merino Crewneck", brand: "Uniqlo", price: "$80", link: "#" },
      { slot: "Bottom", name: "Tailored Trouser", brand: "COS", price: "$150", link: "#" },
      { slot: "Shoes", name: "Leather Oxford", brand: "Clarks", price: "$160", link: "#" },
    ],
  },
  {
    id: "grey-front",
    title: "Grey Front",
    image: look4,
    category: "Business",
    occasions: ["Interview"],
    weather: ["Rain"],
    intensity: 3,
    palette: [
      { name: "Graphite", hex: "#2b2d31" },
      { name: "Pearl", hex: "#e8e4de" },
      { name: "Ash", hex: "#7c7e83" },
    ],
    story: "Waterproof shell over sharp tailoring — nothing disrupts the first impression.",
    insight: "A technical outer layer protects investment pieces; the structured underlayer holds the look.",
    confidence: 86,
    items: [
      { slot: "Outerwear", name: "Waterproof Trench", brand: "Mackintosh", price: "$890", link: "#" },
      { slot: "Top", name: "Structured Blazer", brand: "COS", price: "$175", link: "#" },
      { slot: "Bottom", name: "Slim Trouser", brand: "Uniqlo", price: "$70", link: "#" },
      { slot: "Shoes", name: "Chelsea Boot", brand: "Thursday Boots", price: "$199", link: "#" },
    ],
  },

  // ── UNIVERSITY ────────────────────────────────────────────────────────────
  {
    id: "campus-ease",
    title: "Campus Ease",
    image: look4,
    category: "Casual",
    occasions: ["University"],
    weather: ["Hot"],
    intensity: 2,
    palette: [
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Camel", hex: "#b08a5a" },
      { name: "Sky", hex: "#8ab4c8" },
    ],
    story: "Breathable linen and cotton for long days between lectures — unfussy, intentional.",
    insight: "Natural fibres regulate body temperature; earth-toned accessories anchor a relaxed palette.",
    confidence: 85,
    items: [
      { slot: "Top", name: "Linen Camp Shirt", brand: "Uniqlo", price: "$40", link: "#" },
      { slot: "Bottom", name: "Relaxed Chino Short", brand: "Gap", price: "$50", link: "#" },
      { slot: "Shoes", name: "Canvas Low Sneaker", brand: "Veja", price: "$160", link: "#" },
      { slot: "Accessory", name: "Canvas Tote", brand: "L.L.Bean", price: "$30", link: "#" },
    ],
  },
  {
    id: "lecture-circuit",
    title: "Lecture Circuit",
    image: look2,
    category: "Casual",
    occasions: ["University"],
    weather: ["Mild"],
    intensity: 2,
    palette: [
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Indigo", hex: "#3b4a66" },
      { name: "Camel", hex: "#b08a5a" },
    ],
    story: "Relaxed zip hoodie over straight denim — campus comfort, quietly put together.",
    insight: "Tonal layering creates visual cohesion with minimal effort; clean sneakers elevate the basics.",
    confidence: 83,
    items: [
      { slot: "Top", name: "Zip Hoodie", brand: "Champion", price: "$70", link: "#" },
      { slot: "Bottom", name: "Straight Leg Denim", brand: "Levi's", price: "$98", link: "#" },
      { slot: "Shoes", name: "Leather Low Sneaker", brand: "Veja", price: "$160", link: "#" },
      { slot: "Accessory", name: "Crossbody Bag", brand: "Carhartt WIP", price: "$55", link: "#" },
    ],
  },
  {
    id: "study-layers",
    title: "Study Layers",
    image: look4,
    category: "Casual",
    occasions: ["University"],
    weather: ["Cold"],
    intensity: 2,
    palette: [
      { name: "Navy", hex: "#172033" },
      { name: "Cream", hex: "#efe8d8" },
      { name: "Camel", hex: "#b08a5a" },
    ],
    story: "Wool and cotton stacked for warmth without sacrificing the ease of a campus morning.",
    insight: "A puffer under a parka traps air efficiently; straight denim grounds the volume above.",
    confidence: 84,
    items: [
      { slot: "Outerwear", name: "Puffer Jacket", brand: "Patagonia", price: "$279", link: "#" },
      { slot: "Top", name: "Cable-Knit Sweater", brand: "Barbour", price: "$195", link: "#" },
      { slot: "Bottom", name: "Straight-Leg Denim", brand: "Levi's", price: "$98", link: "#" },
      { slot: "Shoes", name: "Wool-Lined Boot", brand: "Timberland", price: "$199", link: "#" },
    ],
  },
  {
    id: "city-uniform",
    title: "City Uniform",
    image: look4,
    category: "Streetwear",
    occasions: ["University"],
    weather: ["Rain"],
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

  // ── WEDDING ───────────────────────────────────────────────────────────────
  {
    id: "garden-ceremony",
    title: "Garden Ceremony",
    image: look3,
    category: "Formal",
    occasions: ["Wedding"],
    weather: ["Hot"],
    intensity: 5,
    palette: [
      { name: "Champagne", hex: "#c9b48a" },
      { name: "Blush", hex: "#e8c4b0" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "Linen suiting in warm neutrals — dressed for ceremony, not the heat.",
    insight: "Linen breathes in warmth; champagne tones flatter all skin tones in outdoor afternoon light.",
    confidence: 92,
    items: [
      { slot: "Top", name: "Ivory Linen Suit Jacket", brand: "Reiss", price: "$380", link: "#" },
      { slot: "Bottom", name: "Matching Linen Trouser", brand: "Reiss", price: "$220", link: "#" },
      { slot: "Shoes", name: "Woven Loafer", brand: "Tod's", price: "$595", link: "#" },
      { slot: "Accessory", name: "Silk Pocket Square", brand: "Drake's", price: "$75", link: "#" },
    ],
  },
  {
    id: "ivory-occasion",
    title: "Ivory Occasion",
    image: look3,
    category: "Formal",
    occasions: ["Wedding"],
    weather: ["Mild"],
    intensity: 5,
    palette: [
      { name: "Jet", hex: "#0a0a0c" },
      { name: "Champagne", hex: "#c9b48a" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "Classic tailoring in ivory — understated ceremony presence, maximum elegance.",
    insight: "Structured proportions photograph beautifully; neutral palette complements any wedding colour scheme.",
    confidence: 93,
    items: [
      { slot: "Top", name: "Single-Button Blazer", brand: "Brioni", price: "$2,490", link: "#" },
      { slot: "Bottom", name: "Tailored Dress Trouser", brand: "Brioni", price: "$890", link: "#" },
      { slot: "Shoes", name: "Oxford Brogue", brand: "Church's", price: "$650", link: "#" },
      { slot: "Accessory", name: "Silk Pocket Square", brand: "Drake's", price: "$75", link: "#" },
    ],
  },
  {
    id: "winter-ceremony",
    title: "Winter Ceremony",
    image: heroLook,
    category: "Formal",
    occasions: ["Wedding"],
    weather: ["Cold"],
    intensity: 5,
    palette: [
      { name: "Midnight", hex: "#172033" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Silver", hex: "#9b9fa8" },
    ],
    story: "Heavy wool suiting beneath a slim overcoat — ceremony-ready through the coldest aisle.",
    insight: "Dark suiting against white ceremony settings creates striking contrast; cashmere adds warmth without weight.",
    confidence: 91,
    items: [
      { slot: "Outerwear", name: "Slim Cashmere Overcoat", brand: "Canali", price: "$1,890", link: "#" },
      { slot: "Top", name: "Wool Suit Jacket", brand: "Suitsupply", price: "$599", link: "#" },
      { slot: "Bottom", name: "Matching Suit Trouser", brand: "Suitsupply", price: "$249", link: "#" },
      { slot: "Shoes", name: "Oxford", brand: "Church's", price: "$650", link: "#" },
      { slot: "Accessory", name: "Silk Pocket Square", brand: "Drake's", price: "$75", link: "#" },
    ],
  },
  {
    id: "covered-vows",
    title: "Covered Vows",
    image: look3,
    category: "Formal",
    occasions: ["Wedding"],
    weather: ["Rain"],
    intensity: 5,
    palette: [
      { name: "Slate", hex: "#4a4e5a" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Bronze", hex: "#806548" },
    ],
    story: "Double-breasted suiting under a slim waterproof shell — no weather delays the look.",
    insight: "Waterproof outerwear protects the suit; dark tones mask any rain marks on a formal day.",
    confidence: 88,
    items: [
      { slot: "Outerwear", name: "Waterproof Overcoat", brand: "Stutterheim", price: "$490", link: "#" },
      { slot: "Top", name: "Double-Breasted Suit Jacket", brand: "Suitsupply", price: "$699", link: "#" },
      { slot: "Bottom", name: "Matching Suit Trouser", brand: "Suitsupply", price: "$249", link: "#" },
      { slot: "Shoes", name: "Leather Oxford", brand: "Loake", price: "$390", link: "#" },
      { slot: "Accessory", name: "Silk Pocket Square", brand: "Drake's", price: "$75", link: "#" },
    ],
  },

  // ── CASUAL OUTING ─────────────────────────────────────────────────────────
  {
    id: "sundowner",
    title: "Sundowner",
    image: look4,
    category: "Casual",
    occasions: ["Casual outing"],
    weather: ["Hot"],
    intensity: 2,
    palette: [
      { name: "Sand", hex: "#d8c8a8" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Tan", hex: "#b08a5a" },
    ],
    story: "Linen and open silhouettes for a day with no agenda.",
    insight: "Lightweight natural fibres regulate heat; muted earth tones harmonise in outdoor afternoon light.",
    confidence: 85,
    items: [
      { slot: "Top", name: "Camp Collar Linen Shirt", brand: "Universal Works", price: "$120", link: "#" },
      { slot: "Bottom", name: "Relaxed Linen Short", brand: "COS", price: "$75", link: "#" },
      { slot: "Shoes", name: "Leather Sandal", brand: "Birkenstock", price: "$115", link: "#" },
      { slot: "Accessory", name: "Woven Bucket Hat", brand: "Brixton", price: "$45", link: "#" },
    ],
  },
  {
    id: "soft-cashmere-hours",
    title: "Soft Cashmere Hours",
    image: look2,
    category: "Luxury",
    occasions: ["Casual outing"],
    weather: ["Mild"],
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
    id: "sunday-wardrobe",
    title: "Sunday Wardrobe",
    image: look2,
    category: "Casual",
    occasions: ["Casual outing"],
    weather: ["Cold"],
    intensity: 2,
    palette: [
      { name: "Camel", hex: "#b08a5a" },
      { name: "Cream", hex: "#efe8d8" },
      { name: "Olive", hex: "#5b5a3a" },
    ],
    story: "A well-worn parka over a favourite knit — weekend errands done warmly.",
    insight: "Camel tones flatter most skin tones and read polished without effort in winter light.",
    confidence: 86,
    items: [
      { slot: "Outerwear", name: "Down Parka", brand: "Canada Goose", price: "$995", link: "#" },
      { slot: "Top", name: "Chunky Knit Sweater", brand: "Norse Projects", price: "$290", link: "#" },
      { slot: "Bottom", name: "Tapered Chino", brand: "Corridor", price: "$180", link: "#" },
      { slot: "Shoes", name: "Leather Chelsea", brand: "Thursday Boots", price: "$199", link: "#" },
    ],
  },
  {
    id: "wet-weekend",
    title: "Wet Weekend",
    image: look4,
    category: "Casual",
    occasions: ["Casual outing"],
    weather: ["Rain"],
    intensity: 2,
    palette: [
      { name: "Olive", hex: "#5b5a3a" },
      { name: "Sand", hex: "#d8c8a8" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "Waxed cotton over easy layers — functional without the fuss.",
    insight: "Waxed cotton repels water naturally; earth tones mask outdoor splashes.",
    confidence: 83,
    items: [
      { slot: "Outerwear", name: "Waxed Cotton Jacket", brand: "Barbour", price: "$445", link: "#" },
      { slot: "Top", name: "Striped Breton Tee", brand: "Saint James", price: "$120", link: "#" },
      { slot: "Bottom", name: "Relaxed Straight Denim", brand: "Levi's", price: "$98", link: "#" },
      { slot: "Shoes", name: "Rubber Chelsea Boot", brand: "Hunter", price: "$150", link: "#" },
    ],
  },

  // ── BUSINESS MEETING ──────────────────────────────────────────────────────
  {
    id: "summer-authority",
    title: "Summer Authority",
    image: heroLook,
    category: "Business",
    occasions: ["Business meeting"],
    weather: ["Hot"],
    intensity: 3,
    palette: [
      { name: "Stone", hex: "#c8bca8" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Ash", hex: "#7c7e83" },
    ],
    story: "Light wool trousers and a linen blazer — the boardroom breathes in the heat.",
    insight: "Light suiting reflects heat; breathable fabrics maintain composure through long days.",
    confidence: 87,
    items: [
      { slot: "Outerwear", name: "Linen Blazer", brand: "Sandro", price: "$395", link: "#" },
      { slot: "Top", name: "Cotton Shirt", brand: "Everlane", price: "$88", link: "#" },
      { slot: "Bottom", name: "Light Wool Trouser", brand: "Hugo Boss", price: "$220", link: "#" },
      { slot: "Shoes", name: "Leather Loafer", brand: "Carmina", price: "$390", link: "#" },
    ],
  },
  {
    id: "power-neutral",
    title: "Power Neutral",
    image: heroLook,
    category: "Business",
    occasions: ["Business meeting"],
    weather: ["Mild"],
    intensity: 3,
    palette: [
      { name: "Charcoal", hex: "#2b2d31" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Navy", hex: "#172033" },
    ],
    story: "Classic charcoal suiting — the silhouette that closes deals.",
    insight: "Charcoal reads authoritative in any light; classic proportions communicate competence.",
    confidence: 90,
    items: [
      { slot: "Top", name: "Charcoal Suit Jacket", brand: "Suitsupply", price: "$599", link: "#" },
      { slot: "Bottom", name: "Matching Trouser", brand: "Suitsupply", price: "$199", link: "#" },
      { slot: "Shoes", name: "Leather Oxford", brand: "Church's", price: "$650", link: "#" },
      { slot: "Accessory", name: "White Oxford Shirt", brand: "Thomas Pink", price: "$175", link: "#" },
    ],
  },
  {
    id: "winter-board",
    title: "Winter Board",
    image: heroLook,
    category: "Business",
    occasions: ["Business meeting"],
    weather: ["Cold"],
    intensity: 3,
    palette: [
      { name: "Midnight", hex: "#172033" },
      { name: "Ivory", hex: "#f1ece2" },
      { name: "Charcoal", hex: "#2b2d31" },
    ],
    story: "Heavy wool suiting beneath a cashmere overcoat — authority doesn't lose warmth.",
    insight: "Navy suiting under charcoal creates depth; cashmere adds luxury without bulk.",
    confidence: 89,
    items: [
      { slot: "Outerwear", name: "Cashmere Overcoat", brand: "Canali", price: "$2,490", link: "#" },
      { slot: "Top", name: "Wool Suit Jacket", brand: "Tom Ford", price: "$3,490", link: "#" },
      { slot: "Bottom", name: "Matching Suit Trouser", brand: "Tom Ford", price: "$1,290", link: "#" },
      { slot: "Shoes", name: "Leather Derby", brand: "John Lobb", price: "$1,490", link: "#" },
    ],
  },
  {
    id: "the-wet-deck",
    title: "The Wet Deck",
    image: look4,
    category: "Business",
    occasions: ["Business meeting"],
    weather: ["Rain"],
    intensity: 3,
    palette: [
      { name: "Graphite", hex: "#2b2d31" },
      { name: "Navy", hex: "#172033" },
      { name: "Ivory", hex: "#f1ece2" },
    ],
    story: "Slim suit under a waterproof shell — authority doesn't fold under weather.",
    insight: "A technical outer layer protects investment pieces; dark palette hides rain marks.",
    confidence: 86,
    items: [
      { slot: "Outerwear", name: "Waterproof Parka", brand: "Arc'teryx", price: "$750", link: "#" },
      { slot: "Top", name: "Slim Suit Jacket", brand: "COS", price: "$270", link: "#" },
      { slot: "Bottom", name: "Slim Suit Trouser", brand: "COS", price: "$150", link: "#" },
      { slot: "Shoes", name: "Chelsea Boot", brand: "Blundstone", price: "$210", link: "#" },
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

// ---------- storage helpers (Supabase-backed) ----------
export async function loadProfile(): Promise<Profile> {
  const sid = getSessionId();
  if (!sid) return {};
  try {
    const { data } = await supabase
      .from("profiles")
      .select("data")
      .eq("session_id", sid)
      .maybeSingle();
    return (data?.data as Profile) ?? {};
  } catch {
    return {};
  }
}

export async function saveProfile(p: Profile): Promise<void> {
  const sid = getSessionId();
  if (!sid) return;
  await supabase.from("profiles").upsert({
    session_id: sid,
    data: p,
    updated_at: new Date().toISOString(),
  });
}

export async function loadSaved(): Promise<string[]> {
  const sid = getSessionId();
  if (!sid) return [];
  try {
    const { data } = await supabase
      .from("saved_outfits")
      .select("outfit_id")
      .eq("session_id", sid);
    return (data ?? []).map((r) => r.outfit_id as string);
  } catch {
    return [];
  }
}

export async function toggleSaved(id: string, isSaved: boolean): Promise<void> {
  const sid = getSessionId();
  if (!sid) return;
  if (isSaved) {
    await supabase.from("saved_outfits").delete().eq("session_id", sid).eq("outfit_id", id);
  } else {
    await supabase.from("saved_outfits").insert({ session_id: sid, outfit_id: id });
  }
}

export type Feedback = Record<string, "like" | "dislike" | undefined>;

export async function loadFeedback(): Promise<Feedback> {
  const sid = getSessionId();
  if (!sid) return {};
  try {
    const { data } = await supabase
      .from("outfit_feedback")
      .select("outfit_id, value")
      .eq("session_id", sid);
    return Object.fromEntries((data ?? []).map((r) => [r.outfit_id, r.value])) as Feedback;
  } catch {
    return {};
  }
}

export async function setFeedback(
  id: string,
  value: "like" | "dislike",
  current?: "like" | "dislike",
): Promise<void> {
  const sid = getSessionId();
  if (!sid) return;
  if (current === value) {
    await supabase.from("outfit_feedback").delete().eq("session_id", sid).eq("outfit_id", id);
  } else {
    await supabase.from("outfit_feedback").upsert({
      session_id: sid,
      outfit_id: id,
      value,
      updated_at: new Date().toISOString(),
    });
  }
}

// ---------- recommendation engine ----------
export interface GenerateInput {
  occasion?: Occasion;
  weather?: Weather;
  intensity: number;
  budget?: string;
}

export function generateOutfit(
  input: GenerateInput,
  profile: Profile,
  feedback: Feedback = {},
): Outfit {
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

// ---------- Gen-Outfit (Supabase) ----------
export interface GenOutfit {
  id: string | number;
  name: string;
  style: string;
  price_range: string;
  filename: string;
  image_url: string;
}

export type GenStyle         = "Daily" | "Professional" | "Big Day";
export type GenPriceRange    = "Budget" | "Mid-Range" | "Luxury";
export type GenClimate       = "Hot" | "Mild" | "Cold";
export type GenStyleLevel    = "Minimal" | "Balanced" | "Mega";

export const GEN_STYLES: GenStyle[]             = ["Daily", "Professional", "Big Day"];
export const GEN_PRICE_RANGES: GenPriceRange[]  = ["Budget", "Mid-Range", "Luxury"];
export const GEN_CLIMATES: GenClimate[]         = ["Hot", "Mild", "Cold"];
export const GEN_DISABLED_CLIMATES: GenClimate[] = ["Mild", "Cold"];
export const GEN_STYLE_LEVELS: GenStyleLevel[]  = ["Minimal", "Balanced", "Mega"];

export async function fetchGenOutfit(
  style: GenStyle,
  priceRange: GenPriceRange,
  styleLevel: GenStyleLevel,
): Promise<GenOutfit | null> {
  const { data } = await supabase
    .from("Gen-Outfit")
    .select("*")
    .eq("occasion", style)
    .eq("price_range", priceRange)
    .eq("style", styleLevel.toLowerCase())
    .eq("gender", "Female");

  if (!data || data.length === 0) return null;
  return data[Math.floor(Math.random() * data.length)] as GenOutfit;
}
