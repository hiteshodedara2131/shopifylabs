"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
	FiBook,
	FiBox,
	FiChevronDown,
	FiChevronRight,
	FiCode,
	FiCommand,
	FiZap,
} from "react-icons/fi";

interface PackageInfo {
	id: string;
	name: string;
	fullName: string;
	icon: IconType;
	color: string;
}

const PACKAGES: PackageInfo[] = [
	{
		id: "utils",
		name: "utils",
		fullName: "@shopifylabs/utils",
		icon: FiZap,
		color: "text-brand-purple",
	},
	{
		id: "dom",
		name: "dom",
		fullName: "@shopifylabs/dom",
		icon: FiCode,
		color: "text-brand-blue",
	},
	{
		id: "ajax",
		name: "ajax",
		fullName: "@shopifylabs/ajax",
		icon: FiBox,
		color: "text-brand-teal",
	},
	{
		id: "cli",
		name: "cli",
		fullName: "@shopifylabs/cli",
		icon: FiCommand,
		color: "text-brand-pink",
	},
];

interface DocItem {
	title: string;
	href: string;
}

interface DocSection {
	title: string;
	href?: string;
	items?: DocItem[];
}

const DOC_STRUCTURE: Record<string, DocSection[]> = {
	utils: [
		{ title: "Overview", href: "/docs/utils" },
		{
			title: "Functions",
			items: [
				{ title: "debounce", href: "/docs/utils/debounce" },
				{ title: "throttle", href: "/docs/utils/throttle" },
				{ title: "deepMerge", href: "/docs/utils/deepMerge" },
				{ title: "uniqueId", href: "/docs/utils/uniqueId" },
			],
		},
	],
	dom: [
		{ title: "Overview", href: "/docs/dom" },
		{
			title: "Query",
			items: [
				{ title: "$", href: "/docs/dom/query-one" },
				{ title: "$all", href: "/docs/dom/query-all" },
			],
		},
		{
			title: "Events",
			items: [
				{ title: "on", href: "/docs/dom/on" },
				{ title: "off", href: "/docs/dom/off" },
			],
		},
		{
			title: "Manipulation",
			items: [
				{ title: "replace", href: "/docs/dom/replace" },
				{ title: "append", href: "/docs/dom/append" },
				{ title: "create", href: "/docs/dom/create" },
			],
		},
	],
	ajax: [
		{ title: "Overview", href: "/docs/ajax" },
		{
			title: "Cart API",
			items: [
				{ title: "cart.add", href: "/docs/ajax/cart-add" },
				{ title: "cart.update", href: "/docs/ajax/cart-update" },
				{ title: "cart.clear", href: "/docs/ajax/cart-clear" },
				{ title: "cart.get", href: "/docs/ajax/cart-get" },
			],
		},
		{ title: "request", href: "/docs/ajax/request" },
	],
	cli: [
		{ title: "Overview", href: "/docs/cli" },
		{ title: "Usage", href: "/docs/cli/usage" },
		{ title: "Generated Files", href: "/docs/cli/files" },
	],
};

export default function DocsSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [lastPathname, setLastPathname] = useState(pathname);

	// Determine current package from pathname
	const currentPackageId =
		PACKAGES.find((p) => pathname.startsWith(`/docs/${p.id}`))?.id || "utils";
	const currentPackage =
		PACKAGES.find((p) => p.id === currentPackageId) || PACKAGES[0];

	// Sync expanded sections when pathname changes (during render)
	if (pathname !== lastPathname) {
		setLastPathname(pathname);
		const sectionsToExpand: string[] = [];
		DOC_STRUCTURE[currentPackageId]?.forEach((section: DocSection) => {
			if (section.items?.some((item: DocItem) => item.href === pathname)) {
				sectionsToExpand.push(section.title);
			}
		});

		if (sectionsToExpand.length > 0) {
			setExpandedSections((prev) => [
				...new Set([...prev, ...sectionsToExpand]),
			]);
		}
	}

	const toggleSection = (title: string) => {
		setExpandedSections((prev) =>
			prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
		);
	};

	const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		router.push(`/docs/${e.target.value}`);
	};

	return (
		<aside
			className={`flex flex-col border-r border-white/5 bg-[#070B14] transition-all duration-300 ${isOpen ? "w-64" : "w-16"} hidden md:flex h-[calc(100vh-4rem)] sticky top-16`}
		>
			{/* Package Selector */}
			<div className="p-4 border-b border-white/5">
				{isOpen ? (
					<div className="relative group">
						<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-teal transition-colors">
							<currentPackage.icon
								className={`w-4 h-4 ${currentPackage.color}`}
							/>
						</div>
						<select
							value={currentPackageId}
							onChange={handlePackageChange}
							className="w-full bg-[#0F172A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-teal/50 cursor-pointer"
						>
							{PACKAGES.map((pkg) => (
								<option key={pkg.id} value={pkg.id}>
									{pkg.fullName}
								</option>
							))}
						</select>
						<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
							<FiChevronDown className="w-4 h-4" />
						</div>
					</div>
				) : (
					<div className="flex justify-center">
						<currentPackage.icon
							className={`w-6 h-6 ${currentPackage.color}`}
						/>
					</div>
				)}
			</div>

			{/* Navigation */}
			<div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
				{isOpen ? (
					<div className="space-y-6">
						{DOC_STRUCTURE[currentPackageId]?.map((section: DocSection) => (
							<div key={section.title}>
								{section.items ? (
									<div>
										<button
											type="button"
											onClick={() => toggleSection(section.title)}
											className="w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 hover:text-slate-300 transition-colors"
										>
											{section.title}
											{expandedSections.includes(section.title) ? (
												<FiChevronDown />
											) : (
												<FiChevronRight />
											)}
										</button>
										<AnimatePresence initial={false}>
											{expandedSections.includes(section.title) && (
												<motion.ul
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													className="overflow-hidden space-y-1 ml-1 border-l border-white/5 pl-3"
												>
													{section.items.map((item: DocItem) => (
														<li key={item.href}>
															<Link
																href={item.href}
																className={`block py-1.5 text-sm transition-colors ${
																	pathname === item.href
																		? "text-brand-teal font-medium"
																		: "text-slate-400 hover:text-white"
																}`}
															>
																{item.title}
															</Link>
														</li>
													))}
												</motion.ul>
											)}
										</AnimatePresence>
									</div>
								) : (
									<Link
										href={section.href || "#"}
										className={`block py-1 text-sm font-medium transition-colors ${
											pathname === section.href
												? "text-brand-teal"
												: "text-slate-400 hover:text-white"
										}`}
									>
										{section.title}
									</Link>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center gap-4">
						<FiBook className="w-5 h-5 text-slate-500" />
						<FiZap className="w-5 h-5 text-slate-500" />
					</div>
				)}
			</div>

			{/* Collapse Toggle */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="p-4 border-t border-white/5 text-slate-500 hover:text-white transition-colors flex items-center justify-center"
			>
				{isOpen ? "Collapse Sidebar" : <FiChevronRight className="w-6 h-6" />}
			</button>
		</aside>
	);
}
