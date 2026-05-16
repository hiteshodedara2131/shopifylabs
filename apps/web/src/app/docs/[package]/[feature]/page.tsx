import { notFound } from "next/navigation";
import InstallTabs from "@/components/InstallTabs";
import { FiBox } from "react-icons/fi";

interface FeatureDoc {
  title: string;
  description: string;
  usage: string;
  parameters?: { name: string; type: string; description: string; default?: string }[];
  returns?: string;
  shopifyUseCase?: string;
}

const FEATURE_DOCS: Record<string, Record<string, FeatureDoc>> = {
  utils: {
    debounce: {
      title: "debounce(fn, delay)",
      description: "Creates a debounced version of a function that delays invocation until after delay milliseconds have elapsed since the last call.",
      usage: `import { debounce } from '@shopifylabs/utils';

const handleSearch = debounce((query: string) => {
  fetch(\`/search/suggest.json?q=\${query}\`);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});`,
      parameters: [
        { name: "fn", type: "(...args) => void", description: "The function to debounce" },
        { name: "delay", type: "number", description: "Delay in milliseconds" },
      ],
      returns: "(...args) => void — The debounced function",
      shopifyUseCase: "Debounce predictive search input to avoid excessive API calls.",
    },
    throttle: {
      title: "throttle(fn, limit)",
      description: "Creates a throttled version of a function that invokes at most once per limit milliseconds.",
      usage: `import { throttle } from '@shopifylabs/utils';

const handleScroll = throttle(() => {
  if (window.scrollY > 100) {
    header?.classList.add('header--scrolled');
  } else {
    header?.classList.remove('header--scrolled');
  }
}, 100);

window.addEventListener('scroll', handleScroll);`,
      parameters: [
        { name: "fn", type: "(...args) => void", description: "The function to throttle" },
        { name: "limit", type: "number", description: "Minimum interval in milliseconds" },
      ],
      returns: "(...args) => void — The throttled function",
      shopifyUseCase: "Throttle scroll events for sticky header behavior.",
    },
    deepMerge: {
      title: "deepMerge(target, ...sources)",
      description: "Deeply merges two or more objects. Later sources override earlier ones. Arrays are replaced.",
      usage: `import { deepMerge } from '@shopifylabs/utils';

const config = deepMerge(defaults, userSettings);`,
      parameters: [
        { name: "target", type: "Record<string, unknown>", description: "The base object" },
        { name: "...sources", type: "Partial<T>[]", description: "One or more source objects to merge" },
      ],
      returns: "T — The merged object",
      shopifyUseCase: "Merge default section settings with user overrides from section.settings.",
    },
    uniqueId: {
      title: "uniqueId(prefix?)",
      description: "Generates a unique string ID combining a sequential counter and timestamp.",
      usage: `import { uniqueId } from '@shopifylabs/utils';

const id = uniqueId('cart'); // "cart_1_m3k2f9a"`,
      parameters: [
        { name: "prefix", type: "string", description: "Optional prefix for the ID", default: '"sl"' },
      ],
      returns: "string — A unique ID string",
      shopifyUseCase: "Generate unique IDs for dynamically created cart line items or section blocks.",
    },
  },
  dom: {
    "query-one": {
      title: "$(selector, context?)",
      description: "Selects the first element matching the given CSS selector.",
      usage: `import { $ } from '@shopifylabs/dom';

const btn = $<HTMLButtonElement>('[data-add-to-cart]');
const heading = $('h2', sectionElement);`,
      parameters: [
        { name: "selector", type: "string", description: "CSS selector string" },
        { name: "context", type: "Document | HTMLElement", description: "Scope to search within", default: "document" },
      ],
      returns: "T | null",
    },
    "query-all": {
      title: "$all(selector, context?)",
      description: "Selects all elements matching the given CSS selector. Returns a real Array.",
      usage: `import { $all } from '@shopifylabs/dom';

const cards = $all<HTMLDivElement>('.product-card');
cards.forEach(card => card.classList.add('active'));`,
      parameters: [
        { name: "selector", type: "string", description: "CSS selector string" },
        { name: "context", type: "Document | HTMLElement", description: "Scope to search within", default: "document" },
      ],
      returns: "T[]",
    },
    on: {
      title: "on(eventName, selectorOrElement, handler, options?)",
      description: "Attaches an event listener. Supports delegation via CSS selectors.",
      usage: `import { on } from '@shopifylabs/dom';

// Delegated
const cleanup = on('click', '.add-to-cart', (e) => {
  console.log('Clicked!');
});

// Direct
on('submit', formElement, (e) => e.preventDefault());`,
      parameters: [
        { name: "eventName", type: "string", description: "DOM event name" },
        { name: "selectorOrElement", type: "string | HTMLElement", description: "CSS selector or direct element" },
        { name: "handler", type: "(event: T) => void", description: "Event handler callback" },
      ],
      returns: "() => void — Cleanup function",
    },
  },
  ajax: {
    "cart-add": {
      title: "cart.add(item)",
      description: "Adds one or more items to the Shopify cart.",
      usage: `import { cart } from '@shopifylabs/ajax';

await cart.add({ id: 44012345, quantity: 1 });`,
      parameters: [
        { name: "item", type: "CartItem | CartItem[]", description: "Single item or array" },
      ],
      returns: "Promise<CartResponse>",
    },
  },
};

