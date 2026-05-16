# @shopifylabs/cli

CLI generator for scaffolding Shopify theme section files. Generates `.liquid`, `.js`, and `.css` files with proper Shopify schema, asset tags, and starter code.

## Installation

```bash
npm install -g @shopifylabs/cli
# or use directly with npx
npx @shopifylabs/cli create section hero-banner
```

## Usage

### Create a Section

```bash
# With name argument
shopifylabs create section hero-banner

# Interactive mode (prompts for name)
shopifylabs create section

# Using npx
npx @shopifylabs/cli create section product-tabs
```

### Generated Files

Running `shopifylabs create section hero-banner` generates:

```
sections/hero-banner.liquid
assets/hero-banner.js
assets/hero-banner.css
```

### Generated Liquid Template

The `.liquid` file includes:

- Section wrapper with BEM classes
- Heading, subheading, and content blocks
- CSS asset inclusion via `stylesheet_tag`
- JS asset inclusion via `script` tag with `defer`
- Full `{% schema %}` block with:
  - Text settings (heading, subheading)
  - Rich text setting (content)
  - Section preset for theme editor

```liquid
{{ 'hero-banner.css' | asset_url | stylesheet_tag }}

<div class="hero-banner" id="section-hero-banner">
  <div class="hero-banner__container">
    <h2 class="hero-banner__heading">{{ section.settings.heading }}</h2>
    ...
  </div>
</div>

<script src="{{ 'hero-banner.js' | asset_url }}" defer="defer"></script>

{% schema %}
{
  "name": "Hero Banner",
  "tag": "section",
  "settings": [ ... ],
  "presets": [{ "name": "Hero Banner" }]
}
{% endschema %}
```

### Generated JavaScript

The `.js` file includes:

- Named `init()` export function
- DOM-ready check
- Section element query
- Console log for debugging

```js
const init = () => {
  const section = document.querySelector('.hero-banner');
  if (!section) return;
  console.log('[ShopifyLabs] hero-banner section initialized');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { init };
```

### Generated CSS

The `.css` file includes:

- BEM-structured selectors
- Container with max-width
- Heading and subheading styles
- Content placeholder

```css
.hero-banner {
  padding: 2rem 0;
}

.hero-banner__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

## CLI Options

| Command | Description |
|---------|-------------|
| `shopifylabs create section [name]` | Create a new Shopify section |
| `shopifylabs --help` or `-h` | Show help message |
| `shopifylabs --version` or `-v` | Show version number |

## Programmatic API

You can also use the CLI programmatically:

```ts
import { createSection } from '@shopifylabs/cli';

await createSection({
  name: 'hero-banner',
  cwd: '/path/to/shopify/theme',
});
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | — | Section name (kebab-case) |
| `cwd` | `string` | `process.cwd()` | Working directory |

## Workflow

1. Navigate to your Shopify theme root
2. Run the CLI command
3. Files are created in `sections/` and `assets/`
4. Customize the generated files
5. The section appears in Shopify theme editor automatically

```bash
cd my-shopify-theme
shopifylabs create section featured-collection
# ✓ ./sections/featured-collection.liquid
# ✓ ./assets/featured-collection.js
# ✓ ./assets/featured-collection.css
```

## License

MIT © ShopifyLabs
