import DocsSidebar from "@/components/DocsSidebar";
import Navbar from "@/components/Navbar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col bg-[#070B14]">
			<Navbar />

			<div className="flex-1 flex overflow-hidden">
				{/* Dynamic Sidebar */}
				<DocsSidebar />

				{/* Content Area */}
				<main className="flex-1 overflow-y-auto custom-scrollbar">
					<div className="container mx-auto px-6 py-12 md:px-12 lg:px-24 max-w-5xl">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
