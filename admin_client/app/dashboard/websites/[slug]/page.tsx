"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { websiteService } from "@/services/api";
import { SectionsList } from "@/components/editors/SectionsList";
import { toast } from "sonner";

type Tab = "metadata" | "sections" | "preview";

export default function WebsiteEditorPage() {
	const params = useParams();
	const router = useRouter();
	const slug = params?.slug as string;

	const [website, setWebsite] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState<Tab>("metadata");
	const [hasChanges, setHasChanges] = useState(false);

	useEffect(() => {
		if (slug) {
			loadWebsite();
		}
	}, [slug]);

	const loadWebsite = async () => {
		setIsLoading(true);
		try {
			const data = await websiteService.getById(slug); // Uses /websites/:slug
			const siteData = data.data || data; // Handle potential wrapper
			setWebsite(siteData);
		} catch (error) {
			console.error("Failed to load website:", error);
			toast.error("Failed to load website");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async () => {
		if (!website) return;

		setIsSaving(true);
		try {
			// Remove internal fields if necessary, or just send the whole object
			// The backend updates fields that are present
			const updateData = {
				title: website.title,
				description: website.description,
				theme: website.theme,
				sections: website.sections,
				status: website.status,
				deploymentUrl: website.deploymentUrl,
			};

			await websiteService.update(slug, updateData);
			setHasChanges(false);
			toast.success("Website saved successfully!");

			// Refresh data to get any server-side updates
			// loadWebsite(); 
		} catch (error) {
			console.error("Failed to save website:", error);
			toast.error("Failed to save website");
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		// Reload the website to discard changes
		loadWebsite();
		setHasChanges(false);
		toast.info("Changes discarded");
	};

	const updateMetadata = (field: string, value: any) => {
		if (!website) return;
		setWebsite({ ...website, [field]: value });
		setHasChanges(true);
	};

	const updateThemeColor = (colorKey: string, value: string) => {
		if (!website) return;
		setWebsite({
			...website,
			theme: {
				...website.theme,
				colors: {
					...website.theme.colors,
					[colorKey]: value,
				},
			},
		});
		setHasChanges(true);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--admin-accent)]"></div>
			</div>
		);
	}

	if (!website) {
		return (
			<div>
				<Header title="Website Not Found" />
				<div className="p-8">
					<Card className="text-center py-12">
						<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-2">
							Website not found
						</h3>
						<p className="text-[var(--admin-text-muted)]">
							The website you're looking for doesn't exist.
						</p>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-full w-full">
			<Header
				title={website.title}
				subtitle={`Editing /${website.slug}`}
			/>

			<div className="flex-1 overflow-y-auto w-full">
				<div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
					{/* Save Bar */}
					{hasChanges && (
						<Card className="bg-blue-500/10 border-blue-500/30">
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
								<div className="flex items-center gap-3">
									<svg
										className="w-5 h-5 text-blue-400 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span className="text-blue-400 font-medium text-sm md:text-base">
										You have unsaved changes
									</span>
								</div>
								<div className="flex gap-3 w-full sm:w-auto">
									<Button
										variant="ghost"
										onClick={handleCancel}
										className="flex-1 sm:flex-initial"
									>
										Cancel
									</Button>
									<Button
										onClick={handleSave}
										isLoading={isSaving}
										className="flex-1 sm:flex-initial"
									>
										Save Changes
									</Button>
								</div>
							</div>
						</Card>
					)}

					{/* Tabs */}
					<div className="flex gap-2 border-b border-[var(--admin-border)]">
						{(["metadata", "sections", "preview"] as Tab[]).map(
							(tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`px-6 py-3 font-medium capitalize transition-all ${activeTab === tab
										? "text-[var(--admin-accent)] border-b-2 border-[var(--admin-accent)]"
										: "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
										}`}
								>
									{tab}
								</button>
							),
						)}
					</div>

					{/* Tab Content */}
					{activeTab === "metadata" && (
						<div className="space-y-8">
							<Card>
								<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-4">
									Basic Information
								</h3>
								<div className="space-y-4">
									<Input
										label="Website Title"
										value={website.title}
										onChange={(e) =>
											updateMetadata(
												"title",
												e.target.value,
											)
										}
									/>
									<Input
										label="Slug"
										value={website.slug}
										onChange={(e) =>
											updateMetadata(
												"slug",
												e.target.value,
											)
										}
										placeholder="my-website"
									/>
									<Input
										label="Theme Name"
										value={website.theme.name}
										onChange={(e) =>
											setWebsite({
												...website,
												theme: {
													...website.theme,
													name: e.target.value,
												},
											})
										}
									/>
								</div>
							</Card>

							<Card>
								<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-4">
									Theme Colors
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
									{Object.entries(website.theme.colors).map(
										([key, value]) => (
											<div key={key}>
												<label className="block text-sm font-medium text-[var(--admin-text)] mb-2 capitalize">
													{key
														.replace(
															/([A-Z])/g,
															" $1",
														)
														.trim()}
												</label>
												<div className="flex gap-2">
													<input
														type="color"
														value={value as string}
														onChange={(e) =>
															updateThemeColor(
																key,
																e.target.value,
															)
														}
														className="w-12 h-10 rounded cursor-pointer border border-[var(--admin-border)]"
													/>
													<Input
														value={value as string}
														onChange={(e) =>
															updateThemeColor(
																key,
																e.target.value,
															)
														}
														className="flex-1"
													/>
												</div>
											</div>
										),
									)}
								</div>
							</Card>
						</div>
					)}

					{activeTab === "sections" && (
						<SectionsList
							sections={website.sections}
							onUpdate={(sections) => {
								setWebsite({ ...website, sections });
								setHasChanges(true);
							}}
						/>
					)}

					{activeTab === "preview" && (
						<Card>
							<div className="text-center py-12">
								<svg
									className="w-16 h-16 mx-auto text-[var(--admin-text-muted)] mb-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
								<h3 className="text-lg font-semibold text-[var(--admin-text)] mb-2">
									Preview Coming Soon
								</h3>
								<p className="text-[var(--admin-text-muted)] mb-6">
									Live preview will be available in the next
									update
								</p>
								<a
									href={`http://localhost:3001/${website.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg"
								>
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
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									Open in New Tab
								</a>
							</div>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
