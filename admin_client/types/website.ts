export interface Theme {
	name: string;
	colors: {
		primary: string;
		primaryDark: string;
		primaryLight: string;
		background: string;
		backgroundAlt: string;
		backgroundLight: string;
		text: string;
		textLight: string;
		textDark: string;
		accent: string;
		success: string;
		warning: string;
		error: string;
	};
}

export interface Section {
	id: string;
	type: string;
	title: string;
	content: Record<string, any>; // Changed from string to object for dynamic section data
	order: number;
	props?: Record<string, any>;
}

export interface Website {
	pageId: string;
	slug: string;
	title: string;
	theme: Theme;
	sections: Section[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface WebsiteListItem {
	pageId: string;
	slug: string;
	title: string;
	theme: Theme;
	updatedAt?: string;
}
