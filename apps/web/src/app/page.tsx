import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";
import BentoGrid from "@/components/BentoGrid";
import Navbar from "@/components/Navbar";
import TerminalShowcase from "@/components/TerminalShowcase";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
			{/* Background glowing orbs */}
			<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/15 blur-[120px] pointer-events-none" />
			<div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-brand-teal/10 blur-[100px] pointer-events-none" />
			<div className="absolute bottom-[10%] left-[20%] w-[30%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />

			<Navbar />

			<main className="flex-1 flex flex-col items-center">
				{/* Advanced 3D Hero */}
				<AnimatedHero />

				{/* Bento Grid Features */}
				<BentoGrid />

				{/* Terminal/CLI Animated Showcase */}
				<TerminalShowcase />

				{/* Final CTA Section */}
				<section className="container mx-auto px-4 mt-10 mb-32 z-10">
					<div className="max-w-4xl mx-auto glass-card p-12 md:p-16 rounded-3xl text-center relative overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,61,255,0.1)]">
						{/* Inner glow */}
						<div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent pointer-events-none" />

						<h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white tracking-tight">
							Ready to upgrade your workflow?
						</h2>
						<p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
							Join the ecosystem of developers building faster, cleaner, and
							more robust Shopify themes with Shopifylabs.
						</p>
						<Link
							href="/docs"
							className="inline-flex px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
						>
							Read the Documentation
						</Link>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t border-white/5 py-8 mt-auto z-10 bg-[#070B14]/80 backdrop-blur-md">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<span className="font-heading font-bold text-white text-lg tracking-tight">
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
