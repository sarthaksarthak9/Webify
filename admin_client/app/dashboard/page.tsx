"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { websiteService } from "@/services/api";
import Link from "next/link";

export default function DashboardPage() {
	const [websites, setWebsites] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState({
		total: 0,
		published: 0,
		drafts: 0
	});

	useEffect(() => {
		const fetchWebsites = async () => {
			try {
				const sites = await websiteService.getAll();
				// websiteService.getAll() now returns the array directly
				setWebsites(sites);

				// Calculate stats
				const total = sites.length;
				const published = sites.filter((s: any) => s.isPublished).length;
				const drafts = total - published;

				setStats({ total, published, drafts });
			} catch (error) {
				console.error("Failed to fetch websites:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchWebsites();
	}, []);

	return (
		<div className="flex flex-col min-h-full w-full">
			<Header title="Dashboard" subtitle="Overview of your websites" />

			<div className="flex-1 overflow-y-auto w-full">
				<div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
					{/* Stats Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
						<Card>
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<p className="text-xs text-[var(--admin-text-muted)] font-semibold uppercase tracking-wide mb-3">
										Total Websites
									</p>
									<div className="text-3xl font-bold text-white mb-1">
										{loading ? <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white/50"></span> : stats.total}
									</div>
									<p className="text-sm text-[var(--admin-text-muted)]">
										All created websites
									</p>
								</div>
								<div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
									<svg
										className="w-5 h-5 text-black"
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
							</div>
						</Card>

						{/* Add more stats if needed, or remove placeholders */}
					</div>

					{/* Website List */}
					<div>
						<h3 className="text-xl font-bold text-white mb-4">Your Websites</h3>
						{loading ? (
							<div className="flex items-center justify-center py-12">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--admin-accent)]"></div>
							</div>
						) : websites.length === 0 ? (
							<div className="text-[var(--admin-text-muted)] p-8 border border-[var(--admin-border)] rounded-lg text-center">
								<p className="mb-4">No websites found. Create one to get started!</p>
								<a href="http://localhost:3000/generate" target="_blank" className="px-4 py-2 bg-white text-black rounded font-medium">Create Website</a>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{websites.map((site) => (
									<Link href={`/dashboard/websites/${site.slug}`} key={site.pageId || site.slug} className="block group">
										<Card className="h-full hover:border-[var(--admin-accent)] transition-colors cursor-pointer">
											<div className="flex flex-col h-full">
												<div className="h-40 bg-[var(--admin-bg-tertiary)] rounded-md mb-4 flex items-center justify-center overflow-hidden relative">
													{/* Placeholder preview or screenshot if available */}
													<span className="text-4xl">🌐</span>
													<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
														<span className="text-white font-medium border border-white px-3 py-1 rounded">Edit Website</span>
													</div>
												</div>
												<h4 className="text-lg font-semibold text-white mb-1 group-hover:text-[var(--admin-accent)] transition-colors">{site.title || 'Untitled Website'}</h4>
												<p className="text-sm text-[var(--admin-text-muted)] mt-auto pt-2 border-t border-[var(--admin-border)] flex justify-between">
													<span>{site.slug}</span>
													<span>{new Date(site.updatedAt).toLocaleDateString()}</span>
												</p>
											</div>
										</Card>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
