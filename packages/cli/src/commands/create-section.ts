import { resolve } from "node:path";
import {
	sectionCss,
	sectionJs,
	sectionLiquid,
} from "../templates/section.liquid.js";
import { writeFile } from "../utils/writeFile.js";

interface CreateSectionOptions {
	name: string;
	cwd?: string;
}

/**
 * Creates a Shopify section with its associated liquid, JS, and CSS files.
 *
 * Generated files:
 * - sections/{name}.liquid
 * - assets/{name}.js
 * - assets/{name}.css
 */
export const createSection = async (
	options: CreateSectionOptions,
): Promise<void> => {
	const { name, cwd = process.cwd() } = options;

	const slug = name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

	const files = [
		{
			path: resolve(cwd, `sections/${slug}.liquid`),
			content: sectionLiquid(slug),
		},
		{
			path: resolve(cwd, `assets/${slug}.js`),
			content: sectionJs(slug),
		},
		{
			path: resolve(cwd, `assets/${slug}.css`),
			content: sectionCss(slug),
		},
	];

	console.log("");
	console.log("  ⚡ ShopifyLabs — Creating section files...");
	console.log("");

	for (const file of files) {
		await writeFile(file.path, file.content);
		console.log(`  ✓ ${file.path.replace(cwd, ".")}`);
	}

	console.log("");
	console.log(`  ✅ Section "${slug}" created successfully!`);
	console.log("");
};
