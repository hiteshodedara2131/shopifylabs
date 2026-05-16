import Link from "next/link";
import { FaNpm } from "react-icons/fa";
import { FiBox, FiCode, FiCommand, FiZap } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden">
			{/* Background glowing orbs */}
			<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px] pointer-events-none" />
			<div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-brand-teal/10 blur-[100px] pointer-events-none" />

			<Navbar />

			<main className="flex-1 flex flex-col items-center pt-24 pb-16">
				{/* Hero Section */}
				<section className="container mx-auto px-4 flex flex-col items-center text-center max-w-4xl z-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-slate-300">
						<span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
						v0.2.0 Released
					</div>

					<h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
						Build Shopify themes <br className="hidden md:block" />
						<span className="text-gradient">faster than ever.</span>
					</h1>

					<p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
						A modern, type-safe, and highly optimized frontend toolkit ecosystem
						for Shopify theme development by StyloFront. Stop reinventing the
						wheel.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
						<Link
							href="/docs"
							className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
						>
							Read the Docs
						</Link>
						<div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-[#0F172A] text-slate-300 font-mono text-sm">
							<FaNpm className="text-red-500 text-lg" />
							<span>pnpm add @shopifylabs/utils</span>
						</div>
					</div>
				</section>

				{/* Code Showcase Preview */}
				<section className="container mx-auto px-4 mt-8 z-10 flex justify-center">
					<div className="w-full max-w-3xl glass-card rounded-2xl overflow-hidden shadow-2xl border-white/10">
						<div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0F172A]/80">
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-green-500/80"></div>
							</div>
							<div className="ml-4 text-xs font-mono text-slate-400">
								theme.ts
							</div>
						</div>
						<div className="p-6 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
							<pre>
								<code
									// biome-ignore lint/security/noDangerouslySetInnerHtml: This is static HTML for code formatting
									dangerouslySetInnerHTML={{
										__html: `import { formatMoney, getSizedImageUrl } from <span class="text-brand-teal">'@shopifylabs/utils'</span>;

<span class="text-slate-500">// Easily format currency with Shopify's template patterns</span>
const price = <span class="text-brand-blue">formatMoney</span>(1999, <span class="text-brand-teal">"\${{amount}}"</span>); <span class="text-slate-500">// "$19.99"</span>

<span class="text-slate-500">// Generate CDN-optimized image URLs</span>
const thumb = <span class="text-brand-blue">getSizedImageUrl</span>(
  <span class="text-brand-teal">"//cdn.shopify.com/s/files/1/image.jpg"</span>, 
  <span class="text-brand-teal">"300x300"</span>
);`,
									}}
								/>
							</pre>
						</div>
					</div>
				</section>

				{/* Features / Packages */}
				<section className="container mx-auto px-4 mt-32 z-10">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold font-heading mb-4 text-white">
							The Ecosystem
						</h2>
						<p className="text-slate-400">
							Everything you need to build premium Shopify themes.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Feature 1 */}
						<Link
							href="/docs/utils"
							className="glass-card p-6 rounded-xl group cursor-pointer"
						>
							<div className="w-12 h-12 rounded-lg bg-brand-purple/20 flex items-center justify-center mb-4 text-brand-purple group-hover:scale-110 transition-transform">
								<FiZap className="w-6 h-6" />
							</div>
							<h3 className="text-lg font-bold text-white mb-2">
								@shopifylabs/utils
							</h3>
							<p className="text-sm text-slate-400">
								Core utility functions for money formatting, image sizing, and
								general helpers.
							</p>
						</Link>

						{/* Feature 2 */}
						<Link
							href="/docs/dom"
							className="glass-card p-6 rounded-xl group cursor-pointer"
						>
							<div className="w-12 h-12 rounded-lg bg-brand-blue/20 flex items-center justify-center mb-4 text-brand-blue group-hover:scale-110 transition-transform">
								<FiCode className="w-6 h-6" />
							</div>
							<h3 className="text-lg font-bold text-white mb-2">
								@shopifylabs/dom
							</h3>
							<p className="text-sm text-slate-400">
								Lightweight DOM manipulation, querying, and event delegation
								library.
							</p>
						</Link>

						{/* Feature 3 */}
						<Link
							href="/docs/ajax"
							className="glass-card p-6 rounded-xl group cursor-pointer"
						>
							<div className="w-12 h-12 rounded-lg bg-brand-teal/20 flex items-center justify-center mb-4 text-brand-teal group-hover:scale-110 transition-transform">
								<FiBox className="w-6 h-6" />
							</div>
							<h3 className="text-lg font-bold text-white mb-2">
								@shopifylabs/ajax
							</h3>
							<p className="text-sm text-slate-400">
								Robust wrappers for Shopify's Storefront Cart AJAX APIs.
							</p>
						</Link>

						{/* Feature 4 */}
						<Link
							href="/docs/cli"
							className="glass-card p-6 rounded-xl group cursor-pointer"
						>
							<div className="w-12 h-12 rounded-lg bg-brand-pink/20 flex items-center justify-center mb-4 text-brand-pink group-hover:scale-110 transition-transform">
								<FiCommand className="w-6 h-6" />
							</div>
							<h3 className="text-lg font-bold text-white mb-2">
								@shopifylabs/cli
							</h3>
							<p className="text-sm text-slate-400">
								Scaffolding and generation tools for speeding up theme
								architecture.
							</p>
						</Link>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t border-white/5 py-8 mt-auto z-10 bg-[#070B14]/50">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<span className="font-heading font-bold text-white">
							Shopifylabs
						</span>
						<span className="text-sm text-slate-500">by StyloFront</span>
					</div>
					<p className="text-sm text-slate-500">
						© {new Date().getFullYear()} Shopifylabs. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
