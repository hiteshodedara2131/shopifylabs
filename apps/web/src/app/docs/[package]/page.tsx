import { notFound } from "next/navigation";
import InstallTabs from "@/components/InstallTabs";
import Link from "next/link";
import { FiArrowRight, FiZap, FiCode, FiBox, FiCommand } from "react-icons/fi";

const PACKAGES: Record<string, any> = {
  utils: {
    title: "@shopifylabs/utils",
    description: "Lightweight utility helpers for Shopify theme development. Fully typed, tree-shakeable, and zero dependencies.",
    icon: FiZap,
    color: "text-brand-purple",
    features: [
      { name: "debounce", desc: "Delay function invocation until pause." },
      { name: "throttle", desc: "Limit function execution frequency." },
      { name: "deepMerge", desc: "Recursively merge plain objects." },
      { name: "uniqueId", desc: "Generate unique session-based IDs." },
    ],
  },
  dom: {
    title: "@shopifylabs/dom",
    description: "Lightweight DOM manipulation utilities for Shopify themes. Typed, tree-shakeable, and ESM only.",
    icon: FiCode,
    color: "text-brand-blue",
    features: [
      { name: "query-one", desc: "Typed $ query selector helper." },
      { name: "query-all", desc: "Typed $all query selector helper." },
      { name: "on", desc: "Robust delegated event listener." },
      { name: "replace", desc: "High-performance innerHTML updater." },
    ],
  },
  ajax: {
    title: "@shopifylabs/ajax",
    description: "A fully typed Shopify AJAX API wrapper. Built on native fetch and async/await.",
    icon: FiBox,
    color: "text-brand-teal",
    features: [
      { name: "cart-add", desc: "Add single or multiple items to cart." },
      { name: "cart-update", desc: "Update item quantities seamlessly." },
      { name: "cart-get", desc: "Fetch current Shopify cart state." },
      { name: "request", desc: "Low-level Shopify API fetch wrapper." },
    ],
  },
  cli: {
    title: "@shopifylabs/cli",
    description: "CLI generator for scaffolding Shopify theme section files with Liquid, JS, and CSS.",
    icon: FiCommand,
    color: "text-brand-pink",
    isGlobal: true,
    features: [
      { name: "usage", desc: "How to use the shopifylabs command." },
      { name: "files", desc: "Details of generated Liquid and JS files." },
    ],
  },
};

export default async function PackageOverview({ params }: { params: Promise<{ package: string }> }) {
  const { package: pkgId } = await params;
  const pkg = PACKAGES[pkgId];

  if (!pkg) {
    notFound();
  }

  const Icon = pkg.icon;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-white/5 ${pkg.color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">{pkg.title}</h1>
      </div>

      <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl">
        {pkg.description}
      </p>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
        <InstallTabs packageName={pkg.title} isGlobal={pkg.isGlobal} />
      </div>

      <h2 className="text-2xl font-bold text-white mb-8">Features & Functions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {pkg.features.map((feature: any) => (
          <Link
            key={feature.name}
            href={`/docs/${pkgId}/${feature.name}`}
            className="group glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-teal transition-colors">
                {feature.name}
              </h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
            <FiArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-teal/10 border border-white/5">
        <h3 className="text-xl font-bold text-white mb-4 font-heading">Ready to dive in?</h3>
        <p className="text-slate-400 mb-6">
          Explore the detailed API documentation for each feature in the sidebar to learn about parameters, return types, and Shopify-specific use cases.
        </p>
        <Link
          href={`/docs/${pkgId}/${pkg.features[0].name}`}
          className={`inline-flex items-center gap-2 font-bold ${pkg.color} hover:brightness-125 transition-all`}
        >
          View first feature: {pkg.features[0].name} <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
