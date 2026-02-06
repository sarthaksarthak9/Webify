"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

interface HeaderProps {
	title: string;
	subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
	const { userEmail, logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<header className="bg-[var(--admin-bg-secondary)] border-b border-[var(--admin-border)] pl-[60px] sm:pl-[60px] md:pl-8 pr-4 py-4 md:py-8 sticky top-0 z-10 w-full backdrop-blur-md bg-opacity-95 shadow-lg">
			<div className="flex items-center justify-between gap-4">
				<div className="min-w-0 flex-1">
					<h2 className="text-lg md:text-xl font-bold text-white truncate leading-tight">
						{title}
					</h2>
					{subtitle && (
						<p className="text-[10px] sm:text-xs text-[var(--admin-text-muted)] mt-0.5 truncate leading-tight">
							{subtitle}
						</p>
					)}
				</div>

				<div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
					{/* User Info */}
					<div className="hidden sm:flex items-center gap-2 px-2.5 md:px-3 py-1.5 rounded-lg bg-[var(--admin-bg-tertiary)] border border-[var(--admin-border)]">
						<div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
							<span className="text-black text-xs md:text-sm font-bold">
								{userEmail?.charAt(0).toUpperCase()}
							</span>
						</div>
						<div className="hidden md:block">
							<p className="text-xs font-medium text-white whitespace-nowrap">
								{userEmail}
							</p>
						</div>
					</div>

					{/* Logout Button */}
					<Button
						variant="ghost"
						onClick={handleLogout}
						className="gap-1.5 text-xs h-9 px-3 md:px-4 whitespace-nowrap"
					>
						<svg
							className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						<span className="hidden sm:inline">Logout</span>
					</Button>
				</div>
			</div>
		</header>
	);
}