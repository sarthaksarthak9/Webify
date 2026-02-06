"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavItem {
	label: string;
	href: string;
	icon: React.ReactNode;
}

const navItems: NavItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
		),
	},
	{
		label: "Websites",
		href: "/dashboard/websites",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			</svg>
		),
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<>
			{/* Mobile Menu Button - Fixed positioning, always visible on mobile */}
			<button
				onClick={() => setIsMobileMenuOpen(true)}
				className={clsx(
					"md:hidden fixed top-5 left-4 z-50 w-9 h-9 flex items-center justify-center p-0 rounded-md bg-[var(--admin-bg-secondary)] border-2 border-[var(--admin-border)] text-white hover:bg-[var(--admin-bg-tertiary)] hover:border-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white",
					isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
				aria-label="Open menu"
			>
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>

			{/* Mobile Overlay - covers main content when sidebar is open */}
			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm transition-opacity duration-300"
					onClick={closeMobileMenu}
				/>
			)}

			{/* Sidebar - Desktop & Mobile */}
			<aside
				className={clsx(
					"w-72 max-w-[85vw] md:w-64 min-h-screen bg-[var(--admin-bg-secondary)] border-r border-[var(--admin-border)] flex flex-col transition-transform duration-300 shadow-lg",
					"z-[110] md:z-50", // Ensure sidebar is above overlay and content
					"md:translate-x-0 md:sticky md:top-0", // Always visible on desktop, sticky positioning
					isMobileMenuOpen
						? "translate-x-0 fixed top-0"
						: "-translate-x-full fixed top-0", // Mobile: slide in/out
				)}
			>
				{/* Header with Logo and Close Button */}
				<div className="p-6 md:p-8 border-b border-[var(--admin-border)]">
					<div className="flex items-center justify-between gap-3">
						{/* Logo */}
						<Link
							href="/dashboard"
							className="flex items-center gap-3 group flex-1 min-w-0"
							onClick={closeMobileMenu}
						>
							<div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md flex-shrink-0">
								<svg
									className="w-6 h-6 text-black"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
									/>
								</svg>
							</div>
							<div className="min-w-0">
								<h1 className="text-xl font-bold text-white tracking-tight">
									Webify
								</h1>
								<p className="text-xs text-[var(--admin-text-muted)] font-medium mt-0.5">
									Admin Panel
								</p>
							</div>
						</Link>

						{/* Close button for mobile - aligned with logo */}
						<button
							onClick={closeMobileMenu}
							className="md:hidden w-8 h-8 flex items-center justify-center p-0 rounded-md bg-[var(--admin-bg-tertiary)] border-2 border-[var(--admin-border)] text-white hover:bg-red-600 hover:border-red-500 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0"
							aria-label="Close menu"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 md:p-6 space-y-2 overflow-y-auto">
					{navItems.map((item) => {
						const isActive =
							item.href === "/dashboard"
								? pathname === "/dashboard"
								: pathname?.startsWith(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={closeMobileMenu}
								className={clsx(
									"flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-semibold",
									isActive
										? "bg-white text-black shadow-md font-bold"
										: "text-[var(--admin-text-muted)] hover:bg-[var(--admin-bg-tertiary)] hover:text-white hover:border-l-2 hover:border-white",
								)}
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				{/* Footer */}
				<div className="p-4 md:p-6 border-t border-[var(--admin-border)]">
					<div className="p-3 rounded-lg bg-[var(--admin-bg-tertiary)] border-2 border-[var(--admin-border)]">
						<p className="text-xs text-white font-semibold">
							Webify v1.0
						</p>
						<p className="text-[10px] text-[var(--admin-text-muted)] mt-1">
							AI-Powered Websites
						</p>
					</div>
				</div>
			</aside>
		</>
	);
}