export default async function FeaturePage({ params }: { params: Promise<{ package: string; feature: string }> }) {
  const { package: pkgId, feature: featureId } = await params;
  const doc = FEATURE_DOCS[pkgId]?.[featureId];

  if (!doc) {
    notFound();
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-mono mb-4">
          <span>@shopifylabs/{pkgId}</span>
          <span className="text-slate-600">/</span>
          <span>{featureId}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight">{doc.title}</h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
          {doc.description}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
      <InstallTabs packageName={`@shopifylabs/${pkgId}`} />

      <h2 className="text-2xl font-bold text-white mb-6">Usage</h2>
      <div className="glass-card rounded-xl overflow-hidden border border-white/10 mb-10">
        <div className="px-4 py-3 border-b border-white/5 bg-[#070B14]/40 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">example.ts</span>
        </div>
        <div className="p-6 bg-[#0F172A]/40 font-mono text-sm overflow-x-auto text-slate-300">
          <pre><code>{doc.usage}</code></pre>
        </div>
      </div>

      {doc.parameters && (
        <>
          <h2 className="text-2xl font-bold text-white mb-6">Parameters</h2>
          <div className="overflow-x-auto mb-10 border border-white/5 rounded-xl">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-300 uppercase text-xs font-bold tracking-wider">
                  <th className="px-6 py-4 border-b border-white/5">Param</th>
                  <th className="px-6 py-4 border-b border-white/5">Type</th>
                  <th className="px-6 py-4 border-b border-white/5">Default</th>
                  <th className="px-6 py-4 border-b border-white/5">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-400 divide-y divide-white/5">
                {doc.parameters.map((param) => (
                  <tr key={param.name} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-teal">{param.name}</td>
                    <td className="px-6 py-4 font-mono text-brand-blue">{param.type}</td>
                    <td className="px-6 py-4 font-mono">{param.default || "—"}</td>
                    <td className="px-6 py-4">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {doc.returns && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Returns</h2>
          <p className="text-slate-400 font-mono bg-white/5 px-4 py-3 rounded-lg border border-white/5 inline-block">
            {doc.returns}
          </p>
        </div>
      )}

      {doc.shopifyUseCase && (
        <div className="p-6 rounded-2xl bg-brand-teal/5 border border-brand-teal/10 mb-12">
          <h3 className="text-brand-teal font-bold mb-2 flex items-center gap-2">
            <FiBox className="w-4 h-4" /> Shopify Use Case
          </h3>
          <p className="text-slate-300 italic">"{doc.shopifyUseCase}"</p>
        </div>
      )}
    </div>
  );
}
