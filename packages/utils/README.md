# @shopifylabs/utils

Lightweight utility helpers for Shopify theme development. Fully typed, tree-shakeable, and zero dependencies.

---

## 📦 Installation

```bash
npm install @shopifylabs/utils
# or
pnpm add @shopifylabs/utils
# or
yarn add @shopifylabs/utils
```

---

## 📖 API Reference

### `debounce(fn, delay)`

Creates a debounced version of a function that delays invocation until after `delay` milliseconds have elapsed since the last call. Useful for search inputs, resize handlers, etc.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `fn` | `(...args) => void` | The function to debounce |
| `delay` | `number` | Delay in milliseconds |

**Returns:** `(...args) => void` — The debounced function

**Example:**

```ts
import { debounce } from '@shopifylabs/utils';

const handleSearch = debounce((query: string) => {
  fetch(`/search/suggest.json?q=${query}`);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

**Shopify use case:** Debounce predictive search input to avoid excessive API calls.

---

### `throttle(fn, limit)`

Creates a throttled version of a function that invokes at most once per `limit` milliseconds. Guarantees a trailing call if invoked during the cooldown.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `fn` | `(...args) => void` | The function to throttle |
| `limit` | `number` | Minimum interval in milliseconds |

**Returns:** `(...args) => void` — The throttled function

**Example:**

```ts
import { throttle } from '@shopifylabs/utils';

const handleScroll = throttle(() => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header?.classList.add('header--scrolled');
  } else {
    header?.classList.remove('header--scrolled');
  }
}, 100);

window.addEventListener('scroll', handleScroll);
```

**Shopify use case:** Throttle scroll events for sticky header behavior.

---

### `deepMerge(target, ...sources)`

Deeply merges two or more objects. Later sources override earlier ones. Arrays are replaced (not concatenated). Only plain objects are recursively merged.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `target` | `Record<string, unknown>` | The base object |
| `...sources` | `Partial<T>[]` | One or more source objects to merge |

**Returns:** `T` — The merged object

**Example:**

```ts
import { deepMerge } from '@shopifylabs/utils';

const defaults = {
  cart: {
    showQuantity: true,
    maxItems: 10,
  },
  theme: {
    color: 'dark',
  },
};

const userSettings = {
  cart: {
    maxItems: 5,
  },
};

const config = deepMerge(defaults, userSettings);
// Result:
// {
//   cart: { showQuantity: true, maxItems: 5 },
//   theme: { color: 'dark' }
// }
```

**Shopify use case:** Merge default section settings with user overrides from `section.settings`.

---

### `uniqueId(prefix?)`

Generates a unique string ID combining a sequential counter and timestamp. IDs are unique within the current runtime session.

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `prefix` | `string` | `"sl"` | Optional prefix for the ID |

**Returns:** `string` — A unique ID string (e.g., `"sl_1_m3k2f9"`)

**Example:**

```ts
import { uniqueId } from '@shopifylabs/utils';

const id1 = uniqueId();         // "sl_1_m3k2f9a"
const id2 = uniqueId('cart');   // "cart_2_m3k2f9b"
const id3 = uniqueId('item');   // "item_3_m3k2f9c"
```

**Shopify use case:** Generate unique IDs for dynamically created cart line items or section blocks.

---

## 🧩 Full Import

```ts
import { debounce, throttle, deepMerge, uniqueId } from '@shopifylabs/utils';
```

## 🌳 Tree-Shaking

Only the functions you import are included in your bundle:

```ts
// Only debounce is bundled — everything else is tree-shaken
import { debounce } from '@shopifylabs/utils';
```

---

## 📐 TypeScript

Full type definitions included. No `@types` package needed.

```ts
import { debounce } from '@shopifylabs/utils';

// Fully typed — fn signature is preserved
const debouncedLog = debounce((message: string, count: number) => {
  console.log(message, count);
}, 200);

debouncedLog('hello', 5); // ✅ typed
debouncedLog(123);         // ❌ type error
```

---

## 📄 License

MIT © ShopifyLabs
