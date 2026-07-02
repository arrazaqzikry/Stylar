const LIKED_KEY = "stylar_liked";
const WARDROBE_KEY = "stylar_wardrobe";

export type WardrobeMap = Record<string, string[]>;

export function getLiked(): string[] {
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]"); }
  catch { return []; }
}

export function saveLiked(ids: string[]): void {
  localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
}

export function getWardrobeMap(): WardrobeMap {
  try { return JSON.parse(localStorage.getItem(WARDROBE_KEY) ?? "{}"); }
  catch { return {}; }
}

export function addToWardrobe(outfitId: string, keys: string[]): void {
  const map = getWardrobeMap();
  for (const key of keys) {
    if (!map[key]) map[key] = [];
    if (!map[key].includes(outfitId)) map[key].push(outfitId);
  }
  localStorage.setItem(WARDROBE_KEY, JSON.stringify(map));
}

export function removeFromWardrobeStore(outfitId: string, key: string): void {
  const map = getWardrobeMap();
  if (map[key]) map[key] = map[key].filter((id) => id !== outfitId);
  localStorage.setItem(WARDROBE_KEY, JSON.stringify(map));
}
