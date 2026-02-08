"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { Website } from "@/types/website";
import { websiteService } from "@/services/api";

export default function WebsitesPage() {
	const [websites, setWebsites] = useState<Website[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		loadWebsites();
	}, []);

	const loadWebsites = async () => {
		setIsLoading(true);
		try {
			const data = await websiteService.getAll();
			setWebsites(data || []);
		} catch (error) {
			console.error("Failed to load websites:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const filteredWebsites = websites.filter(
		(website) =>
			website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			website.slug.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="flex flex-col min-h-full w-full">
			<Header
				title="Websites"
				subtitle={`Manage your ${websites.length} website${websites.length !== 1 ? "s" : ""}`}
			/>

			<div className="flex-1 overflow-y-auto w-full">
				<div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
					{/* Search Bar */}
					<div className="flex items-center gap-4">
						<div className="flex-1 relative">
							<svg
								className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--admin-text-muted)]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<input
								type="text"
								placeholder="Search websites..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-3 rounded-lg bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] text-[var(--admin-text)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] focus:border-transparent"
							/>
						</div>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="flex items-center justify-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--admin-accent)]"></div>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && filteredWebsites.length === 0 && (
						<Card className="text-center py-12">
							<div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-2">
								{searchQuery
									? "No websites found"
									: "No websites yet"}
							</h3>
							<p className="text-[var(--admin-text-muted)] mb-6">
								{searchQuery
									? "Try adjusting your search query"
									: "Create your first website using the AI chatbot"}
							</p>
						</Card>
					)}

					{/* Websites Grid */}
					{!isLoading && filteredWebsites.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
							{filteredWebsites.map((website) => (
								<Link
									key={website.pageId}
									href={`/dashboard/websites/${website.slug}`}
								>
									<Card hover className="h-full group">
										{/* Color Preview Bar */}
										<div className="flex gap-1 mb-4">
											<div
												className="h-2 flex-1 rounded-full"
												style={{
													backgroundColor:
														website.theme.colors
															.primary,
												}}
											></div>
											<div
												className="h-2 flex-1 rounded-full"
												style={{
													backgroundColor:
														website.theme.colors
															.background,
												}}
											></div>
											<div
												className="h-2 flex-1 rounded-full"
												style={{
													backgroundColor:
														website.theme.colors
															.accent,
												}}
											></div>
										</div>

										{/* Website Info */}
										<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-2 group-hover:text-[var(--admin-accent)] transition-colors">
											{website.title}
										</h3>
										<p className="text-sm text-[var(--admin-text-muted)] mb-4">
											/{website.slug}
										</p>

										{/* Stats */}
										<div className="flex items-center gap-4 text-xs text-[var(--admin-text-muted)]">
											<div className="flex items-center gap-1">
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
														d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
													/>
												</svg>
												{website.theme.name}
											</div>
											<div className="flex items-center gap-1">
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
														d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
													/>
												</svg>
												{website.sections?.length || 0}{" "}
												sections
											</div>
										</div>

										{/* Edit Button */}
										<div className="mt-4 pt-4 border-t border-[var(--admin-border)]">
											<div className="flex items-center justify-between text-sm">
												<span className="text-[var(--admin-text-muted)]">
													Click to edit
												</span>
												<svg
													className="w-5 h-5 text-[var(--admin-accent)] group-hover:translate-x-1 transition-transform"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</div>
										</div>
									</Card>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
