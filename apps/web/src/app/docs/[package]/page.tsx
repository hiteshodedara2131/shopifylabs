import { notFound } from "next/navigation";

// In a real app, this would be fetched from MDX files.
const PACKAGE_DOCS: Record<
	string,
	{ title: string; description: string; code: string }
> = {
	utils: {
		title: "@shopifylabs/utils",
		description:
			"Core utility functions for money formatting, image sizing, and general helpers.",
		code: `import { formatMoney } from "@shopifylabs/utils";\n\nconst price = formatMoney(1999, "\${{amount}}"); // "$19.99"`,
	},
	dom: {
		title: "@shopifylabs/dom",
		description:
			"Lightweight DOM manipulation, querying, and event delegation library.",
		code: `import { $ } from "@shopifylabs/dom";\n\nconst btn = $(".add-to-cart");\nbtn?.classList.add("loading");`,
	},
	ajax: {
		title: "@shopifylabs/ajax",
		description: "Robust wrappers for Shopify's Storefront Cart AJAX APIs.",
		code: `import { cartAdd } from "@shopifylabs/ajax";\n\nawait cartAdd({ items: [{ id: 123456789, quantity: 1 }] });`,
	},
	cli: {
		title: "@shopifylabs/cli",
		description:
			"Scaffolding and generation tools for speeding up theme architecture.",
		code: `npx @shopifylabs/cli create-section hero\n# Generates hero.liquid and hero.ts`,
	},
};

export default async function PackagePage({
	params,
}: {
	params: Promise<{ package: string }>;
}) {
	const resolvedParams = await params;
	const pkgId = resolvedParams.package;
	const doc = PACKAGE_DOCS[pkgId];

	if (!doc) {
		notFound();
	}

	return (
		<div className="prose prose-invert prose-headings:font-heading max-w-none">
			<div className="flex items-center gap-3 mb-2">
				<h1 className="text-4xl font-bold m-0">{doc.title}</h1>
				<span className="px-2 py-1 bg-white/10 text-xs font-mono rounded text-slate-300 border border-white/10">
					v0.1.0
				</span>
			</div>
			<p className="text-lg text-slate-400 mb-8 border-b border-white/5 pb-8">
				{doc.description}
			</p>

			<h2 className="text-2xl font-bold mb-4">Installation</h2>
			<div className="bg-[#0F172A] p-4 rounded-lg border border-white/5 font-mono text-sm text-slate-300 mb-8">
				pnpm add {doc.title}
			</div>

			<h2 className="text-2xl font-bold mb-4">Usage Example</h2>
			<div className="bg-[#0F172A] p-6 rounded-lg border border-white/5 font-mono text-sm text-brand-teal mb-8 overflow-x-auto whitespace-pre">
				{doc.code}
			</div>
		</div>
	);
}
