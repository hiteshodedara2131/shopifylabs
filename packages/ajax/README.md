# @shopifylabs/ajax

A fully typed Shopify AJAX API wrapper. Built on native `fetch`, async/await, and designed for Shopify cart endpoints.

## Installation

```bash
npm install @shopifylabs/ajax
```

## API Reference

### Cart API

```ts
import { cart } from '@shopifylabs/ajax';
```

#### `cart.add(item)`

Adds one or more items to the Shopify cart.

```ts
// Single item
await cart.add({ id: 44012345, quantity: 1 });

// With line item properties
await cart.add({
  id: 44012345,
  quantity: 1,
  properties: { 'Engraving': 'Happy Birthday' },
});

// Multiple items
await cart.add([
  { id: 44012345, quantity: 1 },
  { id: 44012346, quantity: 2 },
]);
```

| Param | Type | Description |
|-------|------|-------------|
| `item` | `CartItem \| CartItem[]` | Single item or array |

#### `cart.update(updates)`

Updates item quantities. Set to `0` to remove.

```ts
await cart.update({
  44012345: 3,   // Set quantity to 3
  44012346: 0,   // Remove item
});
```

| Param | Type | Description |
|-------|------|-------------|
| `updates` | `Record<number, number>` | Variant ID to quantity map |

#### `cart.clear()`

Clears the entire cart.

```ts
await cart.clear();
```

#### `cart.get()`

Fetches the current cart state.

```ts
const currentCart = await cart.get();
console.log(`Items: ${currentCart.item_count}`);
console.log(`Total: $${(currentCart.total_price / 100).toFixed(2)}`);
```

### Low-Level Fetch

#### `request(url, options?)`

Lightweight fetch wrapper with JSON defaults. Available for custom Shopify API calls.

```ts
import { request } from '@shopifylabs/ajax';

const data = await request('/recommendations/products.json?product_id=123&limit=4');
const results = await request('/search/suggest.json?q=shirt');
```

## Types

```ts
interface CartItem {
  id: number;
  quantity: number;
  properties?: Record<string, string>;
}

interface CartResponse {
  token: string;
  note: string | null;
  attributes: Record<string, string>;
  total_price: number;       // In cents
  total_weight: number;
  item_count: number;
  items: CartLineItem[];
  requires_shipping: boolean;
  currency: string;
}

interface CartLineItem {
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
```

## Full Workflow Example

```ts
import { cart } from '@shopifylabs/ajax';

// Add to cart
await cart.add({ id: 44012345, quantity: 1 });

// Check cart
const current = await cart.get();
console.log(`${current.item_count} items`);

// Update quantity
await cart.update({ 44012345: 3 });

// Clear cart
await cart.clear();
```

## Error Handling

```ts
try {
  await cart.add({ id: 999999999, quantity: 1 });
} catch (error) {
  // "[ShopifyLabs] Request failed: 422 Unprocessable Entity — ..."
  console.error(error.message);
}
```

## License

MIT © ShopifyLabs
