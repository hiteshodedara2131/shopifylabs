import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.05)] bg-[#070B14]/80 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center px-4 justify-between">
				<Link href="/" className="flex items-center gap-3">
					<Image
						src="/shopifylabs-logo-t.png"
						alt="Shopifylabs Logo"
						width={32}
						height={32}
						className="rounded object-contain"
					/>
					<span className="font-heading font-bold text-lg tracking-tight text-white hidden sm:inline-block">
						Shopifylabs
					</span>
				</Link>
				<nav className="flex items-center gap-6">
					<Link
						href="/docs"
						className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
					>
						Documentation
					</Link>
					<Link
						href="/docs/utils"
						className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
					>
						Packages
					</Link>
					<a
						href="https://github.com/hiteshodedara2131/shopifylabs"
						target="_blank"
						rel="noreferrer"
						className="text-slate-300 hover:text-white transition-colors"
					>
						<FaGithub className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>
				</nav>
			</div>
		</header>
	);
}
