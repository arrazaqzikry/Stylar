const CART_KEY = "stylar_cart";
const CHECKOUT_KEY = "stylar_checkout_items";

// Use an incrementing counter so bulk adds (Shop the Look) never share an ID,
// even when called multiple times in the same millisecond.
let _nextId = Date.now();

export type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: string;
  img?: string;   // direct URL (items added from generate page)
  seed?: string;  // element pool seed (pre-seeded default items)
};

const DEFAULT_CART: CartItem[] = [
  { id: 1, name: "Merino Blend Crewneck", brand: "Uniqlo", price: "RM 59", seed: "cart-merino-crewneck" },
  { id: 2, name: "Slim Straight Chino", brand: "COS", price: "RM 89", seed: "cart-slim-chino" },
  { id: 3, name: "Leather Low Trainer", brand: "Veja", price: "RM 160", seed: "cart-leather-trainer" },
];

export function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored === null) {
      localStorage.setItem(CART_KEY, JSON.stringify(DEFAULT_CART));
      return DEFAULT_CART;
    }
    return JSON.parse(stored);
  } catch {
    return DEFAULT_CART;
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "id">): void {
  const cart = getCart();
  if (cart.some((c) => c.name === item.name && c.brand === item.brand)) return;
  saveCart([...cart, { ...item, id: ++_nextId }]);
}

export function removeFromCartByName(name: string, brand: string): void {
  saveCart(getCart().filter((c) => !(c.name === name && c.brand === brand)));
}

export function isInCart(name: string, brand: string): boolean {
  return getCart().some((c) => c.name === name && c.brand === brand);
}

export function clearCart(): void {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
}

export function removeItemsFromCart(ids: number[]): void {
  saveCart(getCart().filter((c) => !ids.includes(c.id)));
}

// ── Checkout selection (items chosen for this purchase session) ──

export function getCheckoutItems(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(CHECKOUT_KEY) ?? "[]"); }
  catch { return []; }
}

export function saveCheckoutItems(items: CartItem[]): void {
  localStorage.setItem(CHECKOUT_KEY, JSON.stringify(items));
}

export function clearCheckoutItems(): void {
  localStorage.removeItem(CHECKOUT_KEY);
}
