"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Section, Website } from "@/types/website";
import { websiteService } from "@/services/api";
import { toast } from "sonner";
import { NavBarSectionForm } from "@/components/editors/sections/NavBarSectionForm";
import { HeroSectionForm } from "@/components/editors/sections/HeroSectionForm";
import { GallerySectionForm } from "@/components/editors/sections/GallerySectionForm";
import { FeaturesSectionForm } from "@/components/editors/sections/FeaturesSectionForm";
import { ContactSectionForm } from "@/components/editors/sections/ContactSectionForm";
import { AboutSectionForm } from "@/components/editors/sections/AboutSectionForm";
import { TestimonialsSectionForm } from "@/components/editors/sections/TestimonialsSectionForm";
import { CTASectionForm } from "@/components/editors/sections/CTASectionForm";
import { FooterSectionForm } from "@/components/editors/sections/FooterSectionForm";

const sectionTypes = [
	{ value: "navbar", label: "Navigation Bar", icon: "🧭", description: "Top navigation menu" },
	{ value: "hero", label: "Hero", icon: "🎯", description: "Main banner with heading and CTA" },
	{ value: "features", label: "Features", icon: "⚡", description: "Showcase key features" },
	{ value: "gallery", label: "Gallery", icon: "🖼️", description: "Image gallery or portfolio" },
	{ value: "about", label: "About", icon: "ℹ️", description: "About section with stats" },
	{ value: "testimonials", label: "Testimonials", icon: "💬", description: "Customer reviews" },
	{ value: "cta", label: "Call to Action", icon: "🚀", description: "Action buttons" },
	{ value: "contact", label: "Contact", icon: "📧", description: "Contact form" },
	{ value: "footer", label: "Footer", icon: "📄", description: "Bottom footer section" },
];

export default function SectionEditorPage() {
	const params = useParams();
	const router = useRouter();
	const slug = params?.slug as string;
	const sectionId = params?.sectionId as string;

	const [website, setWebsite] = useState<Website | null>(null);
	const [section, setSection] = useState<Section | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		loadWebsite();
	}, [slug]);

	const loadWebsite = async () => {
		setIsLoading(true);
		try {
			const data = await websiteService.getBySlug(slug);
			if (!data) {
				throw new Error("Website not found");
			}
			setWebsite(data);

			if (sectionId && sectionId !== "new") {
				const foundSection = data.sections.find(
					(s: Section) => s.id === sectionId,
				);
				if (foundSection) {
					setSection(foundSection);
				}
			} else {
				setSection({
					id: `section-${Date.now()}`,
					type: "hero",
					title: "New Section",
					content: {},
					order: data.sections.length,
				});
			}
		} catch (error) {
			console.error("Failed to load website:", error);
			toast.error("Failed to load website");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async () => {
		if (!website || !section) return;

		setIsSaving(true);
		try {
			const updatedSections = website.sections.some(
				(s: Section) => s.id === section.id,
			)
				? website.sections.map((s: Section) =>
					s.id === section.id ? section : s,
				)
				: [...website.sections, section];

			const updatedWebsite = {
				...website,
				sections: updatedSections,
			};

			await websiteService.updateBySlug(slug, updatedWebsite);
			toast.success("Section saved successfully!");
			router.back();
		} catch (error) {
			console.error("Failed to save section:", error);
			toast.error("Failed to save section");
		} finally {
			setIsSaving(false);
		}
	};

	const handleContentChange = (field: string, value: any) => {
		if (section) {
			setSection({
				...section,
				content: {
					...section.content,
					[field]: value,
				},
			});
		}
	};

	const handleTypeChange = (newType: string) => {
		if (section) {
			setSection({
				...section,
				type: newType,
				content: {},
			});
		}
	};

	const renderSectionForm = () => {
		if (!section) return null;

		const content = section.content || {};

		switch (section.type) {
			case "navbar":
				return (
					<NavBarSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "hero":
				return (
					<HeroSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "gallery":
				return (
					<GallerySectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "features":
				return (
					<FeaturesSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "about":
				return (
					<AboutSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "testimonials":
				return (
					<TestimonialsSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "cta":
				return (
					<CTASectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "contact":
				return (
					<ContactSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			case "footer":
				return (
					<FooterSectionForm
						data={content as any}
						onChange={handleContentChange}
					/>
				);
			default:
				return null;
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
					<p className="text-gray-400 text-sm">Loading section...</p>
				</div>
			</div>
		);
	}

	const currentType = sectionTypes.find(t => t.value === section?.type);

	return (
		<div className="min-h-screen bg-[#0A0A0A]">
			{/* Top Bar - Payload CMS Style */}
			<div className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-gray-800">
				<div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4">
					<div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
						<button
							onClick={() => router.back()}
							className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-all border border-gray-800 flex-shrink-0"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<span className="hidden sm:inline">Back</span>
						</button>
						<div className="h-6 md:h-8 w-px bg-gray-800 flex-shrink-0"></div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<h1 className="text-base md:text-xl font-semibold text-white truncate">
									{sectionId === "new" ? "Create Section" : "Edit Section"}
								</h1>
								{currentType && (
									<span className="text-xl md:text-2xl flex-shrink-0">{currentType.icon}</span>
								)}
							</div>
							<p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">
								{website?.title} {currentType && `• ${currentType.label}`}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
						<button
							onClick={handleSave}
							disabled={isSaving}
							className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
						>
							{isSaving ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
									<span className="hidden sm:inline">Saving...</span>
								</>
							) : (
								<>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span className="hidden sm:inline">Save & Publish</span>
									<span className="sm:hidden">Save</span>
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-5xl mx-auto px-3 md:px-6 py-4 md:py-8">
				{section && (
					<div className="space-y-6">
						{/* Section Type Selector - Payload Style */}
						<div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
							<div className="px-6 py-4 border-b border-gray-800">
								<h2 className="text-base font-semibold text-white">Section Type</h2>
								<p className="text-sm text-gray-500 mt-1">Choose the type of section to display</p>
							</div>
							<div className="p-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
									{sectionTypes.map((type) => (
										<button
											key={type.value}
											onClick={() => handleTypeChange(type.value)}
											className={`relative flex flex-col items-start p-4 rounded-lg border-2 transition-all text-left ${section.type === type.value
												? "border-blue-500 bg-blue-500/10"
												: "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900"
												}`}
										>
											<div className="flex items-center gap-3 mb-2">
												<span className="text-2xl">{type.icon}</span>
												<span className={`font-medium ${section.type === type.value ? "text-blue-400" : "text-white"
													}`}>
													{type.label}
												</span>
											</div>
											<p className="text-xs text-gray-500">{type.description}</p>
											{section.type === type.value && (
												<div className="absolute top-3 right-3">
													<svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
													</svg>
												</div>
											)}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Dynamic Section Form */}
						<div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
							<div className="px-6 py-4 border-b border-gray-800">
								<h2 className="text-base font-semibold text-white">Content</h2>
								<p className="text-sm text-gray-500 mt-1">Configure the content for this section</p>
							</div>
							<div className="p-6">
								{renderSectionForm()}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
