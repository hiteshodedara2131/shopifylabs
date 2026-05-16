import { request } from "../fetch/request.js";

// ─── Shopify Cart Types ───────────────────────────────────────────────

export interface CartItem {
  id: number;
  quantity: number;
  properties?: Record<string, string>;
}

export interface CartLineItem {
  id: number;
  quantity: number;
  title: string;
  price: number;
  line_price: number;
  variant_id: number;
  product_id: number;
  image: string;
  url: string;
  properties: Record<string, string>;
}

export interface CartResponse {
  token: string;
  note: string | null;
  attributes: Record<string, string>;
  total_price: number;
  total_weight: number;
  item_count: number;
  items: CartLineItem[];
  requires_shipping: boolean;
  currency: string;
}

export interface CartAddResponse {
  items: CartLineItem[];
}

export interface CartUpdatePayload {
  updates: Record<number, number>;
}

// ─── Cart API ─────────────────────────────────────────────────────────

const CART_BASE = "/cart";

/**
 * Adds one or more items to the Shopify cart.
 *
 * @example
 * await add({ id: 123456, quantity: 1 })
 * await add({ id: 123456, quantity: 2, properties: { engraving: "Hello" } })
 */
export const add = async (
  item: CartItem | CartItem[]
): Promise<CartAddResponse> => {
  const items = Array.isArray(item) ? item : [item];
  return request<CartAddResponse>(`${CART_BASE}/add.js`, {
    method: "POST",
    body: { items },
  });
};

/**
 * Updates item quantities in the Shopify cart.
 *
 * @param updates - A map of variant ID → new quantity
 *
 * @example
 * await update({ 123456: 2, 789012: 0 })
 */
export const update = async (
  updates: Record<number, number>
): Promise<CartResponse> =>
  request<CartResponse>(`${CART_BASE}/update.js`, {
    method: "POST",
    body: { updates },
  });

/**
 * Clears the entire Shopify cart.
 */
export const clear = async (): Promise<CartResponse> =>
  request<CartResponse>(`${CART_BASE}/clear.js`, {
    method: "POST",
  });

/**
 * Fetches the current cart state.
 */
export const get = async (): Promise<CartResponse> =>
  request<CartResponse>(`${CART_BASE}.js`);
