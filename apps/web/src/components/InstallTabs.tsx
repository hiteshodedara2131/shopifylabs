"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaNpm, FaYarn } from "react-icons/fa";
import { FiCheck, FiCopy, FiGlobe } from "react-icons/fi";
import { SiPnpm } from "react-icons/si";

interface InstallTabsProps {
	packageName: string;
	isGlobal?: boolean;
}

export default function InstallTabs({
	packageName,
	isGlobal = false,
}: InstallTabsProps) {
	const [activeTab, setActiveTab] = useState("pnpm");
	const [copied, setCopied] = useState(false);

	const tabs = [
		{ id: "pnpm", label: "pnpm", icon: SiPnpm },
		{ id: "npm", label: "npm", icon: FaNpm },
		{ id: "yarn", label: "yarn", icon: FaYarn },
		{ id: "cdn", label: "CDN", icon: FiGlobe },
	];

	const getCommand = () => {
		switch (activeTab) {
			case "pnpm":
				return isGlobal
					? `pnpm add -g ${packageName}`
					: `pnpm add ${packageName}`;
			case "npm":
				return isGlobal
					? `npm install -g ${packageName}`
					: `npm install ${packageName}`;
			case "yarn":
				return isGlobal
					? `yarn global add ${packageName}`
					: `yarn add ${packageName}`;
			case "cdn":
				return `<script src="https://cdn.jsdelivr.net/npm/${packageName}/dist/index.min.js"></script>`;
			default:
				return "";
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(getCommand());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="w-full glass-card rounded-xl overflow-hidden border border-white/10 mb-8">
			<div className="flex border-b border-white/5 bg-[#070B14]/40">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						onClick={() => setActiveTab(tab.id)}
						className={`flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors relative ${
							activeTab === tab.id
								? "text-white"
								: "text-slate-500 hover:text-slate-300"
						}`}
					>
						<tab.icon className="w-3.5 h-3.5" />
						{tab.label}
						{activeTab === tab.id && (
							<motion.div
								layoutId="active-tab"
								className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-teal"
							/>
						)}
					</button>
				))}
				<div className="ml-auto flex items-center px-4">
					<button
						type="button"
						onClick={copyToClipboard}
						className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
						title="Copy command"
					>
						{copied ? (
							<FiCheck className="w-4 h-4 text-green-400" />
						) : (
							<FiCopy className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>
			<div className="p-4 bg-[#0F172A]/40 font-mono text-sm overflow-x-auto whitespace-nowrap">
				<AnimatePresence mode="wait">
					<motion.code
						key={activeTab}
						initial={{ opacity: 0, x: -5 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 5 }}
						className="text-slate-300"
					>
						{getCommand()}
					</motion.code>
				</AnimatePresence>
			</div>
		</div>
	);
}
