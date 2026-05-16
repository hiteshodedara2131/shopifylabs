# @shopifylabs/dom

Lightweight DOM manipulation utilities for Shopify themes. Typed, tree-shakeable, ESM only, and zero dependencies.

---

## 📦 Installation

```bash
npm install @shopifylabs/dom
# or
pnpm add @shopifylabs/dom
# or
yarn add @shopifylabs/dom
```

---

## 📖 API Reference

### Query

#### `$(selector, context?)`

Selects the **first** element matching the given CSS selector. Returns `null` if no match is found.

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `selector` | `string` | — | CSS selector string |
| `context` | `Document \| HTMLElement` | `document` | Scope to search within |

**Returns:** `T | null`

**Example:**

```ts
import { $ } from '@shopifylabs/dom';

const addToCartBtn = $<HTMLButtonElement>('[data-add-to-cart]');
const price = $<HTMLSpanElement>('.product__price');

// Scoped query — search within a specific element
const section = $('[data-section="featured"]');
if (section) {
  const heading = $<HTMLHeadingElement>('h2', section);
}
```

---

#### `$all(selector, context?)`

Selects **all** elements matching the given CSS selector. Returns a real `Array` (not a NodeList) for easy iteration with `.map()`, `.filter()`, etc.

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `selector` | `string` | — | CSS selector string |
| `context` | `Document \| HTMLElement` | `document` | Scope to search within |

**Returns:** `T[]`

**Example:**

```ts
import { $all } from '@shopifylabs/dom';

// Get all product cards
const cards = $all<HTMLDivElement>('.product-card');

cards.forEach(card => {
  card.classList.add('product-card--loaded');
});

// Filter only visible items
const visibleItems = $all('.cart-item').filter(
  item => !item.hasAttribute('hidden')
);
```

---

### Events

#### `on(eventName, selectorOrElement, handler, options?)`

Attaches an event listener with two modes:

1. **Delegated** (pass a CSS selector string) — listens on `document` and matches the selector via `.closest()`. Perfect for dynamically added elements.
2. **Direct** (pass an HTMLElement) — binds directly to the element.

**Returns a cleanup function** to remove the listener.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `eventName` | `string` | DOM event name (e.g., `'click'`, `'input'`) |
| `selectorOrElement` | `string \| HTMLElement` | CSS selector for delegation, or element for direct binding |
| `handler` | `(event: T) => void` | Event handler callback |
| `options?` | `AddEventListenerOptions` | Optional listener options |

**Returns:** `() => void` — Cleanup function

**Example:**

```ts
import { on } from '@shopifylabs/dom';

// Delegated event — works even if .add-to-cart buttons are added later
const cleanup = on('click', '.add-to-cart', (e) => {
  e.preventDefault();
  const variantId = e.target.closest('[data-variant-id]')?.dataset.variantId;
  console.log('Adding variant:', variantId);
});

// Direct binding
const form = document.querySelector('form');
if (form) {
  const removeListener = on('submit', form, (e) => {
    e.preventDefault();
    // handle form
  });

  // Later, remove the listener
  removeListener();
}

// Cleanup delegated listener when no longer needed
cleanup();
```

**Shopify use case:** Delegate click events for AJAX add-to-cart buttons that are dynamically rendered by Liquid.

---

#### `off(element, eventName, handler, options?)`

Removes an event listener from an element. For most use cases, prefer the cleanup function returned by `on()`.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `element` | `HTMLElement \| Document` | Target element |
| `eventName` | `string` | DOM event name |
| `handler` | `EventListener` | The handler to remove |
| `options?` | `EventListenerOptions` | Optional listener options |

**Example:**

```ts
import { off } from '@shopifylabs/dom';

const handler = () => console.log('clicked');
button.addEventListener('click', handler);

// Later
off(button, 'click', handler);
```

---

### Manipulation

#### `replace(selector, html)`

Replaces the `innerHTML` of the first element matching the selector.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `selector` | `string` | CSS selector to find the element |
| `html` | `string` | HTML string to set as innerHTML |

**Returns:** `HTMLElement | null` — The updated element, or null if not found

**Example:**

```ts
import { replace } from '@shopifylabs/dom';

// Update cart count badge
replace('[data-cart-count]', '<span>3</span>');

// Replace cart drawer contents after AJAX update
const cartHtml = await fetchCartHTML();
replace('#cart-drawer-content', cartHtml);
```

**Shopify use case:** Update cart drawer or mini-cart HTML after an AJAX cart operation.

---

#### `append(selector, html)`

Appends HTML content to the end of the first element matching the selector. Uses `insertAdjacentHTML` for performance.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `selector` | `string` | CSS selector to find the element |
| `html` | `string` | HTML string to append |

**Returns:** `HTMLElement | null` — The updated element, or null if not found

**Example:**

```ts
import { append } from '@shopifylabs/dom';

// Append a new product card to the grid
append('.product-grid', `
  <div class="product-card">
    <h3>New Product</h3>
    <span class="price">$29.99</span>
  </div>
`);

// Append notification
append('#notifications', `
  <div class="toast toast--success">Item added to cart!</div>
`);
```

---

#### `create(tag, attributes?, innerHTML?)`

Creates a new DOM element with optional attributes and inner HTML.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `tag` | `string` | HTML tag name (e.g., `'div'`, `'button'`) |
| `attributes?` | `Record<string, string>` | Key/value pairs for element attributes |
| `innerHTML?` | `string` | Optional HTML content for the element |

**Returns:** `T` — The newly created element

**Example:**

```ts
import { create } from '@shopifylabs/dom';

// Create a loading spinner
const spinner = create('div', {
  class: 'spinner',
  'aria-label': 'Loading',
  role: 'status',
});

// Create a notification with content
const toast = create('div', {
  class: 'toast toast--success',
  'data-auto-dismiss': '3000',
}, 'Item added to cart!');

document.body.appendChild(toast);
```

---

## 🧩 Full Import

```ts
import { $, $all, on, off, replace, append, create } from '@shopifylabs/dom';
```

## 🌳 Tree-Shaking

```ts
// Only $ and on are bundled
import { $, on } from '@shopifylabs/dom';
```

---

## 📐 TypeScript

Generic type parameters for typed element queries:

```ts
import { $ } from '@shopifylabs/dom';

// Returns HTMLButtonElement | null
const btn = $<HTMLButtonElement>('button.submit');

// Returns HTMLInputElement | null
const input = $<HTMLInputElement>('input[name="email"]');
```

---

## 📄 License

MIT © ShopifyLabs
