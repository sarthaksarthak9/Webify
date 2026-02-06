import { Website } from "@/types/website";

// Mock website data for development
export const mockWebsites: Website[] = [
	{
		pageId: "example-full-page",
		slug: "home",
		title: "Complete Website Example",
		theme: {
			name: "Tech Green Theme",
			colors: {
				primary: "#4ADE80",
				primaryDark: "#22C55E",
				primaryLight: "#86EFAC",
				background: "#1B243F",
				backgroundAlt: "#0F172A",
				backgroundLight: "#FFFFFF",
				text: "#FFFFFF",
				textLight: "#9CA3AF",
				textDark: "#1B243F",
				accent: "#4ADE80",
				success: "#22C55E",
				warning: "#F59E0B",
				error: "#EF4444",
			},
		},
		sections: [
			{
				id: "section-1",
				type: "hero",
				title: "Hero Section",
				content: {
					heading: "AI Website Builder",
					subheading: "Build stunning websites using simple prompts",
					ctaText: "Start Building",
					ctaLink: "#get-started",
					backgroundImage: "/images/hero-bg.jpg",
					alignment: "center"
				},
				order: 0,
			},
			{
				id: "section-2",
				type: "gallery",
				title: "Gallery Section",
				content: {
					heading: "Our Portfolio",
					subtitle: "Recent projects we're proud of",
					images: [
						{ id: "img_1", url: "/gallery/project-1.jpg", alt: "Modern office interior", caption: "Corporate Office Design" },
						{ id: "img_2", url: "/gallery/project-2.jpg", alt: "Residential home", caption: "Luxury Home Project" },
						{ id: "img_3", url: "/gallery/project-3.jpg", alt: "Restaurant interior", caption: "Fine Dining Restaurant" },
						{ id: "img_4", url: "/gallery/project-4.jpg", alt: "Hotel lobby", caption: "5-Star Hotel Lobby" }
					],
					layout: "grid",
					columns: 2
				},
				order: 1,
			},
			{
				id: "section-3",
				type: "contact",
				title: "Contact Section",
				content: {
					heading: "Get In Touch",
					subtitle: "We'd love to hear from you",
					email: "contact@example.com",
					phone: "+1 (555) 123-4567",
					address: "123 Tech Street, San Francisco, CA 94105",
					submitText: "Send Message"
				},
				order: 2,
			},
		],
	},
	{
		pageId: "gym-website",
		slug: "fitness-zone",
		title: "FitZone Gym",
		theme: {
			name: "Gym Red Theme",
			colors: {
				primary: "#EF4444",
				primaryDark: "#DC2626",
				primaryLight: "#F87171",
				background: "#1F1F1F",
				backgroundAlt: "#0F0F0F",
				backgroundLight: "#FFFFFF",
				text: "#FFFFFF",
				textLight: "#9CA3AF",
				textDark: "#1F1F1F",
				accent: "#EF4444",
				success: "#22C55E",
				warning: "#F59E0B",
				error: "#EF4444",
			},
		},
		sections: [
			{
				id: "section-4",
				type: "features",
				title: "Features Section",
				content: {
					title: "Why Choose FitZone",
					subtitle: "Transform your fitness journey",
					features: [
						{ id: "feat_1", icon: "rocket", title: "Expert Trainers", description: "Certified professionals to guide you" },
						{ id: "feat_2", icon: "star", title: "Modern Equipment", description: "State-of-the-art fitness gear" },
						{ id: "feat_3", icon: "heart", title: "Flexible Hours", description: "Open 24/7 for your convenience" }
					],
					layout: "grid",
					columns: 3
				},
				order: 0,
			},
		],
	},
	{
		pageId: "restaurant-site",
		slug: "delicious-bites",
		title: "Delicious Bites Restaurant",
		theme: {
			name: "Restaurant Orange Theme",
			colors: {
				primary: "#F59E0B",
				primaryDark: "#D97706",
				primaryLight: "#FCD34D",
				background: "#1E1E1E",
				backgroundAlt: "#0F0F0F",
				backgroundLight: "#FFFFFF",
				text: "#FFFFFF",
				textLight: "#9CA3AF",
				textDark: "#1E1E1E",
				accent: "#F59E0B",
				success: "#22C55E",
				warning: "#F59E0B",
				error: "#EF4444",
			},
		},
		sections: [
			{
				id: "section-6",
				type: "about",
				title: "About Section",
				content: {
					heading: "About Delicious Bites",
					text: "We serve exquisite cuisine crafted with passion and the finest ingredients. Our chefs bring years of culinary expertise to every dish.",
					image: "/images/restaurant-about.jpg",
					imagePosition: "right",
					stats: [
						{ id: "stat_1", label: "Years Experience", value: "15+" },
						{ id: "stat_2", label: "Happy Customers", value: "10K+" },
						{ id: "stat_3", label: "Dishes Served", value: "50K+" }
					]
				},
				order: 0,
			},
		],
	},
];

// Helper function to get all websites (simulates API call)
export async function getWebsites(): Promise<Website[]> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockWebsites;
}

// Helper function to get a single website by slug
export async function getWebsiteBySlug(slug: string): Promise<Website | null> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return mockWebsites.find((w) => w.slug === slug) || null;
}

// Helper function to update a website
export async function updateWebsite(
	slug: string,
	data: Partial<Website>,
): Promise<Website> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	const index = mockWebsites.findIndex((w) => w.slug === slug);
	if (index !== -1) {
		mockWebsites[index] = { ...mockWebsites[index], ...data };
		return mockWebsites[index];
	}
	throw new Error("Website not found");
}
