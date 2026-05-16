export default function DocsPage() {
	return (
		<div className="prose prose-invert prose-headings:font-heading max-w-none">
			<h1 className="text-4xl font-bold mb-4">Welcome to Shopifylabs</h1>
			<p className="text-lg text-slate-400 mb-8">
				The ultimate futuristic frontend toolkit for modern Shopify theme
				development.
			</p>

			<div className="glass-card p-6 rounded-xl mb-8">
				<h3 className="text-xl font-bold mb-2">Why Shopifylabs?</h3>
				<p className="text-slate-300 text-sm leading-relaxed">
					Building bespoke Shopify themes often requires repeatedly writing
					boilerplate for cart manipulation, DOM interactions, and data
					formatting. Shopifylabs solves this by providing a modular, type-safe
					ecosystem of utilities designed specifically for the Shopify
					Storefront environment.
				</p>
			</div>

			<h2 className="text-2xl font-bold mb-4">Installation</h2>
			<p className="text-slate-300 text-sm mb-4">
				You can install packages individually as needed:
			</p>

			<div className="bg-[#0F172A] p-4 rounded-lg border border-white/5 font-mono text-sm text-slate-300 mb-8">
				pnpm add @shopifylabs/utils @shopifylabs/dom
			</div>

			<h2 className="text-2xl font-bold mb-4">Select a Package</h2>
			<p className="text-slate-300 text-sm mb-4">
				Use the sidebar to explore the documentation for a specific package.
			</p>
		</div>
	);
}
