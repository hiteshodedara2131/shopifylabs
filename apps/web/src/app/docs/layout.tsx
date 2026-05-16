import Link from "next/link";
import { FiBook, FiBox, FiCode, FiCommand, FiZap } from "react-icons/fi";
import Navbar from "@/components/Navbar";

const PACKAGES = [
	{
		id: "utils",
		name: "@shopifylabs/utils",
		icon: FiZap,
		color: "text-brand-purple",
	},
	{
		id: "dom",
		name: "@shopifylabs/dom",
		icon: FiCode,
		color: "text-brand-blue",
	},
	{
		id: "ajax",
		name: "@shopifylabs/ajax",
		icon: FiBox,
		color: "text-brand-teal",
	},
	{
		id: "cli",
		name: "@shopifylabs/cli",
		icon: FiCommand,
		color: "text-brand-pink",
	},
];

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Navbar />

			<div className="flex-1 flex flex-col md:flex-row container mx-auto">
				{/* Sidebar */}
				<aside className="w-full md:w-64 border-r border-white/5 py-8 pr-6 pl-4 flex flex-col gap-8 shrink-0">
					<div>
						<h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
							Getting Started
						</h4>
						<ul className="flex flex-col gap-2">
							<li>
								<Link
									href="/docs"
									className="text-sm text-slate-300 hover:text-white flex items-center gap-2"
								>
									<FiBook className="w-4 h-4" /> Overview
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
							Packages
						</h4>
						<ul className="flex flex-col gap-2">
							{PACKAGES.map((pkg) => {
								const Icon = pkg.icon;
								return (
									<li key={pkg.id}>
										<Link
											href={`/docs/${pkg.id}`}
											className="text-sm text-slate-300 hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-white/5 transition-colors"
										>
											<Icon className={`w-4 h-4 ${pkg.color}`} />
											{pkg.name}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</aside>

				{/* Content Area */}
				<main className="flex-1 py-8 px-4 md:px-12 max-w-4xl">{children}</main>
			</div>
		</div>
	);
}
