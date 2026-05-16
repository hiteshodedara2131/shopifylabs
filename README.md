# ⚡ ShopifyLabs

A modular TypeScript toolkit for Shopify theme development. Lightweight, typed, tree-shakeable, and built for modern workflows.

---

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@shopifylabs/utils`](./packages/utils) | Utility helpers — debounce, throttle, deepMerge, uniqueId | `0.1.0` |
| [`@shopifylabs/dom`](./packages/dom) | DOM manipulation — query, events, manipulation | `0.1.0` |
| [`@shopifylabs/ajax`](./packages/ajax) | Shopify AJAX API — cart add, update, clear, fetch | `0.1.0` |
| [`@shopifylabs/cli`](./packages/cli) | CLI generator — scaffold Shopify section files | `0.1.0` |

---

## 🚀 Quick Start

### Install individual packages

```bash
npm install @shopifylabs/utils
npm install @shopifylabs/dom
npm install @shopifylabs/ajax
npm install @shopifylabs/cli
```

### Use in your Shopify theme

```js
import { debounce, throttle } from '@shopifylabs/utils';
import { $, on } from '@shopifylabs/dom';
import { cart } from '@shopifylabs/ajax';

// Debounced search input
const searchInput = $('[data-search-input]');
if (searchInput) {
  on('input', searchInput, debounce((e) => {
    console.log('Searching...', e.target.value);
  }, 300));
}

// Add to cart
await cart.add({ id: 44012345, quantity: 1 });
```

### Generate a section via CLI

```bash
npx @shopifylabs/cli create section hero-banner
```

This generates:
```
sections/hero-banner.liquid
assets/hero-banner.js
assets/hero-banner.css
```

---

## 🏗️ Monorepo Structure

```
shopifylabs/
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm workspace definition
├── turbo.json                # TurboRepo pipeline
├── tsconfig.base.json        # Shared TypeScript config
│
├── packages/
│   ├── utils/                # @shopifylabs/utils
│   ├── dom/                  # @shopifylabs/dom
│   ├── ajax/                 # @shopifylabs/ajax
│   └── cli/                  # @shopifylabs/cli
```

---

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Setup

```bash
git clone https://github.com/your-org/shopifylabs.git
cd shopifylabs
pnpm install
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm dev` | Watch mode for all packages |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm clean` | Remove all dist folders |

### Build a single package

```bash
pnpm --filter @shopifylabs/utils build
pnpm --filter @shopifylabs/dom build
pnpm --filter @shopifylabs/ajax build
pnpm --filter @shopifylabs/cli build
```

---

## 📐 Tech Stack

- **pnpm** — Fast workspace management
- **TurboRepo** — Parallel builds with caching
- **TypeScript** — Strict mode, full type safety
- **tsup** — Lightning-fast ESM bundling
- **ESM** — Modern module format, tree-shakeable

---

## 📄 Build Output

Each package produces:

```
dist/
├── index.js        # Minified ESM bundle
├── index.d.ts      # TypeScript declarations
└── index.js.map    # Source maps
```

---

## 🧠 Design Principles

- **Pure functions** — No classes, no `this` bindings
- **Tree-shakeable** — Import only what you use
- **Typed** — Full TypeScript with strict mode
- **Lightweight** — Zero unnecessary dependencies
- **Modular** — Each package is independently installable
- **Shopify-first** — Built for Shopify theme workflows

---

## 📝 Publishing

```bash
# Login to npm
npm login

# Build all packages
pnpm build

# Publish all packages
pnpm -r publish --no-git-checks
```

---

## 📄 License

MIT © ShopifyLabs
