"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { FaNpm } from "react-icons/fa";

export default function AnimatedHero() {
	const isMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const rotateX = useTransform(y, [-100, 100], [10, -10]);
	const rotateY = useTransform(x, [-100, 100], [-10, 10]);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		x.set(event.clientX - centerX);
		y.set(event.clientY - centerY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<section className="container mx-auto px-4 flex flex-col items-center text-center max-w-5xl z-10 pt-16 pb-24">
			{/* Badge */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-slate-300 shadow-xl"
			>
				<span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
				v0.2.0 is now available
			</motion.div>

			{/* Heading */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
				className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight max-w-4xl"
			>
				Build Shopify themes <br className="hidden md:block" />
				<span className="text-gradient">faster than ever.</span>
			</motion.h1>

			{/* Subheading */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
			>
				A modern, type-safe, and highly optimized frontend toolkit ecosystem for
				Shopify theme development by StyloFront. Stop reinventing the wheel.
			</motion.p>

			{/* CTA Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
				className="flex flex-col sm:flex-row items-center gap-4 mb-20"
			>
				<Link
					href="/docs"
					className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-2"
				>
					Get Started
				</Link>
				<div className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 bg-[#0F172A]/80 backdrop-blur-md text-slate-300 font-mono text-sm shadow-xl">
					<FaNpm className="text-red-500 text-lg" />
					<span>pnpm add @shopifylabs/utils</span>
				</div>
			</motion.div>

			{/* 3D Code Showcase */}
			{isMounted && (
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
					className="w-full perspective-1000 flex justify-center perspective-[1200px]"
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
				>
					<motion.div
						style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
						className="w-full max-w-3xl glass-card rounded-2xl overflow-hidden shadow-2xl border-white/10 relative"
					>
						{/* Glossy reflection overlay */}
						<div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-2xl" />

						<div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#070B14]/80 backdrop-blur-md">
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-green-500/80"></div>
							</div>
							<div className="ml-4 text-xs font-mono text-slate-400">
								theme.ts
							</div>
						</div>
						<div className="p-6 md:p-8 overflow-x-auto text-sm md:text-base font-mono text-slate-300 leading-relaxed text-left bg-[#0F172A]/60">
							<pre>
								<code
									// biome-ignore lint/security/noDangerouslySetInnerHtml: Static HTML for syntax highlighting
									dangerouslySetInnerHTML={{
										__html: `<span class="text-brand-purple">import</span> { formatMoney, getSizedImageUrl } <span class="text-brand-purple">from</span> <span class="text-brand-teal">'@shopifylabs/utils'</span>;

<span class="text-slate-500">// Easily format currency with Shopify's template patterns</span>
<span class="text-brand-purple">const</span> price = <span class="text-brand-blue">formatMoney</span>(1999, <span class="text-brand-teal">"\${{amount}}"</span>); <span class="text-slate-500">// "$19.99"</span>

<span class="text-slate-500">// Generate CDN-optimized image URLs</span>
<span class="text-brand-purple">const</span> thumb = <span class="text-brand-blue">getSizedImageUrl</span>(
  <span class="text-brand-teal">"//cdn.shopify.com/s/files/1/image.jpg"</span>, 
  <span class="text-brand-teal">"300x300"</span>
);`,
									}}
								/>
							</pre>
						</div>
					</motion.div>
				</motion.div>
			)}
		</section>
	);
}
