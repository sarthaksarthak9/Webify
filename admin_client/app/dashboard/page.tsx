import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
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
									<p className="text-3xl font-bold text-white mb-1">
										3
									</p>
									<p className="text-sm text-[var(--admin-text-muted)]">
										Mock websites available
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

						<Card>
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<p className="text-xs text-[var(--admin-text-muted)] font-semibold uppercase tracking-wide mb-3">
										Published
									</p>
									<p className="text-3xl font-bold text-white mb-1">
										3
									</p>
									<p className="text-sm text-[var(--admin-text-muted)]">
										Live websites
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
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
						</Card>

						<Card>
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<p className="text-xs text-[var(--admin-text-muted)] font-semibold uppercase tracking-wide mb-3">
										Drafts
									</p>
									<p className="text-3xl font-bold text-white mb-1">
										0
									</p>
									<p className="text-sm text-[var(--admin-text-muted)]">
										Work in progress
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
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
										/>
									</svg>
								</div>
							</div>
						</Card>
					</div>

					{/* Quick Actions */}
					<Card>
						<h3 className="text-base font-bold text-white mb-5 uppercase tracking-wide">
							Quick Actions
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
							<a
								href="/dashboard/websites"
								className="p-5 rounded-lg border border-[var(--admin-border)] hover:border-white hover:bg-[var(--admin-bg-tertiary)] transition-all duration-200 group"
							>
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
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
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9"
											/>
										</svg>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-white text-base mb-1.5">
											View All Websites
										</p>
										<p className="text-sm text-[var(--admin-text-muted)] leading-relaxed">
											Manage your existing websites
										</p>
									</div>
								</div>
							</a>

							<a
								href="/dashboard/settings"
								className="p-5 rounded-lg border border-[var(--admin-border)] hover:border-white hover:bg-[var(--admin-bg-tertiary)] transition-all duration-200 group"
							>
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
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
												d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-white text-base mb-1.5">
											Settings
										</p>
										<p className="text-sm text-[var(--admin-text-muted)] leading-relaxed">
											Configure your preferences
										</p>
									</div>
								</div>
							</a>
						</div>
					</Card>

					{/* Getting Started */}
					<Card className="bg-gradient-to-br from-[var(--admin-bg-secondary)] to-[var(--admin-bg-tertiary)]">
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
								<svg
									className="w-7 h-7 text-black"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h3 className="text-lg font-bold text-white mb-2">
									Welcome to Webify Admin
								</h3>
								<p className="text-[var(--admin-text-muted)] leading-relaxed">
									Get started by viewing your AI-generated
									websites. Click on any website to edit and
									customize every detail.
								</p>
							</div>
							<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
								<a
									href="/dashboard/websites"
									className="px-5 py-2.5 rounded-lg bg-white hover:bg-gray-200 text-black font-semibold transition-all whitespace-nowrap shadow-md hover:shadow-lg text-center"
								>
									View Websites
								</a>
								<a
									href="https://github.com/sarthaksarthak9/Webify"
									target="_blank"
									rel="noopener noreferrer"
									className="px-5 py-2.5 rounded-lg border-2 border-[var(--admin-border)] hover:border-white hover:bg-[var(--admin-bg-tertiary)] text-white font-medium transition-all whitespace-nowrap text-center"
								>
									Documentation
								</a>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
